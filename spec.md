# SafeLoved

## Current State

Backend (`main.mo`) şu an şunları destekliyor:
- Kullanıcı profili oluşturma / kodu ile giriş
- Kayıt oluşturma (insan, hayvan, eşya, araç kategorileri)
- Kayıt sorgulama (uniqueCode ile)
- Paylaşım linki oluşturma ve çözme
- Rol tabanlı erişim (otomatik "user" rolü)

Frontend'de şu özellikler **görsel olarak var ama sadece localStorage'da tutuluyor** (backend desteği yok):
- Fotoğraf ekleme/kaldırma (`safeloved_photo_<code>`)
- Kayıt düzenleme (alan override'ları `safeloved_record_overrides_<code>`)
- Versiyon geçmişi (`safeloved_versions_<code>`)
- GPS konum (`safeloved_location_<code>`)
- QR tarama sayacı (`safeloved_scan_<code>`)
- QR tarama geçmişi (HISTORY_KEY)
- Kayıt silme (sadece localStorage temizliyor)

## Requested Changes (Diff)

### Add

Backend'e eklenecekler:
- `deleteRecord(userCode, uniqueCode)` -- kullanıcının bir kaydını siler
- `updateRecordData(uniqueCode, recordData)` -- kayıt verilerini günceller (insan/hayvan/eşya/araç alanları)
- `updateRecordLocation(uniqueCode, location)` -- konum string'i günceller
- `incrementViewCount(uniqueCode)` -- QR tarama sayacını artırır (herkese açık)
- `getRecordViewCount(uniqueCode)` -- görüntülenme sayısını döner (herkese açık)
- `UserRecord` tipine `location` ve `viewCount` alanları eklenir

Frontend'de güncelleme:
- RecordCard: düzenleme/silme/konum/fotoğraf işlemleri backend'e yazılacak
- InquiryScreen: QR tarama anında `incrementViewCount` çağrılacak
- MyRecordsTab: silme sonrası backend'den yeniden yükleme

### Modify

- `UserRecord` tipi: `location: Text` ve `viewCount: Nat` alanları eklenir
- `addNewRecord`: başlangıçta `location = ""`, `viewCount = 0` değerleriyle oluşturur
- `getAllRecordsForUser`: güncel `location` ve `viewCount` ile döner
- `getRecordByUniqueCode`: güncel `location` ve `viewCount` ile döner
- Frontend `RecordCard`: localStorage yerine backend API çağırır
- Frontend `InquiryScreen`: QR scan'de `incrementViewCount` çağırır

### Remove

- RecordCard'da localStorage-only kod kaldırılmaz ama backend başarısız olursa localStorage fallback olarak kalır

## Implementation Plan

1. Backend `main.mo` güncelle:
   - `UserRecord` tipine `location: Text` ve `viewCount: Nat` ekle
   - `userRecordLocations` ve `userRecordViewCounts` map'leri ekle (ya da UserRecord'u güncelle)
   - `updateRecordData` fonksiyonu ekle
   - `updateRecordLocation` fonksiyonu ekle
   - `deleteRecord` fonksiyonu ekle
   - `incrementViewCount` fonksiyonu ekle (herkese açık query/shared)
   - `getRecordViewCount` fonksiyonu ekle

2. Frontend `backend.d.ts` güncelle (generate_motoko_code ile otomatik)

3. Frontend RecordCard güncelle:
   - Düzenleme kaydetme: `updateRecordData` çağır
   - Konum kaydetme: `updateRecordLocation` çağır
   - Silme: `deleteRecord` çağır
   - localStorage fallback kalsın

4. Frontend InquiryScreen güncelle:
   - QR scan ve kod araması sonrası `incrementViewCount` çağır
   - Sonuç kartında `record.viewCount` göster

5. Frontend MyRecordsTab: silme sonrası query invalidate
