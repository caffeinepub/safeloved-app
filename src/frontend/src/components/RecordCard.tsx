import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { generateEnhancedQRCode } from "@/lib/qrCodeGenerator";
import {
  Check,
  Clock,
  Copy,
  Download,
  Edit2,
  ExternalLink,
  Eye,
  History,
  Image,
  MapPin,
  Phone,
  Printer,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { UserRecord } from "../backend";

interface RecordCardProps {
  record: UserRecord;
}

interface ScanData {
  count: number;
  lastAt: number | null;
}

interface RecordVersion {
  savedAt: number;
  overrides: Record<string, string>;
}

function getScanData(uniqueCode: string): ScanData {
  try {
    const raw = localStorage.getItem(`safeloved_scan_${uniqueCode}`);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return { count: 0, lastAt: null };
}

function getPhotoUrl(uniqueCode: string): string | null {
  try {
    return localStorage.getItem(`safeloved_photo_${uniqueCode}`);
  } catch {
    return null;
  }
}

function getLocation(uniqueCode: string): string | null {
  try {
    return localStorage.getItem(`safeloved_location_${uniqueCode}`);
  } catch {
    return null;
  }
}

function getVersions(uniqueCode: string): RecordVersion[] {
  try {
    const raw = localStorage.getItem(`safeloved_versions_${uniqueCode}`);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return [];
}

function getOverrides(uniqueCode: string): Record<string, string> {
  try {
    const raw = localStorage.getItem(
      `safeloved_record_overrides_${uniqueCode}`,
    );
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return {};
}

function saveOverrides(
  uniqueCode: string,
  overrides: Record<string, string>,
  prevOverrides: Record<string, string>,
) {
  // Save current state as a version before overwriting
  const versions = getVersions(uniqueCode);
  versions.unshift({ savedAt: Date.now(), overrides: prevOverrides });
  if (versions.length > 20) versions.pop();
  try {
    localStorage.setItem(
      `safeloved_versions_${uniqueCode}`,
      JSON.stringify(versions),
    );
    localStorage.setItem(
      `safeloved_record_overrides_${uniqueCode}`,
      JSON.stringify(overrides),
    );
  } catch {
    /* ignore */
  }
}

export default function RecordCard({ record }: RecordCardProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(true);

  // Extra features state
  const [photo, setPhoto] = useState<string | null>(() =>
    getPhotoUrl(record.uniqueCode),
  );
  const [location, setLocation] = useState<string>(
    () => getLocation(record.uniqueCode) || "",
  );
  const scanData = getScanData(record.uniqueCode);
  const [overrides, setOverrides] = useState<Record<string, string>>(() =>
    getOverrides(record.uniqueCode),
  );
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showVersionDialog, setShowVersionDialog] = useState(false);
  const [editValues, setEditValues] = useState<Record<string, string>>({});
  const [editLocation, setEditLocation] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setIsGenerating(true);
      try {
        const dataUrl = await generateEnhancedQRCode(
          record.uniqueCode,
          record.qrEncodedData.displayText,
          { size: 200, primaryColor: "#8b5cf6", secondaryColor: "#06b6d4" },
        );
        if (!cancelled) setQrCodeUrl(dataUrl);
      } catch (error) {
        console.error("QR kod oluşturma hatası:", error);
        if (!cancelled) toast.error(t.toasts.qrCodeGenerationError);
      } finally {
        if (!cancelled) setIsGenerating(false);
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [
    record.uniqueCode,
    record.qrEncodedData.displayText,
    t.toasts.qrCodeGenerationError,
  ]);

  const getCategoryIcon = () => {
    switch (record.category) {
      case "insan":
        return "/assets/generated/insan-icon-transparent.dim_64x64.png";
      case "hayvan":
        return "/assets/generated/hayvan-icon-transparent.dim_64x64.png";
      case "esya":
        return "/assets/generated/esya-icon-transparent.dim_64x64.png";
      case "arac":
        return "/assets/generated/arac-icon-transparent.dim_64x64.png";
      default:
        return "";
    }
  };

  const getCategoryName = () => {
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
    const o = overrides;
    switch (record.recordData.__kind__) {
      case "insan":
        return o.adSoyad || record.recordData.insan.adSoyad;
      case "hayvan":
        return o.ad || record.recordData.hayvan.ad;
      case "esya":
        return o.esyaAdi || record.recordData.esya.esyaAdi;
      case "arac":
        return o.plaka || record.recordData.arac.plaka;
      default:
        return t.recordInquiry;
    }
  };

  const getContactInfo = () => {
    const o = overrides;
    switch (record.recordData.__kind__) {
      case "insan":
        return {
          person: o.contactPerson || record.recordData.insan.contactPerson,
          info: o.contactInfo || record.recordData.insan.contactInfo,
        };
      case "hayvan":
        return {
          person: o.contactPerson || record.recordData.hayvan.contactPerson,
          info: o.contactInfo || record.recordData.hayvan.contactInfo,
        };
      case "esya":
        return {
          person: o.contactPerson || record.recordData.esya.contactPerson,
          info: o.contactInfo || record.recordData.esya.contactInfo,
        };
      case "arac":
        return {
          person: o.contactPerson || record.recordData.arac.contactPerson,
          info: o.contactInfo || record.recordData.arac.contactInfo,
        };
      default:
        return { person: "", info: "" };
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(record.uniqueCode);
    setCopied(true);
    toast.success(t.codeCopied);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `safeloved-qr-${record.uniqueCode.replace(/\s/g, "")}.png`;
    link.click();
    toast.success(t.toasts.qrCodeDownloaded);
  };

  // B1: Photo upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      setPhoto(base64);
      try {
        localStorage.setItem(`safeloved_photo_${record.uniqueCode}`, base64);
      } catch {
        toast.error("Fotoğraf kaydedilemedi (depolama dolu olabilir)");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    try {
      localStorage.removeItem(`safeloved_photo_${record.uniqueCode}`);
    } catch {
      /* ignore */
    }
  };

  // B8: Location save
  const handleLocationSave = (loc: string) => {
    setLocation(loc);
    try {
      if (loc.trim()) {
        localStorage.setItem(
          `safeloved_location_${record.uniqueCode}`,
          loc.trim(),
        );
      } else {
        localStorage.removeItem(`safeloved_location_${record.uniqueCode}`);
      }
    } catch {
      /* ignore */
    }
  };

  // B3: Edit record
  const handleOpenEdit = () => {
    const base: Record<string, string> = {};
    switch (record.recordData.__kind__) {
      case "insan":
        base.adSoyad = overrides.adSoyad || record.recordData.insan.adSoyad;
        base.yas = overrides.yas || record.recordData.insan.yas.toString();
        base.iliski = overrides.iliski || record.recordData.insan.iliski;
        base.aciklama = overrides.aciklama || record.recordData.insan.aciklama;
        base.contactPerson =
          overrides.contactPerson || record.recordData.insan.contactPerson;
        base.contactInfo =
          overrides.contactInfo || record.recordData.insan.contactInfo;
        break;
      case "hayvan":
        base.ad = overrides.ad || record.recordData.hayvan.ad;
        base.tur = overrides.tur || record.recordData.hayvan.tur;
        base.renk = overrides.renk || record.recordData.hayvan.renk;
        base.notlar = overrides.notlar || record.recordData.hayvan.notlar;
        base.contactPerson =
          overrides.contactPerson || record.recordData.hayvan.contactPerson;
        base.contactInfo =
          overrides.contactInfo || record.recordData.hayvan.contactInfo;
        break;
      case "esya":
        base.esyaAdi = overrides.esyaAdi || record.recordData.esya.esyaAdi;
        base.marka = overrides.marka || record.recordData.esya.marka;
        base.seriNo = overrides.seriNo || record.recordData.esya.seriNo;
        base.aciklama = overrides.aciklama || record.recordData.esya.aciklama;
        base.contactPerson =
          overrides.contactPerson || record.recordData.esya.contactPerson;
        base.contactInfo =
          overrides.contactInfo || record.recordData.esya.contactInfo;
        break;
      case "arac":
        base.plaka = overrides.plaka || record.recordData.arac.plaka;
        base.marka = overrides.marka || record.recordData.arac.marka;
        base.model = overrides.model || record.recordData.arac.model;
        base.renk = overrides.renk || record.recordData.arac.renk;
        base.contactPerson =
          overrides.contactPerson || record.recordData.arac.contactPerson;
        base.contactInfo =
          overrides.contactInfo || record.recordData.arac.contactInfo;
        break;
    }
    setEditValues(base);
    setEditLocation(location);
    setShowEditDialog(true);
  };

  const handleSaveEdit = () => {
    saveOverrides(record.uniqueCode, editValues, overrides);
    setOverrides({ ...editValues });
    handleLocationSave(editLocation);
    setShowEditDialog(false);
    toast.success(t.success);
  };

  // B9: PDF export
  const handlePrint = () => {
    const contactInfo = getContactInfo();
    const title = getRecordTitle();
    const loc = location;
    const photoHtml = photo
      ? `<img src="${photo}" style="max-width:200px;max-height:200px;border-radius:8px;margin-bottom:12px;" />`
      : "";
    const qrHtml = qrCodeUrl
      ? `<img src="${qrCodeUrl}" style="width:150px;height:150px;border:2px solid #e5e7eb;border-radius:8px;" />`
      : "";
    const locationHtml = loc
      ? `<p><strong>${t.locationLabel}:</strong> ${loc}</p>`
      : "";

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>SafeLoved - ${title}</title>
        <style>
          body { font-family: sans-serif; padding: 32px; max-width: 600px; margin: 0 auto; color: #111; }
          h1 { font-size: 24px; margin-bottom: 4px; }
          .subtitle { color: #666; margin-bottom: 16px; }
          .section { background: #f9fafb; border-radius: 8px; padding: 12px; margin-bottom: 12px; }
          .row { display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px solid #e5e7eb; }
          .label { color: #666; font-size: 13px; }
          .value { font-weight: 600; font-size: 13px; }
          .code { font-family: monospace; font-size: 20px; font-weight: 700; letter-spacing: 2px; }
          @media print { body { padding: 16px; } }
        </style>
      </head>
      <body>
        <h1>SafeLoved</h1>
        <div class="subtitle">${getCategoryName()} Kaydı</div>
        ${photoHtml}
        <div class="section">
          <p class="code">${record.uniqueCode}</p>
          <div class="row"><span class="label">${t.fullName || "Ad"}:</span><span class="value">${title}</span></div>
          <div class="row"><span class="label">${t.contactPersonLabel}</span><span class="value">${contactInfo.person}</span></div>
          <div class="row"><span class="label">${t.contactInfoLabel}</span><span class="value">${contactInfo.info}</span></div>
          ${locationHtml}
        </div>
        ${qrHtml}
        <p style="font-size:11px;color:#999;margin-top:24px;">SafeLoved • safeloved-oix.caffeine.xyz</p>
      </body>
      </html>
    `;

    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
      win.onload = () => win.print();
    }
  };

  const contactInfo = getContactInfo();
  const versions = getVersions(record.uniqueCode);

  return (
    <Card className="hover:shadow-lg transition-shadow dark:bg-card">
      <CardHeader>
        <div className="flex items-center gap-4">
          <img
            src={getCategoryIcon()}
            alt={getCategoryName()}
            className="w-12 h-12"
          />
          <div className="flex-1">
            <CardTitle className="text-lg">{getRecordTitle()}</CardTitle>
            <p className="text-sm text-muted-foreground">{getCategoryName()}</p>
          </div>
          {/* Scan count badge */}
          <div className="text-right text-xs text-muted-foreground space-y-0.5">
            <div className="flex items-center gap-1 justify-end">
              <Eye className="h-3 w-3" />
              <span>
                {scanData.count} {t.scanCount}
              </span>
            </div>
            {scanData.lastAt && (
              <div className="flex items-center gap-1 justify-end">
                <Clock className="h-3 w-3" />
                <span>{new Date(scanData.lastAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Photo display */}
        {photo && (
          <div className="relative">
            <img
              src={photo}
              alt={t.photoLabel}
              className="w-full max-h-48 object-cover rounded-lg border border-border"
            />
          </div>
        )}

        <div className="flex gap-4 items-start">
          {/* QR Code */}
          <div className="flex-shrink-0">
            {isGenerating ? (
              <div className="w-32 h-32 border-2 border-border rounded-lg flex items-center justify-center bg-muted animate-pulse">
                <p className="text-xs text-muted-foreground">{t.loading}</p>
              </div>
            ) : qrCodeUrl ? (
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-32 h-32 border-2 border-primary/20 rounded-lg shadow-md"
              />
            ) : (
              <div className="w-32 h-32 border-2 border-border rounded-lg flex items-center justify-center bg-muted">
                <p className="text-xs text-muted-foreground text-center px-2">
                  {t.error}
                </p>
              </div>
            )}
          </div>

          {/* Code and Actions */}
          <div className="flex-1 space-y-3">
            <div className="p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20">
              <p className="text-xs text-muted-foreground mb-1">
                {t.inquiryCode}
              </p>
              <p className="text-lg font-mono font-bold">{record.uniqueCode}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="flex-1 min-w-0"
                data-ocid="record.secondary_button"
              >
                {copied ? (
                  <Check className="mr-1 h-3 w-3" />
                ) : (
                  <Copy className="mr-1 h-3 w-3" />
                )}
                {copied ? t.copied : t.copyCode}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadQR}
                disabled={!qrCodeUrl || isGenerating}
                data-ocid="record.secondary_button"
              >
                <Download className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                data-ocid="record.secondary_button"
                title={t.exportPDF}
              >
                <Printer className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="p-3 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-lg border border-accent/20">
          <div className="flex items-start gap-2">
            <Phone className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
            <div className="flex-1 space-y-1">
              <p className="text-xs text-muted-foreground">
                {t.contactPersonLabel}
              </p>
              <p className="text-sm font-medium">{contactInfo.person}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {t.contactInfoLabel}
              </p>
              <p className="text-sm font-medium">{contactInfo.info}</p>
            </div>
          </div>
        </div>

        {/* Location */}
        {location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span className="flex-1 truncate">{location}</span>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(location)}`}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="record.link"
              className="flex items-center gap-1 text-primary hover:underline text-xs"
            >
              <ExternalLink className="h-3 w-3" />
              {t.viewOnMap}
            </a>
          </div>
        )}

        {/* Record Details */}
        <div className="pt-3 border-t space-y-2 text-sm">
          {record.recordData.__kind__ === "insan" && (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.age}:</span>
                <span className="font-medium">
                  {overrides.yas || record.recordData.insan.yas.toString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.relationship}:</span>
                <span className="font-medium">
                  {overrides.iliski || record.recordData.insan.iliski}
                </span>
              </div>
              {(overrides.aciklama || record.recordData.insan.aciklama) && (
                <div>
                  <span className="text-muted-foreground">
                    {t.description}:
                  </span>
                  <p className="mt-1">
                    {overrides.aciklama || record.recordData.insan.aciklama}
                  </p>
                </div>
              )}
            </>
          )}
          {record.recordData.__kind__ === "hayvan" && (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.species}:</span>
                <span className="font-medium">
                  {overrides.tur || record.recordData.hayvan.tur}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.color}:</span>
                <span className="font-medium">
                  {overrides.renk || record.recordData.hayvan.renk}
                </span>
              </div>
              {(overrides.notlar || record.recordData.hayvan.notlar) && (
                <div>
                  <span className="text-muted-foreground">{t.notes}:</span>
                  <p className="mt-1">
                    {overrides.notlar || record.recordData.hayvan.notlar}
                  </p>
                </div>
              )}
            </>
          )}
          {record.recordData.__kind__ === "esya" && (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.brand}:</span>
                <span className="font-medium">
                  {overrides.marka || record.recordData.esya.marka}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.serialNumber}:</span>
                <span className="font-medium">
                  {overrides.seriNo || record.recordData.esya.seriNo}
                </span>
              </div>
              {(overrides.aciklama || record.recordData.esya.aciklama) && (
                <div>
                  <span className="text-muted-foreground">
                    {t.description}:
                  </span>
                  <p className="mt-1">
                    {overrides.aciklama || record.recordData.esya.aciklama}
                  </p>
                </div>
              )}
            </>
          )}
          {record.recordData.__kind__ === "arac" && (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.brand}:</span>
                <span className="font-medium">
                  {overrides.marka || record.recordData.arac.marka}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.model}:</span>
                <span className="font-medium">
                  {overrides.model || record.recordData.arac.model}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t.color}:</span>
                <span className="font-medium">
                  {overrides.renk || record.recordData.arac.renk}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Action buttons row */}
        <div className="flex gap-2 flex-wrap pt-1">
          {/* B1: Photo upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            data-ocid="record.upload_button"
          >
            <Image className="mr-1.5 h-3.5 w-3.5" />
            {photo ? t.removePhoto.split(" ")[0] : t.addPhoto}
          </Button>
          {photo && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRemovePhoto}
              className="text-destructive"
              data-ocid="record.delete_button"
            >
              {t.removePhoto}
            </Button>
          )}
          {/* B3: Edit */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleOpenEdit}
            data-ocid="record.edit_button"
          >
            <Edit2 className="mr-1.5 h-3.5 w-3.5" />
            {t.editRecord}
          </Button>
          {/* B3: Version history */}
          {versions.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowVersionDialog(true)}
              data-ocid="record.open_modal_button"
            >
              <History className="mr-1.5 h-3.5 w-3.5" />
              {t.versionHistory}
            </Button>
          )}
        </div>
      </CardContent>

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="record.dialog"
        >
          <DialogHeader>
            <DialogTitle>{t.editRecord}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            {Object.entries(editValues).map(([key, val]) => (
              <div key={key} className="space-y-1">
                <Label htmlFor={`edit-${key}`} className="capitalize text-xs">
                  {key}
                </Label>
                <Input
                  id={`edit-${key}`}
                  value={val}
                  onChange={(e) =>
                    setEditValues((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }))
                  }
                  data-ocid="record.input"
                />
              </div>
            ))}
            {/* Location field */}
            <div className="space-y-1">
              <Label htmlFor="edit-location" className="text-xs">
                {t.locationLabel}
              </Label>
              <Input
                id="edit-location"
                value={editLocation}
                onChange={(e) => setEditLocation(e.target.value)}
                placeholder="Adres veya koordinat..."
                data-ocid="record.input"
              />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              className="flex-1"
              onClick={handleSaveEdit}
              data-ocid="record.save_button"
            >
              {t.save}
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => setShowEditDialog(false)}
              data-ocid="record.cancel_button"
            >
              {t.cancel}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Version History Dialog */}
      <Dialog open={showVersionDialog} onOpenChange={setShowVersionDialog}>
        <DialogContent
          className="max-w-lg max-h-[90vh] overflow-y-auto"
          data-ocid="record.dialog"
        >
          <DialogHeader>
            <DialogTitle>{t.versionHistory}</DialogTitle>
          </DialogHeader>
          {versions.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              {t.noVersionHistory}
            </p>
          ) : (
            <div className="space-y-3">
              {versions.map((v, i) => (
                <div
                  key={v.savedAt}
                  data-ocid={`record.item.${i + 1}`}
                  className="p-3 bg-muted/50 rounded-lg text-sm"
                >
                  <p className="font-medium text-xs text-muted-foreground mb-1">
                    {t.version} {i + 1} — {new Date(v.savedAt).toLocaleString()}
                  </p>
                  <div className="space-y-1">
                    {Object.entries(v.overrides).map(([k, val]) => (
                      <div key={k} className="flex gap-2">
                        <span className="text-muted-foreground min-w-20 capitalize">
                          {k}:
                        </span>
                        <span className="truncate">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          <Button
            variant="outline"
            className="w-full mt-2"
            onClick={() => setShowVersionDialog(false)}
            data-ocid="record.close_button"
          >
            {t.close}
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
