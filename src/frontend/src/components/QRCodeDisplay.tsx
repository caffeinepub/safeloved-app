import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { generateEnhancedQRCode } from "@/lib/qrCodeGenerator";
import { Check, Copy, Download, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface QRCodeDisplayProps {
  code: string;
  displayText: string;
  onClose: () => void;
}

export default function QRCodeDisplay({
  code,
  displayText,
  onClose,
}: QRCodeDisplayProps) {
  const { t } = useLanguage();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setIsGenerating(true);
      try {
        const dataUrl = await generateEnhancedQRCode(code, displayText, {
          size: 400,
          primaryColor: "#8b5cf6",
          secondaryColor: "#06b6d4",
        });
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
  }, [code, displayText, t.toasts.qrCodeGenerationError]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success(t.codeCopied);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `safeloved-qr-${code.replace(/\s/g, "")}.png`;
    link.click();
    toast.success(t.toasts.qrCodeDownloaded);
  };

  return (
    <Card className="border-2 border-primary shadow-2xl">
      <CardHeader className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <CardTitle className="text-center text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {t.recordCreatedSuccessTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* QR Code */}
        <div className="flex justify-center">
          {isGenerating ? (
            <div className="w-72 h-72 flex items-center justify-center bg-muted rounded-lg animate-pulse">
              <p className="text-muted-foreground">{t.loading}</p>
            </div>
          ) : qrCodeUrl ? (
            <div className="p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border-2 border-primary/20 shadow-lg">
              <img
                src={qrCodeUrl}
                alt="QR Code"
                className="w-64 h-64 rounded-lg"
              />
            </div>
          ) : (
            <div className="w-72 h-72 flex items-center justify-center bg-muted rounded-lg">
              <p className="text-muted-foreground">
                {t.toasts.qrCodeGenerationError}
              </p>
            </div>
          )}
        </div>

        {/* Code Display */}
        <div className="p-4 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-lg border-2 border-primary/20">
          <p className="text-sm text-muted-foreground mb-2 text-center">
            {t.inquiryCode}
          </p>
          <p className="text-3xl font-bold text-center tracking-wider font-mono">
            {code}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button variant="outline" onClick={handleCopy} className="flex-1">
            {copied ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <Copy className="mr-2 h-4 w-4" />
            )}
            {copied ? t.copied : t.copyCode}
          </Button>
          <Button
            variant="outline"
            onClick={handleDownloadQR}
            disabled={!qrCodeUrl || isGenerating}
            className="flex-1"
          >
            <Download className="mr-2 h-4 w-4" />
            {t.downloadQR}
          </Button>
        </div>

        {/* Info */}
        <div className="p-4 bg-muted/50 rounded-lg space-y-2">
          <p className="text-sm text-muted-foreground text-center font-medium">
            {t.saveCodeAndQR}
          </p>
          <p className="text-xs text-muted-foreground text-center">
            {t.qrCodeInfo}
          </p>
        </div>

        {/* Close Button */}
        <Button onClick={onClose} className="w-full" size="lg">
          {t.createNewRecord}
        </Button>
      </CardContent>
    </Card>
  );
}
