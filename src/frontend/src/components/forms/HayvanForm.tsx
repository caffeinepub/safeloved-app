import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAddNewRecord } from "@/hooks/useQueries";
import { Image, MapPin } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { RecordCategory } from "../../backend";
import QRCodeDisplay from "../QRCodeDisplay";

interface HayvanFormProps {
  userCode: string;
  onSuccess: () => void;
}

const DISPLAY_TEXT =
  "İletişim için Google Play Store'den SafeLoved Uygulamasını İndirin ve QR Kodu Sorgulama Ekranına Okutun";

export default function HayvanForm({ userCode, onSuccess }: HayvanFormProps) {
  const { t } = useLanguage();
  const [ad, setAd] = useState("");
  const [tur, setTur] = useState("");
  const [renk, setRenk] = useState("");
  const [notlar, setNotlar] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addRecord = useAddNewRecord();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !ad.trim() ||
      !tur.trim() ||
      !renk.trim() ||
      !contactPerson.trim() ||
      !contactInfo.trim()
    ) {
      toast.error(t.fillAllFields);
      return;
    }

    try {
      const uniqueCode = await addRecord.mutateAsync({
        userCode,
        category: RecordCategory.hayvan,
        recordData: {
          __kind__: "hayvan",
          hayvan: {
            ad: ad.trim(),
            tur: tur.trim(),
            renk: renk.trim(),
            notlar: notlar.trim(),
            contactPerson: contactPerson.trim(),
            contactInfo: contactInfo.trim(),
          },
        },
      });

      if (uniqueCode) {
        if (photo) {
          try {
            localStorage.setItem(`safeloved_photo_${uniqueCode}`, photo);
          } catch {
            /* ignore */
          }
        }
        if (location.trim()) {
          try {
            localStorage.setItem(
              `safeloved_location_${uniqueCode}`,
              location.trim(),
            );
          } catch {
            /* ignore */
          }
        }
      }

      setGeneratedCode(uniqueCode);
      toast.success(t.recordCreatedSuccess);
    } catch (error) {
      toast.error(t.recordCreationError);
      console.error(error);
    }
  };

  const handleReset = () => {
    setAd("");
    setTur("");
    setRenk("");
    setNotlar("");
    setContactPerson("");
    setContactInfo("");
    setLocation("");
    setPhoto(null);
    setGeneratedCode(null);
    onSuccess();
  };

  if (generatedCode) {
    return (
      <QRCodeDisplay
        code={generatedCode}
        displayText={DISPLAY_TEXT}
        onClose={handleReset}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="ad">
          {t.name} {t.required}
        </Label>
        <Input
          id="ad"
          value={ad}
          onChange={(e) => setAd(e.target.value)}
          placeholder={t.placeholders.name}
          required
          data-ocid="form.input"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="tur">
          {t.species} {t.required}
        </Label>
        <Input
          id="tur"
          value={tur}
          onChange={(e) => setTur(e.target.value)}
          placeholder={t.placeholders.species}
          required
          data-ocid="form.input"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="renk">
          {t.color} {t.required}
        </Label>
        <Input
          id="renk"
          value={renk}
          onChange={(e) => setRenk(e.target.value)}
          placeholder={t.placeholders.color}
          required
          data-ocid="form.input"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notlar">{t.notes}</Label>
        <Textarea
          id="notlar"
          value={notlar}
          onChange={(e) => setNotlar(e.target.value)}
          placeholder={t.placeholders.notes}
          rows={3}
          data-ocid="form.textarea"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactPerson">
          {t.contactPerson} {t.required}
        </Label>
        <Input
          id="contactPerson"
          value={contactPerson}
          onChange={(e) => setContactPerson(e.target.value)}
          placeholder={t.placeholders.contactPerson}
          required
          data-ocid="form.input"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="contactInfo">
          {t.contactInfo} {t.required}
        </Label>
        <Input
          id="contactInfo"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          placeholder={t.placeholders.contactInfo}
          required
          data-ocid="form.input"
        />
      </div>

      {/* B8: Location */}
      <div className="space-y-2">
        <Label htmlFor="location" className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" />
          {t.locationLabel}
        </Label>
        <Input
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Adres veya koordinat (isteğe bağlı)"
          data-ocid="form.input"
        />
      </div>

      {/* B1: Photo */}
      <div className="space-y-2">
        <Label className="flex items-center gap-1.5">
          <Image className="h-3.5 w-3.5" />
          {t.photoLabel}
        </Label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePhotoChange}
        />
        {photo ? (
          <div className="space-y-2">
            <img
              src={photo}
              alt={t.photoLabel}
              className="w-full max-h-32 object-cover rounded-lg border border-border"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPhoto(null)}
              data-ocid="form.button"
            >
              {t.removePhoto}
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
            data-ocid="form.upload_button"
          >
            <Image className="mr-2 h-4 w-4" />
            {t.addPhoto}
          </Button>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={addRecord.isPending}
        data-ocid="form.submit_button"
      >
        {addRecord.isPending ? t.creating : t.createQRCode}
      </Button>
    </form>
  );
}
