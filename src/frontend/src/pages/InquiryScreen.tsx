import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  useGetRecordByShareableLink,
  useGetRecordByUniqueCode,
  useIncrementViewCount,
} from "@/hooks/useQueries";
import {
  decodeDualPurposeData,
  getDisplayText,
  isSafeLovedQRCode,
  validateSafeLovedQRCode,
} from "@/lib/qrCodeGenerator";
import {
  AlertCircle,
  ArrowLeft,
  Camera,
  Clock,
  ExternalLink,
  Eye,
  Info,
  Loader2,
  MapPin,
  Mic,
  Phone,
  QrCode,
  RefreshCw,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { UserRecord } from "../backend";
import CategoryIcon from "../components/CategoryIcon";
import { useQRScanner } from "../qr-code/useQRScanner";

interface ISpeechRecognition extends EventTarget {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onstart: (() => void) | null;
  onend: (() => void) | null;
  onerror: ((event: Event) => void) | null;
  onresult: ((event: ISpeechRecognitionEvent) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface ISpeechRecognitionEvent {
  results: ISpeechRecognitionResultList;
}

interface ISpeechRecognitionResultList {
  [index: number]: ISpeechRecognitionResult;
}

interface ISpeechRecognitionResult {
  [index: number]: ISpeechRecognitionAlternative;
}

interface ISpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

declare global {
  interface Window {
    AndroidInterface?: { openCamera: () => void };
    SpeechRecognition?: new () => ISpeechRecognition;
    webkitSpeechRecognition?: new () => ISpeechRecognition;
  }
}

interface InquiryScreenProps {
  onBack: () => void;
  onShowInterstitial?: () => boolean;
}

interface ScanHistoryItem {
  code: string;
  scannedAt: number;
}

const HISTORY_KEY = "safeloved_scan_history";
const MAX_HISTORY = 20;

function getScanHistory(): ScanHistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return [];
}

function addScanHistory(code: string) {
  try {
    const history = getScanHistory().filter((h) => h.code !== code);
    history.unshift({ code, scannedAt: Date.now() });
    if (history.length > MAX_HISTORY) history.pop();
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch {
    /* ignore */
  }
}

function updateScanAnalytics(code: string) {
  try {
    const key = `safeloved_scan_${code}`;
    const raw = localStorage.getItem(key);
    const data = raw ? JSON.parse(raw) : { count: 0, lastAt: null };
    data.count = (data.count || 0) + 1;
    data.lastAt = Date.now();
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    /* ignore */
  }
}

function getLocation(uniqueCode: string): string | null {
  try {
    return localStorage.getItem(`safeloved_location_${uniqueCode}`);
  } catch {
    return null;
  }
}

function getPhoto(uniqueCode: string): string | null {
  try {
    return localStorage.getItem(`safeloved_photo_${uniqueCode}`);
  } catch {
    return null;
  }
}

export default function InquiryScreen({ onBack }: InquiryScreenProps) {
  const { t, language } = useLanguage();
  const [searchCode, setSearchCode] = useState("");
  const [activeTab, setActiveTab] = useState("code");
  const [record, setRecord] = useState<UserRecord | null>(null);
  const [showInfoDialog, setShowInfoDialog] = useState(false);
  const [infoDialogContent, setInfoDialogContent] = useState("");
  const [showNotFoundDialog, setShowNotFoundDialog] = useState(false);
  const [showInvalidQRDialog, setShowInvalidQRDialog] = useState(false);
  const [invalidQRMessage, setInvalidQRMessage] = useState("");
  const [isProcessingQR, setIsProcessingQR] = useState(false);
  const [lastProcessedQR, setLastProcessedQR] = useState<string>("");
  const [qrDetectedFlash, setQrDetectedFlash] = useState(false);
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>(() =>
    getScanHistory(),
  );
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);

  const [qrRecord, setQrRecord] = useState<UserRecord | null>(null);

  const getRecordMutation = useGetRecordByUniqueCode();
  const getRecordByShareableLink = useGetRecordByShareableLink();
  const incrementViewCount = useIncrementViewCount();

  const {
    qrResults,
    isActive,
    isSupported,
    error: cameraError,
    canStartScanning,
    startScanning,
    stopScanning,
    clearResults,
    videoRef,
    canvasRef,
  } = useQRScanner({
    facingMode: "environment",
    scanInterval: 100,
    maxResults: 1,
  });

  // Auto-resolve share link from URL ?share= parameter on mount
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally runs once on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const shareId = params.get("share");
    if (shareId) {
      getRecordByShareableLink
        .mutateAsync(shareId)
        .then((result) => {
          if (result) {
            setRecord(result);
            updateScanAnalytics(result.uniqueCode);
            incrementViewCount.mutateAsync(result.uniqueCode).catch(() => {});
            toast.success(t.toasts.recordLoaded);
          } else {
            toast.error(t.recordNotFound);
          }
        })
        .catch(() => {
          toast.error(t.recordNotFound);
        });
    }
  }, []);

  const handleCodeSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedCode = searchCode.trim();
    if (!trimmedCode) {
      toast.error(t.toasts.enterCode);
      return;
    }

    try {
      const result = await getRecordMutation.mutateAsync(trimmedCode);
      if (result) {
        setRecord(result);
        updateScanAnalytics(result.uniqueCode);
        incrementViewCount.mutateAsync(result.uniqueCode).catch(() => {});
        addScanHistory(trimmedCode);
        setScanHistory(getScanHistory());
        toast.success(t.toasts.recordLoaded);
      } else {
        setRecord(null);
        toast.error(t.recordNotFound);
      }
    } catch {
      setRecord(null);
      toast.error(t.recordNotFound);
    }
  };

  const handleStartScanning = async () => {
    setIsProcessingQR(false);
    setLastProcessedQR("");
    setRecord(null);
    setQrRecord(null);

    if (
      window.AndroidInterface &&
      typeof window.AndroidInterface.openCamera === "function"
    ) {
      try {
        window.AndroidInterface.openCamera();
      } catch {
        /* ignore */
      }
    }

    const success = await startScanning();
    if (!success) toast.error(t.toasts.cameraStartError);
  };

  const handleStopScanning = async () => {
    await stopScanning();
    clearResults();
    setIsProcessingQR(false);
    setLastProcessedQR("");
    setQrDetectedFlash(false);
  };

  const handleRetryScan = async () => {
    clearResults();
    setIsProcessingQR(false);
    setLastProcessedQR("");
    setQrDetectedFlash(false);
    setQrRecord(null);
    await stopScanning();
    setTimeout(() => handleStartScanning(), 300);
  };

  // B12: Voice search
  const handleVoiceSearch = () => {
    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionClass) {
      toast.error(t.voiceNotSupported);
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const langMap: Record<string, string> = {
      tr: "tr-TR",
      en: "en-US",
      zh: "zh-CN",
      es: "es-ES",
      ar: "ar-SA",
      hi: "hi-IN",
      fr: "fr-FR",
      ru: "ru-RU",
      pt: "pt-BR",
    };

    const recognition = new SpeechRecognitionClass();
    recognitionRef.current = recognition;
    recognition.lang = langMap[language] || "tr-TR";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => {
      setIsListening(false);
      toast.error(t.voiceNotSupported);
    };
    recognition.onresult = (event: ISpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript
        .toUpperCase()
        .replace(/\s+/g, " ")
        .trim();
      setSearchCode(transcript);
      setIsListening(false);
    };

    recognition.start();
  };

  // QR processing with green flash feedback (A2)
  // biome-ignore lint/correctness/useExhaustiveDependencies: incrementViewCount.mutateAsync is stable from useMutation
  useEffect(() => {
    if (qrResults.length > 0 && isActive && !isProcessingQR) {
      const latestResult = qrResults[0];
      const scannedData = latestResult.data;

      if (scannedData === lastProcessedQR) return;
      if (!scannedData || scannedData.trim().length === 0) {
        clearResults();
        return;
      }

      // Flash green to indicate detection
      setQrDetectedFlash(true);
      setTimeout(() => setQrDetectedFlash(false), 600);

      setIsProcessingQR(true);
      setLastProcessedQR(scannedData);

      if (isSafeLovedQRCode(scannedData)) {
        if (!validateSafeLovedQRCode(scannedData)) {
          stopScanning().then(() => {
            clearResults();
            const errorMsg =
              t.invalidQRMessage ||
              "QR kod okunamadı, lütfen ışığı veya kamerayı ayarlayın.";
            setInvalidQRMessage(errorMsg);
            setShowInvalidQRDialog(true);
            toast.error(errorMsg);
            setIsProcessingQR(false);
            setLastProcessedQR("");
          });
          return;
        }

        const decoded = decodeDualPurposeData(scannedData);

        if (decoded?.uniqueCode && decoded.uniqueCode.trim().length > 0) {
          const uniqueCode = decoded.uniqueCode.trim();
          toast.loading(t.processingQR || "QR kod işleniyor...");

          stopScanning().then(() => {
            clearResults();
            setSearchCode(uniqueCode);
            setActiveTab("code");
            toast.dismiss();
            toast.success(t.toasts.qrCodeScanned);

            getRecordMutation
              .mutateAsync(uniqueCode)
              .then((result) => {
                if (result) {
                  setRecord(result);
                  setQrRecord(result);
                  updateScanAnalytics(result.uniqueCode);
                  incrementViewCount
                    .mutateAsync(result.uniqueCode)
                    .catch(() => {});
                  addScanHistory(uniqueCode);
                  setScanHistory(getScanHistory());
                  toast.success(t.toasts.recordLoaded);
                } else {
                  setRecord(null);
                  setQrRecord(null);
                  setShowNotFoundDialog(true);
                  toast.error(t.recordNotFound);
                }
              })
              .catch(() => {
                setRecord(null);
                setQrRecord(null);
                setShowNotFoundDialog(true);
                toast.error(t.recordNotFound);
              })
              .finally(() => {
                setIsProcessingQR(false);
              });
          });
        } else {
          stopScanning().then(() => {
            clearResults();
            const errorMsg = t.invalidQRMessage || "QR kod okunamadı.";
            setInvalidQRMessage(errorMsg);
            setShowInvalidQRDialog(true);
            setIsProcessingQR(false);
            setLastProcessedQR("");
          });
        }
      } else {
        const displayText = getDisplayText(scannedData);
        stopScanning().then(() => {
          clearResults();
          setInfoDialogContent(displayText);
          setShowInfoDialog(true);
          toast.info(t.externalQRCode || "Harici QR Kod");
          setIsProcessingQR(false);
          setLastProcessedQR("");
        });
      }
    }
  }, [
    qrResults,
    isActive,
    isProcessingQR,
    lastProcessedQR,
    t,
    stopScanning,
    clearResults,
    getRecordMutation,
  ]);

  useEffect(() => {
    if (activeTab !== "qr") {
      setIsProcessingQR(false);
      setLastProcessedQR("");
    }
  }, [activeTab]);

  useEffect(() => {
    if (!isActive) setIsProcessingQR(false);
  }, [isActive]);

  const getCategoryName = () => {
    if (!record) return "";
    switch (record.category) {
      case "insan":
        return t.person;
      case "hayvan":
        return t.animal;
      case "esya":
        return t.item;
      case "arac":
        return t.vehicle;
      default:
        return "";
    }
  };

  const getRecordTitle = () => {
    if (!record) return "";
    switch (record.recordData.__kind__) {
      case "insan":
        return record.recordData.insan.adSoyad;
      case "hayvan":
        return record.recordData.hayvan.ad;
      case "esya":
        return record.recordData.esya.esyaAdi;
      case "arac":
        return record.recordData.arac.plaka;
      default:
        return t.recordInquiry;
    }
  };

  const getContactInfo = () => {
    if (!record) return { person: "", info: "" };
    switch (record.recordData.__kind__) {
      case "insan":
        return {
          person: record.recordData.insan.contactPerson,
          info: record.recordData.insan.contactInfo,
        };
      case "hayvan":
        return {
          person: record.recordData.hayvan.contactPerson,
          info: record.recordData.hayvan.contactInfo,
        };
      case "esya":
        return {
          person: record.recordData.esya.contactPerson,
          info: record.recordData.esya.contactInfo,
        };
      case "arac":
        return {
          person: record.recordData.arac.contactPerson,
          info: record.recordData.arac.contactInfo,
        };
      default:
        return { person: "", info: "" };
    }
  };

  const getCategoryNameForRecord = (rec: UserRecord) => {
    switch (rec.category) {
      case "insan":
        return t.person;
      case "hayvan":
        return t.animal;
      case "esya":
        return t.item;
      case "arac":
        return t.vehicle;
      default:
        return "";
    }
  };

  const getRecordTitleForRecord = (rec: UserRecord) => {
    switch (rec.recordData.__kind__) {
      case "insan":
        return rec.recordData.insan.adSoyad;
      case "hayvan":
        return rec.recordData.hayvan.ad;
      case "esya":
        return rec.recordData.esya.esyaAdi;
      case "arac":
        return rec.recordData.arac.plaka;
      default:
        return t.recordInquiry;
    }
  };

  const getContactInfoForRecord = (rec: UserRecord) => {
    switch (rec.recordData.__kind__) {
      case "insan":
        return {
          person: rec.recordData.insan.contactPerson,
          info: rec.recordData.insan.contactInfo,
        };
      case "hayvan":
        return {
          person: rec.recordData.hayvan.contactPerson,
          info: rec.recordData.hayvan.contactInfo,
        };
      case "esya":
        return {
          person: rec.recordData.esya.contactPerson,
          info: rec.recordData.esya.contactInfo,
        };
      case "arac":
        return {
          person: rec.recordData.arac.contactPerson,
          info: rec.recordData.arac.contactInfo,
        };
      default:
        return { person: "", info: "" };
    }
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem(HISTORY_KEY);
    } catch {
      /* ignore */
    }
    setScanHistory([]);
  };

  const contactInfo = getContactInfo();
  const recordLocation = record ? getLocation(record.uniqueCode) : null;
  const recordPhoto = record ? getPhoto(record.uniqueCode) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-accent to-secondary flex flex-col">
      <div className="flex-1 p-4">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBack}
              data-ocid="inquiry.link"
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t.backToHome}
            </Button>
            <div className="w-10" />
          </div>

          <Card className="shadow-2xl dark:bg-card">
            <CardHeader>
              <CardTitle className="text-2xl text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t.recordInquiry}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="code" data-ocid="inquiry.tab">
                    <Search className="mr-2 h-4 w-4" />
                    {t.searchByCode}
                  </TabsTrigger>
                  <TabsTrigger value="qr" data-ocid="inquiry.tab">
                    <QrCode className="mr-2 h-4 w-4" />
                    {t.scanQRCode}
                  </TabsTrigger>
                  <TabsTrigger value="history" data-ocid="inquiry.tab">
                    <Clock className="mr-2 h-4 w-4" />
                    {t.scanHistory}
                  </TabsTrigger>
                </TabsList>

                {/* Code Search Tab */}
                <TabsContent value="code" className="space-y-4">
                  <form onSubmit={handleCodeSearch} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="searchCode">{t.inquiryCodeLabel}</Label>
                      <div className="flex gap-2">
                        <Input
                          id="searchCode"
                          value={searchCode}
                          onChange={(e) => setSearchCode(e.target.value)}
                          placeholder={t.placeholders.inquiryCode}
                          className="text-center text-lg font-mono flex-1"
                          data-ocid="inquiry.search_input"
                        />
                        <Button
                          type="button"
                          variant={isListening ? "destructive" : "outline"}
                          size="icon"
                          onClick={handleVoiceSearch}
                          title={t.voiceSearch}
                          data-ocid="inquiry.button"
                        >
                          <Mic
                            className={`h-4 w-4 ${isListening ? "animate-pulse" : ""}`}
                          />
                        </Button>
                      </div>
                      {isListening && (
                        <p className="text-sm text-center text-primary animate-pulse">
                          {t.listening}
                        </p>
                      )}
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={getRecordMutation.isPending}
                      data-ocid="inquiry.submit_button"
                    >
                      {getRecordMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t.searching}
                        </>
                      ) : (
                        <>
                          <Search className="mr-2 h-4 w-4" />
                          {t.search}
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Results */}
                  {searchCode && !getRecordMutation.isPending && (
                    <>
                      {!record && getRecordMutation.isError && (
                        <Card
                          className="border-destructive"
                          data-ocid="inquiry.error_state"
                        >
                          <CardContent className="p-6 text-center text-destructive">
                            <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                            <p className="font-medium">{t.recordNotFound}</p>
                            <p className="text-sm mt-1">
                              {t.code} {searchCode}
                            </p>
                          </CardContent>
                        </Card>
                      )}
                      {record && (
                        <Card
                          className="border-2 border-primary"
                          data-ocid="inquiry.card"
                        >
                          <CardHeader>
                            <div className="flex items-center gap-4">
                              <CategoryIcon
                                category={record.category}
                                className="w-16 h-16 object-contain"
                              />
                              <div className="flex-1">
                                <CardTitle className="text-xl">
                                  {getRecordTitle()}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                  {getCategoryName()}
                                </p>
                              </div>
                              <div className="text-right text-xs text-muted-foreground">
                                <div className="flex items-center gap-1 justify-end">
                                  <Eye className="h-3 w-3 text-primary/70" />
                                  <span className="font-medium">
                                    {Number(record.viewCount)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Photo */}
                            {recordPhoto && (
                              <img
                                src={recordPhoto}
                                alt={t.photoLabel}
                                className="w-full max-h-40 object-cover rounded-lg border border-border"
                              />
                            )}

                            {/* Contact */}
                            <div className="p-4 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-lg border border-accent/20">
                              <div className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                                <div className="flex-1 space-y-2">
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      {t.contactPersonLabel}
                                    </p>
                                    <p className="text-base font-semibold">
                                      {contactInfo.person}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      {t.contactInfoLabel}
                                    </p>
                                    <p className="text-base font-semibold">
                                      {contactInfo.info}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Location */}
                            {recordLocation && (
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <span className="flex-1 truncate text-muted-foreground">
                                  {recordLocation}
                                </span>
                                <a
                                  href={`https://maps.google.com/?q=${encodeURIComponent(recordLocation)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  data-ocid="inquiry.link"
                                  className="flex items-center gap-1 text-primary hover:underline text-xs flex-shrink-0"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  {t.viewOnMap}
                                </a>
                              </div>
                            )}

                            {/* Record details */}
                            <div className="space-y-3 text-sm">
                              {record.recordData.__kind__ === "insan" && (
                                <>
                                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                                    <span className="text-muted-foreground">
                                      {t.age}:
                                    </span>
                                    <span className="font-medium">
                                      {record.recordData.insan.yas.toString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                                    <span className="text-muted-foreground">
                                      {t.relationship}:
                                    </span>
                                    <span className="font-medium">
                                      {record.recordData.insan.iliski}
                                    </span>
                                  </div>
                                  {record.recordData.insan.aciklama && (
                                    <div className="p-2 bg-muted/50 rounded">
                                      <span className="text-muted-foreground">
                                        {t.description}:
                                      </span>
                                      <p className="mt-1">
                                        {record.recordData.insan.aciklama}
                                      </p>
                                    </div>
                                  )}
                                </>
                              )}
                              {record.recordData.__kind__ === "hayvan" && (
                                <>
                                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                                    <span className="text-muted-foreground">
                                      {t.species}:
                                    </span>
                                    <span className="font-medium">
                                      {record.recordData.hayvan.tur}
                                    </span>
                                  </div>
                                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                                    <span className="text-muted-foreground">
                                      {t.color}:
                                    </span>
                                    <span className="font-medium">
                                      {record.recordData.hayvan.renk}
                                    </span>
                                  </div>
                                  {record.recordData.hayvan.notlar && (
                                    <div className="p-2 bg-muted/50 rounded">
                                      <span className="text-muted-foreground">
                                        {t.notes}:
                                      </span>
                                      <p className="mt-1">
                                        {record.recordData.hayvan.notlar}
                                      </p>
                                    </div>
                                  )}
                                </>
                              )}
                              {record.recordData.__kind__ === "esya" && (
                                <>
                                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                                    <span className="text-muted-foreground">
                                      {t.brand}:
                                    </span>
                                    <span className="font-medium">
                                      {record.recordData.esya.marka}
                                    </span>
                                  </div>
                                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                                    <span className="text-muted-foreground">
                                      {t.serialNumber}:
                                    </span>
                                    <span className="font-medium">
                                      {record.recordData.esya.seriNo}
                                    </span>
                                  </div>
                                  {record.recordData.esya.aciklama && (
                                    <div className="p-2 bg-muted/50 rounded">
                                      <span className="text-muted-foreground">
                                        {t.description}:
                                      </span>
                                      <p className="mt-1">
                                        {record.recordData.esya.aciklama}
                                      </p>
                                    </div>
                                  )}
                                </>
                              )}
                              {record.recordData.__kind__ === "arac" && (
                                <>
                                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                                    <span className="text-muted-foreground">
                                      {t.brand}:
                                    </span>
                                    <span className="font-medium">
                                      {record.recordData.arac.marka}
                                    </span>
                                  </div>
                                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                                    <span className="text-muted-foreground">
                                      {t.model}:
                                    </span>
                                    <span className="font-medium">
                                      {record.recordData.arac.model}
                                    </span>
                                  </div>
                                  <div className="flex justify-between p-2 bg-muted/50 rounded">
                                    <span className="text-muted-foreground">
                                      {t.color}:
                                    </span>
                                    <span className="font-medium">
                                      {record.recordData.arac.renk}
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </>
                  )}
                </TabsContent>

                {/* QR Tab */}
                <TabsContent value="qr" className="space-y-4">
                  {isSupported === false ? (
                    <Card
                      className="border-destructive"
                      data-ocid="inquiry.error_state"
                    >
                      <CardContent className="p-6 text-center text-destructive">
                        <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                        <p className="font-medium">{t.cameraNotSupported}</p>
                        <p className="text-sm mt-1">
                          {t.cameraNotSupportedMessage}
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <>
                      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                        <video
                          ref={videoRef}
                          className="w-full h-full object-cover"
                          playsInline
                          muted
                        />
                        <canvas ref={canvasRef} className="hidden" />
                        {!isActive && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            <div className="text-center text-white">
                              <QrCode className="h-12 w-12 mx-auto mb-2 opacity-50" />
                              <p>{t.cameraClosed}</p>
                            </div>
                          </div>
                        )}
                        {isActive && !isProcessingQR && (
                          <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div
                                className={`w-64 h-64 rounded-lg transition-all duration-300 ${
                                  qrDetectedFlash
                                    ? "border-4 border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.8)]"
                                    : "border-4 border-white/50"
                                }`}
                              >
                                <div
                                  className={`absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 rounded-tl-lg transition-colors ${qrDetectedFlash ? "border-green-400" : "border-white"}`}
                                />
                                <div
                                  className={`absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 rounded-tr-lg transition-colors ${qrDetectedFlash ? "border-green-400" : "border-white"}`}
                                />
                                <div
                                  className={`absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 rounded-bl-lg transition-colors ${qrDetectedFlash ? "border-green-400" : "border-white"}`}
                                />
                                <div
                                  className={`absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 rounded-br-lg transition-colors ${qrDetectedFlash ? "border-green-400" : "border-white"}`}
                                />
                              </div>
                            </div>
                            <div className="absolute bottom-4 left-0 right-0 text-center">
                              <div className="inline-flex items-center gap-2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
                                <Camera className="h-4 w-4 animate-pulse" />
                                <span>{t.qrInstructions[0]}</span>
                              </div>
                            </div>
                          </div>
                        )}
                        {isActive && isProcessingQR && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <div className="text-center text-white bg-black/70 px-6 py-4 rounded-lg">
                              <Loader2 className="h-8 w-8 mx-auto mb-2 animate-spin" />
                              <p className="font-medium">{t.processingQR}</p>
                            </div>
                          </div>
                        )}
                      </div>

                      {cameraError && (
                        <Card
                          className="border-destructive"
                          data-ocid="inquiry.error_state"
                        >
                          <CardContent className="p-4 text-center text-destructive text-sm">
                            <AlertCircle className="h-5 w-5 mx-auto mb-2" />
                            <p className="font-medium">{cameraError.message}</p>
                          </CardContent>
                        </Card>
                      )}

                      <div className="flex gap-2">
                        {!isActive ? (
                          <Button
                            onClick={handleStartScanning}
                            disabled={!canStartScanning}
                            className="flex-1"
                            data-ocid="inquiry.primary_button"
                          >
                            <QrCode className="mr-2 h-4 w-4" />
                            {t.startScanning}
                          </Button>
                        ) : (
                          <>
                            <Button
                              onClick={handleStopScanning}
                              variant="destructive"
                              className="flex-1"
                              disabled={isProcessingQR}
                              data-ocid="inquiry.button"
                            >
                              {t.stopScanning}
                            </Button>
                            {!isProcessingQR && (
                              <Button
                                onClick={handleRetryScan}
                                variant="outline"
                                size="icon"
                                title="Yeniden tara"
                                data-ocid="inquiry.secondary_button"
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                            )}
                          </>
                        )}
                      </div>

                      <Card className="bg-muted/50">
                        <CardContent className="p-4 text-sm text-muted-foreground">
                          <div className="flex items-start gap-2">
                            <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="font-medium mb-1">{t.howToUse}</p>
                              <ul className="text-xs space-y-1 list-disc list-inside">
                                {t.qrInstructions.map((instruction) => (
                                  <li key={instruction}>{instruction}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                        <CardContent className="p-3">
                          <p className="text-xs italic text-muted-foreground leading-relaxed">
                            {t.cameraPermissionNote}
                          </p>
                        </CardContent>
                      </Card>

                      {/* QR scan result */}
                      {qrRecord && (
                        <Card
                          className="border-2 border-primary"
                          data-ocid="inquiry.card"
                        >
                          <CardHeader>
                            <div className="flex items-center gap-4">
                              <CategoryIcon
                                category={qrRecord.category}
                                className="w-16 h-16 object-contain"
                              />
                              <div className="flex-1">
                                <CardTitle className="text-xl">
                                  {getRecordTitleForRecord(qrRecord)}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                  {getCategoryNameForRecord(qrRecord)}
                                </p>
                              </div>
                              <div className="text-right text-xs text-muted-foreground">
                                <div className="flex items-center gap-1 justify-end">
                                  <Eye className="h-3 w-3 text-primary/70" />
                                  <span className="font-medium">
                                    {Number(qrRecord.viewCount)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            {/* Photo */}
                            {getPhoto(qrRecord.uniqueCode) && (
                              <img
                                src={getPhoto(qrRecord.uniqueCode)!}
                                alt={t.photoLabel}
                                className="w-full max-h-40 object-cover rounded-lg border border-border"
                              />
                            )}

                            {/* Contact */}
                            <div className="p-4 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-lg border border-accent/20">
                              <div className="flex items-start gap-3">
                                <Phone className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                                <div className="flex-1 space-y-2">
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      {t.contactPersonLabel}
                                    </p>
                                    <p className="text-base font-semibold">
                                      {getContactInfoForRecord(qrRecord).person}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      {t.contactInfoLabel}
                                    </p>
                                    <p className="text-base font-semibold">
                                      {getContactInfoForRecord(qrRecord).info}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Location */}
                            {getLocation(qrRecord.uniqueCode) && (
                              <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                <span className="flex-1 truncate text-muted-foreground">
                                  {getLocation(qrRecord.uniqueCode)}
                                </span>
                                <a
                                  href={`https://maps.google.com/?q=${encodeURIComponent(getLocation(qrRecord.uniqueCode)!)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  data-ocid="inquiry.link"
                                  className="flex items-center gap-1 text-primary hover:underline text-xs flex-shrink-0"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  {t.viewOnMap}
                                </a>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      )}
                    </>
                  )}
                </TabsContent>

                {/* History Tab - B11 */}
                <TabsContent value="history" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{t.scanHistory}</h3>
                    {scanHistory.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearHistory}
                        data-ocid="history.delete_button"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-1.5" />
                        {t.clearHistory}
                      </Button>
                    )}
                  </div>

                  {scanHistory.length === 0 ? (
                    <Card data-ocid="history.empty_state">
                      <CardContent className="p-8 text-center">
                        <Clock className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                        <p className="text-muted-foreground">
                          {t.noScanHistory}
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="space-y-2">
                      {scanHistory.map((item, i) => (
                        <Card
                          key={`${item.code}-${i}`}
                          data-ocid={`history.item.${i + 1}`}
                          className="cursor-pointer hover:border-primary transition-colors"
                          onClick={() => {
                            setSearchCode(item.code);
                            setActiveTab("code");
                          }}
                        >
                          <CardContent className="p-3 flex items-center justify-between">
                            <div>
                              <p className="font-mono font-semibold text-sm">
                                {item.code}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(item.scannedAt).toLocaleString()}
                              </p>
                            </div>
                            <Search className="h-4 w-4 text-muted-foreground" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Privacy Policy Link */}
      <div className="text-center py-6">
        <a
          href="https://sites.google.com/view/safeloved/privacy-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/80 hover:text-white text-sm font-medium transition-colors underline"
        >
          {t.privacyPolicy}
        </a>
      </div>

      {/* Dialogs */}
      <AlertDialog open={showInfoDialog} onOpenChange={setShowInfoDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Info className="h-5 w-5 text-blue-500" />
              {t.externalQRCode}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base pt-2">
              {infoDialogContent}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowInfoDialog(false)}>
              {t.ok}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={showNotFoundDialog}
        onOpenChange={setShowNotFoundDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              {t.recordNotFoundTitle}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base pt-2">
              {t.recordNotFoundMessage}
              {searchCode && (
                <span className="block mt-2">
                  {t.code}{" "}
                  <span className="font-mono font-semibold">{searchCode}</span>
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowNotFoundDialog(false)}>
              {t.ok}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={showInvalidQRDialog}
        onOpenChange={setShowInvalidQRDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              {t.invalidQRCode}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base pt-2">
              {invalidQRMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowInvalidQRDialog(false)}>
              {t.ok}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
