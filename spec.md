# SafeLoved

## Current State

Backend (main.mo) şu özellikler içeriyor:
- UserProfile yönetimi (createNewUserCode, saveCallerUserProfile, getProfileByUserCode)
- 4 kategori kayıt sistemi (insan, hayvan, esya, arac) ile tam CRUD
- addNewRecord, getAllRecordsForUser, getRecordByUniqueCode
- updateRecordData (kayıt düzenleme) -- backend'de var
- updateRecordLocation (konum güncelleme) -- backend'de var
- deleteRecord -- backend'de var
- incrementViewCount, getRecordViewCount -- backend'de var
- generateShareableLink, getRecordByShareableLink -- backend'de var
- Kod üretimi: deterministik timestamp tabanlı (bilinen sorun, backend düzenleme kısıtlaması var)

Frontend bileşenleri:
- RecordCard.tsx: düzenleme, versiyon geçmişi (localStorage), fotoğraf (localStorage), konum, PDF export, silme -- HEPSI VAR ama backend senkronizasyonu kısmi
- MyRecordsTab.tsx: arama, kategori filtresi -- VAR
- InquiryScreen.tsx: kod arama, QR tarama, geçmiş, sesli arama -- VAR
- viewCount backend'den alınıyor ve gösteriliyor -- ÇALIŞIYOR
- Backend hook'ları: useUpdateRecordData, useUpdateRecordLocation, useDeleteRecord, useIncrementViewCount -- HEPSI VAR

Eksikler:
- Backend'de versiyon geçmişi yok (getRecordVersionHistory fonksiyonu yok) -- frontend sadece localStorage'a yazıyor
- Fotoğraf blob-storage entegrasyonu yok -- localStorage base64 ile çalışıyor (sınırlı)

## Requested Changes (Diff)

### Add
- RecordCard.tsx'e versiyon geri yükleme butonu -- kullanıcı eski bir versiyonu göründüğünde "Bu versiyona Dön" butonuna basabilmeli (localStorage'da saklanan versiyon listesinden)
- RecordCard.tsx'e daha iyi PDF export -- tüm kayıt alanlarını kategoriye göre göstermeli (şu an sadece başlık/iletişim bilgisi var)
- InquiryScreen'de QR tarama sonrası tüm kayıt detaylarını gösterme -- şu an sadece iletişim bilgisi gösteriliyor, kategori detayları da eklenecek
- MyRecordsTab'da toplam görüntülenme istatistikleri gösterme

### Modify
- RecordCard.tsx versiyon dialog'unda "Bu Versiyona Dön" butonu eklenmeli
- PDF export'ta tüm kategori alanları (yas/iliski/tur/renk/marka/model vs.) gösterilmeli
- InquiryScreen'deki QR sonuç kartı eksik alanları tamamlanacak

### Remove
- Yok

## Implementation Plan

1. RecordCard.tsx: versiyon geçmişi dialog'una "Geri Yükle" butonu ekle -- seçilen versiyonu editValues'a yükleyip dialog'u aç
2. RecordCard.tsx: handlePrint fonksiyonunu geliştir -- tüm kategori alanlarını HTML'e ekle
3. InquiryScreen.tsx: QR tarama sonuç kartına detay alanları ekle (yas/iliski, tur/renk, marka/seriNo vb.)
4. MyRecordsTab.tsx: toplam viewCount istatistiği footer'da göster
