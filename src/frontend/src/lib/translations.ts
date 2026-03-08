export type Language =
  | "tr"
  | "en"
  | "zh"
  | "es"
  | "ar"
  | "hi"
  | "fr"
  | "ru"
  | "pt";

export interface Translations {
  // Common
  loading: string;
  error: string;
  success: string;
  cancel: string;
  confirm: string;
  close: string;
  save: string;
  delete: string;
  edit: string;
  back: string;
  continue: string;
  ok: string;

  // Dark Mode
  darkMode: string;
  lightMode: string;
  darkModeToggle: string;

  // Theme Selector
  themeSelector: string;
  themePurple: string;
  themeGreen: string;
  themeOrange: string;
  themeRed: string;
  themeBlue: string;

  // Update Notification
  updateAvailable: string;
  refreshApp: string;
  dismissUpdate: string;

  // Scan History
  scanHistory: string;
  noScanHistory: string;
  clearHistory: string;

  // Voice Search
  voiceSearch: string;
  listening: string;
  voiceNotSupported: string;

  // Location
  locationLabel: string;
  viewOnMap: string;

  // Photo
  photoLabel: string;
  addPhoto: string;
  removePhoto: string;

  // Edit & Version History
  editRecord: string;
  versionHistory: string;
  noVersionHistory: string;
  version: string;

  // Delete Record
  deleteRecord: string;
  confirmDelete: string;
  deleteSuccess: string;

  // GPS Location
  getMyLocation: string;
  locationDetecting: string;
  locationError: string;

  // Scan Count
  scanCount: string;
  lastScanned: string;
  neverScanned: string;

  // PDF Export
  exportPDF: string;
  printing: string;

  // Sync Hint
  syncHint: string;

  // Notification Prompt
  notificationPrompt: string;
  allowNotifications: string;
  dismissNotification: string;

  // Backend Status
  backendOnline: string;
  backendOffline: string;
  backendChecking: string;
  retryingIn: string;
  retryNow: string;

  // Filter
  filterAll: string;
  filterPerson: string;
  filterAnimal: string;
  filterItem: string;
  filterVehicle: string;
  searchRecords: string;

  // Main Screen
  welcomeTitle: string;
  welcomeSubtitle: string;
  userEntry: string;
  userEntryDescription: string;
  newUserRegistration: string;
  existingUserLogin: string;
  inquiryEntry: string;
  inquiryEntryDescription: string;
  qrCodeInquiry: string;
  codeInquiry: string;

  // User Registration
  newUserRegistrationTitle: string;
  enterUsername: string;
  username: string;
  enterYourName: string;
  generateCode: string;
  generating: string;
  yourUserCode: string;
  codeCopied: string;
  copyCode: string;
  copied: string;
  saveCodeMessage: string;

  // User Login
  userLoginTitle: string;
  enterExistingCode: string;
  userCode: string;
  login: string;
  loginSuccess: string;
  codeFormatMessage: string;

  // User Dashboard
  welcomeMessage: string;
  accountCreatedSuccess: string;
  importantInfo: string;
  saveCodeSecurely: string;
  needCodeForLogin: string;
  dontShareCode: string;

  // User Screen
  userScreen: string;
  userScreenDescription: string;
  newRecord: string;
  myRecords: string;
  userProfile: string;
  logout: string;
  backToHome: string;

  // Record Categories
  person: string;
  animal: string;
  item: string;
  vehicle: string;
  selectCategory: string;
  selectCategoryDescription: string;
  changeCategory: string;

  // Person Form
  personRecord: string;
  fullName: string;
  age: string;
  relationship: string;
  description: string;
  contactPerson: string;
  contactInfo: string;
  additionalInfo: string;

  // Animal Form
  animalRecord: string;
  name: string;
  species: string;
  color: string;
  notes: string;

  // Item Form
  itemRecord: string;
  itemName: string;
  brand: string;
  serialNumber: string;

  // Vehicle Form
  vehicleRecord: string;
  licensePlate: string;
  model: string;

  // Form Common
  required: string;
  fillAllFields: string;
  enterValidAge: string;
  recordCreatedSuccess: string;
  recordCreationError: string;
  createQRCode: string;
  creating: string;

  // QR Code Display
  recordCreatedSuccessTitle: string;
  inquiryCode: string;
  downloadQR: string;
  saveCodeAndQR: string;
  qrCodeInfo: string;
  createNewRecord: string;

  // My Records
  allRecords: string;
  noRecordsYet: string;
  createFirstRecord: string;
  recordsLoadError: string;

  // Inquiry Screen
  recordInquiry: string;
  searchByCode: string;
  scanQRCode: string;
  inquiryCodeLabel: string;
  search: string;
  searching: string;
  recordNotFound: string;
  code: string;
  startScanning: string;
  stopScanning: string;
  cameraNotSupported: string;
  cameraNotSupportedMessage: string;
  cameraClosed: string;
  processingQR: string;
  howToUse: string;
  qrInstructions: string[];

  // Camera Permission
  cameraPermissionRequired: string;
  cameraPermissionMessage: string;
  cameraPermissionDenied: string;
  cameraPermissionDeniedMessage: string;
  requestPermission: string;
  openSettings: string;
  cameraPermissionNote: string;

  // Record Details
  contactPersonLabel: string;
  contactInfoLabel: string;

  // Alerts
  externalQRCode: string;
  recordNotFoundTitle: string;
  recordNotFoundMessage: string;
  invalidQRCode: string;
  invalidQRMessage: string;

  // Error Messages
  serverMaintenance: string;
  serverMaintenanceMessage: string;
  connectionError: string;
  connectionErrorMessage: string;
  tryAgainLater: string;

  // Offline Mode
  offlineMode: string;
  offlineModeMessage: string;
  offlineModeDescription: string;

  // Privacy Policy
  privacyPolicy: string;

  // Data Export
  exportMenu: string;
  exportAsPDF: string;
  generateShareLink: string;
  exportingPDF: string;
  generatingLink: string;
  pdfExportSuccess: string;
  pdfExportError: string;
  shareLinkSuccess: string;
  shareLinkError: string;
  shareLinkCopied: string;
  copyShareLink: string;

  // Share Record
  shareRecord: string;
  shareLink: string;
  shareHint: string;

  // Stats
  statsTitle: string;
  totalRecords: string;
  totalViews: string;

  // Placeholders
  placeholders: {
    fullName: string;
    age: string;
    relationship: string;
    description: string;
    contactPerson: string;
    contactInfo: string;
    name: string;
    species: string;
    color: string;
    notes: string;
    itemName: string;
    brand: string;
    serialNumber: string;
    licensePlate: string;
    model: string;
    inquiryCode: string;
  };

  // Toasts
  toasts: {
    enterCode: string;
    invalidCodeFormat: string;
    qrCodeScanned: string;
    recordLoaded: string;
    qrCodeDownloaded: string;
    qrCodeGenerationError: string;
    cameraStartError: string;
  };
}

export const translations: Record<Language, Translations> = {
  tr: {
    // Common
    loading: "Yükleniyor...",
    error: "Hata",
    success: "Başarılı",
    cancel: "İptal",
    confirm: "Onayla",
    close: "Kapat",
    save: "Kaydet",
    delete: "Sil",
    edit: "Düzenle",
    back: "Geri",
    continue: "Devam Et",
    ok: "Tamam",

    // Dark Mode
    darkMode: "Karanlık Mod",
    lightMode: "Aydınlık Mod",
    darkModeToggle: "Mod Değiştir",

    // Theme Selector
    themeSelector: "Tema Seçin",
    themePurple: "Mor",
    themeGreen: "Yeşil",
    themeOrange: "Turuncu",
    themeRed: "Kırmızı",
    themeBlue: "Mavi",

    // Update Notification
    updateAvailable: "✨ Yeni sürüm mevcut! Sayfayı yenileyerek güncelleyin.",
    refreshApp: "Yenile",
    dismissUpdate: "Kapat",

    // Scan History
    scanHistory: "Tarama Geçmişi",
    noScanHistory: "Henüz tarama geçmişi yok",
    clearHistory: "Geçmişi Temizle",

    // Voice Search
    voiceSearch: "Sesli Ara",
    listening: "Dinleniyor...",
    voiceNotSupported: "Sesli arama bu tarayıcıda desteklenmiyor",

    // Location
    locationLabel: "Konum",
    viewOnMap: "Haritada Görüntüle",

    // Photo
    photoLabel: "Fotoğraf",
    addPhoto: "Fotoğraf Ekle",
    removePhoto: "Fotoğrafı Kaldır",

    // Edit & Version History
    editRecord: "Kaydı Düzenle",
    versionHistory: "Versiyon Geçmişi",
    noVersionHistory: "Versiyon geçmişi yok",
    version: "Versiyon",

    // Delete Record
    deleteRecord: "Kaydı Sil",
    confirmDelete:
      "Bu kaydı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
    deleteSuccess: "Kayıt başarıyla silindi",

    // GPS Location
    getMyLocation: "Konumumu Al",
    locationDetecting: "Konum alınıyor...",
    locationError: "Konum alınamadı",

    // Scan Count
    scanCount: "Görüntülenme",
    lastScanned: "Son Tarama",
    neverScanned: "Henüz taranmadı",

    // PDF Export
    exportPDF: "PDF İndir",
    printing: "Yazdırılıyor...",

    // Sync Hint
    syncHint:
      "📱 Çapraz Cihaz: Kullanıcı kodunuzu başka cihazlarda girerek aynı kayıtlara erişebilirsiniz.",

    // Notification Prompt
    notificationPrompt:
      "🔔 Bildirim izni verin. Kayıtlarınız için hatırlatma alın.",
    allowNotifications: "İzin Ver",
    dismissNotification: "Kapat",

    // Backend Status
    backendOnline: "Sunucu çevrimiçi",
    backendOffline: "Bağlantı kurulamıyor, yeniden deneniyor",
    backendChecking: "Sunucu kontrol ediliyor...",
    retryingIn: "saniye içinde:",
    retryNow: "Şimdi Dene",

    // Filter
    filterAll: "Tümü",
    filterPerson: "İnsan",
    filterAnimal: "Hayvan",
    filterItem: "Eşya",
    filterVehicle: "Araç",
    searchRecords: "Kayıtlarda ara...",

    // Main Screen
    welcomeTitle: "SafeLoved'a Hoş Geldiniz",
    welcomeSubtitle: "Sevdikleriniz için küçük bir kod, büyük bir güven",
    userEntry: "Kullanıcı Girişi",
    userEntryDescription:
      "Yeni bir hesap oluşturun veya mevcut hesabınıza giriş yapın",
    newUserRegistration: "Yeni Kullanıcı Kaydı Oluştur",
    existingUserLogin: "Mevcut Kullanıcı Girişi",
    inquiryEntry: "Sorgulama Girişi",
    inquiryEntryDescription: "QR kod veya kayıt kodu ile sorgulama yapın",
    qrCodeInquiry: "QR Kod Sorgulama",
    codeInquiry: "Kayıt Kodu ile Sorgulama",

    // User Registration
    newUserRegistrationTitle: "Yeni Kullanıcı Kaydı",
    enterUsername: "Kullanıcı adınızı girin",
    username: "Kullanıcı Adı",
    enterYourName: "Adınızı girin",
    generateCode: "Kod Oluştur",
    generating: "Oluşturuluyor...",
    yourUserCode: "Kullanıcı Kodunuz",
    codeCopied: "Kod panoya kopyalandı!",
    copyCode: "Kopyala",
    copied: "Kopyalandı!",
    saveCodeMessage:
      "Bu kodu güvenli bir yerde saklayın. Hesabınıza giriş yapmak için ihtiyacınız olacak.",

    // User Login
    userLoginTitle: "Kullanıcı Girişi",
    enterExistingCode: "Mevcut kullanıcı kodunuzu girin",
    userCode: "Kullanıcı Kodu",
    login: "Giriş Yap",
    loginSuccess: "Giriş başarılı!",
    codeFormatMessage: "Kodunuz XXXX XXXX formatında 8 karakterden oluşmalıdır",

    // User Dashboard
    welcomeMessage: "Hoş Geldiniz!",
    accountCreatedSuccess: "Kullanıcı hesabınız başarıyla oluşturuldu",
    importantInfo: "Önemli Bilgiler:",
    saveCodeSecurely: "Bu kodu güvenli bir yerde saklayın",
    needCodeForLogin: "Hesabınıza giriş yapmak için bu koda ihtiyacınız olacak",
    dontShareCode: "Kodunuzu kimseyle paylaşmayın",

    // User Screen
    userScreen: "Kullanıcı Ekranı",
    userScreenDescription:
      "Yeni kayıt oluşturun veya mevcut kayıtlarınızı görüntüleyin",
    newRecord: "Yeni Kayıt",
    myRecords: "Kayıtlarım",
    userProfile: "Kullanıcı Profili",
    logout: "Çıkış",
    backToHome: "Ana Sayfaya Dön",

    // Record Categories
    person: "İnsan",
    animal: "Hayvan",
    item: "Eşya",
    vehicle: "Araç",
    selectCategory: "Kayıt Kategorisi Seçin",
    selectCategoryDescription: "Oluşturmak istediğiniz kayıt türünü seçin",
    changeCategory: "Kategori Değiştir",

    // Person Form
    personRecord: "İnsan Kaydı",
    fullName: "Ad Soyad",
    age: "Yaş",
    relationship: "İlişki",
    description: "Açıklama",
    contactPerson: "İletişime Geçilecek Kişi",
    contactInfo: "İletişim Bilgisi",
    additionalInfo: "Ek bilgiler...",

    // Animal Form
    animalRecord: "Hayvan Kaydı",
    name: "Ad",
    species: "Tür",
    color: "Renk",
    notes: "Not",

    // Item Form
    itemRecord: "Eşya Kaydı",
    itemName: "Eşya Adı",
    brand: "Marka",
    serialNumber: "Seri No",

    // Vehicle Form
    vehicleRecord: "Araç Kaydı",
    licensePlate: "Plaka",
    model: "Model",

    // Form Common
    required: "*",
    fillAllFields: "Lütfen tüm zorunlu alanları doldurun",
    enterValidAge: "Lütfen geçerli bir yaş girin",
    recordCreatedSuccess: "Kayıt başarıyla oluşturuldu!",
    recordCreationError: "Kayıt oluşturulurken bir hata oluştu",
    createQRCode: "QR Kod ve Sorgulama Kodu Oluştur",
    creating: "Oluşturuluyor...",

    // QR Code Display
    recordCreatedSuccessTitle: "Kayıt Başarıyla Oluşturuldu!",
    inquiryCode: "Sorgulama Kodu:",
    downloadQR: "QR İndir",
    saveCodeAndQR: "Bu kodu ve QR kodu güvenli bir yerde saklayın.",
    qrCodeInfo:
      "QR kod, SafeLoved uygulaması içinde tarandığında otomatik olarak kaydınızı gösterecektir. Uygulama dışında tarandığında ise indirme talimatları görüntülenecektir.",
    createNewRecord: "Yeni Kayıt Oluştur",

    // My Records
    allRecords: "Tüm Kayıtlarınız",
    noRecordsYet: "Henüz kayıt oluşturmadınız",
    createFirstRecord: "Yeni Kayıt sekmesinden ilk kaydınızı oluşturun",
    recordsLoadError: "Kayıtlar yüklenirken bir hata oluştu",

    // Inquiry Screen
    recordInquiry: "Kayıt Sorgulama",
    searchByCode: "Kod ile Sorgula",
    scanQRCode: "QR Kod Tara",
    inquiryCodeLabel: "Sorgulama Kodu",
    search: "Sorgula",
    searching: "Sorgulanıyor...",
    recordNotFound: "Kayıt bulunamadı",
    code: "Kod:",
    startScanning: "Taramayı Başlat",
    stopScanning: "Taramayı Durdur",
    cameraNotSupported: "Kamera desteklenmiyor",
    cameraNotSupportedMessage:
      "Cihazınızda kamera bulunamadı veya desteklenmiyor.",
    cameraClosed: "Kamera kapalı",
    processingQR: "QR kod işleniyor...",
    howToUse: "Nasıl Kullanılır?",
    qrInstructions: [
      "QR kodu kamera önüne tutun",
      "SafeLoved QR kodları otomatik olarak algılanır",
      "Kayıt bilgileri anında gösterilir",
      "Harici QR kodlar için bilgilendirme mesajı görüntülenir",
    ],

    // Camera Permission
    cameraPermissionRequired: "Kamera İzni Gerekli",
    cameraPermissionMessage:
      "QR kod taraması için kamera erişimine ihtiyacımız var. Lütfen kamera iznini verin.",
    cameraPermissionDenied: "Kamera İzni Reddedildi",
    cameraPermissionDeniedMessage:
      "QR kod taraması için kamera iznine ihtiyacımız var. Lütfen cihaz ayarlarından kamera iznini etkinleştirin.",
    requestPermission: "İzin Ver",
    openSettings: "Ayarları Aç",
    cameraPermissionNote:
      "Kamera izni otomatik olarak verilmediyse, lütfen telefonunuzun Ayarlar > Uygulamalar > SafeLoved > İzinler bölümünden Kamera iznine onay verin.",

    // Record Details
    contactPersonLabel: "İletişim Kişisi:",
    contactInfoLabel: "İletişim Bilgisi:",

    // Alerts
    externalQRCode: "Harici QR Kod",
    recordNotFoundTitle: "Kayıt Bulunamadı",
    recordNotFoundMessage:
      "Bu SafeLoved QR kodu geçerli ancak sistemde kayıtlı bir kayıt bulunamadı.",
    invalidQRCode: "Geçersiz QR Kod",
    invalidQRMessage:
      "SafeLoved QR kodu formatı geçersiz. Kod bilgisi eksik veya hatalı.",

    // Error Messages
    serverMaintenance: "Sunucu Bakımda",
    serverMaintenanceMessage:
      "Sistem şu anda bakımda. Lütfen daha sonra tekrar deneyin. Anlayışınız için teşekkür ederiz.",
    connectionError: "Bağlantı Hatası",
    connectionErrorMessage:
      "Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin ve tekrar deneyin.",
    tryAgainLater: "Lütfen daha sonra tekrar deneyin",

    // Offline Mode
    offlineMode: "Çevrimdışı Modda Çalışıyorsunuz",
    offlineModeMessage: "İnternet bağlantınız yok",
    offlineModeDescription:
      "Uygulama çevrimdışı modda çalışıyor. Bazı özellikler sınırlı olabilir. İnternet bağlantınızı kontrol edin.",

    // Privacy Policy
    privacyPolicy: "Gizlilik Politikası",

    // Data Export
    exportMenu: "Dışa Aktar",
    exportAsPDF: "PDF Olarak Dışa Aktar",
    generateShareLink: "Paylaşım Linki Oluştur",
    exportingPDF: "PDF oluşturuluyor...",
    generatingLink: "Link oluşturuluyor...",
    pdfExportSuccess: "PDF başarıyla indirildi!",
    pdfExportError: "PDF oluşturulurken bir hata oluştu",
    shareLinkSuccess: "Paylaşım linki oluşturuldu ve kopyalandı!",
    shareLinkError: "Paylaşım linki oluşturulurken bir hata oluştu",
    shareLinkCopied: "Paylaşım linki kopyalandı!",
    copyShareLink: "Linki Kopyala",

    // Share Record
    shareRecord: "Kaydı Paylaş",
    shareLink: "Paylaşım Linki Oluştur",
    shareHint: "Bu link ile kayıt bilgileri paylaşılabilir",

    // Stats
    statsTitle: "İstatistikler",
    totalRecords: "Toplam Kayıt",
    totalViews: "Toplam Görüntülenme",

    // Placeholders
    placeholders: {
      fullName: "Örn: Ahmet Yılmaz",
      age: "Örn: 25",
      relationship: "Örn: anne, kardeş, arkadaş",
      description: "Ek bilgiler...",
      contactPerson: "Örn: Mehmet Yılmaz",
      contactInfo: "Örn: 0555 123 45 67 veya email@example.com",
      name: "Örn: Minnoş",
      species: "Örn: köpek, kedi vb.",
      color: "Örn: Kahverengi",
      notes: "Ek bilgiler...",
      itemName: "Örn: Laptop",
      brand: "Örn: Apple",
      serialNumber: "Örn: ABC123456",
      licensePlate: "Örn: 34 ABC 123",
      model: "Örn: 2020",
      inquiryCode: "XXXX XXXX",
    },

    // Toasts
    toasts: {
      enterCode: "Lütfen bir kod girin",
      invalidCodeFormat: "Kod 8 karakter olmalıdır (XXXX XXXX formatında)",
      qrCodeScanned: "SafeLoved QR kodu başarıyla okundu!",
      recordLoaded: "Kayıt bilgileri yüklendi!",
      qrCodeDownloaded: "QR kod indirildi!",
      qrCodeGenerationError: "QR kod oluşturulamadı",
      cameraStartError: "Kamera başlatılamadı",
    },
  },

  en: {
    loading: "Loading...",
    error: "Error",
    success: "Success",
    cancel: "Cancel",
    confirm: "Confirm",
    close: "Close",
    save: "Save",
    delete: "Delete",
    edit: "Edit",
    back: "Back",
    continue: "Continue",
    ok: "OK",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    darkModeToggle: "Toggle Mode",
    themeSelector: "Select Theme",
    themePurple: "Purple",
    themeGreen: "Green",
    themeOrange: "Orange",
    themeRed: "Red",
    themeBlue: "Blue",
    updateAvailable: "✨ New version available! Refresh to update.",
    refreshApp: "Refresh",
    dismissUpdate: "Dismiss",
    scanHistory: "Scan History",
    noScanHistory: "No scan history yet",
    clearHistory: "Clear History",
    voiceSearch: "Voice Search",
    listening: "Listening...",
    voiceNotSupported: "Voice search is not supported in this browser",
    locationLabel: "Location",
    viewOnMap: "View on Map",
    photoLabel: "Photo",
    addPhoto: "Add Photo",
    removePhoto: "Remove Photo",
    editRecord: "Edit Record",
    versionHistory: "Version History",
    noVersionHistory: "No version history",
    version: "Version",
    deleteRecord: "Delete Record",
    confirmDelete:
      "Are you sure you want to delete this record? This action cannot be undone.",
    deleteSuccess: "Record deleted successfully",
    getMyLocation: "Get My Location",
    locationDetecting: "Detecting location...",
    locationError: "Could not get location",
    scanCount: "Views",
    lastScanned: "Last Scanned",
    neverScanned: "Never scanned",
    exportPDF: "Download PDF",
    printing: "Printing...",
    syncHint:
      "📱 Cross-Device: Enter your user code on other devices to access the same records.",
    notificationPrompt:
      "🔔 Allow notifications. Get reminders for your records.",
    allowNotifications: "Allow",
    dismissNotification: "Dismiss",
    backendOnline: "Server online",
    backendOffline: "Connection failed, retrying",
    backendChecking: "Checking server...",
    retryingIn: "in",
    retryNow: "Retry Now",
    filterAll: "All",
    filterPerson: "Person",
    filterAnimal: "Animal",
    filterItem: "Item",
    filterVehicle: "Vehicle",
    searchRecords: "Search records...",
    welcomeTitle: "Welcome to SafeLoved",
    welcomeSubtitle: "A small code for your loved ones, a big trust",
    userEntry: "User Entry",
    userEntryDescription:
      "Create a new account or log in to your existing account",
    newUserRegistration: "Create New User Registration",
    existingUserLogin: "Existing User Login",
    inquiryEntry: "Inquiry Entry",
    inquiryEntryDescription: "Search using QR code or record code",
    qrCodeInquiry: "QR Code Inquiry",
    codeInquiry: "Search by Record Code",
    newUserRegistrationTitle: "New User Registration",
    enterUsername: "Enter your username",
    username: "Username",
    enterYourName: "Enter your name",
    generateCode: "Generate Code",
    generating: "Generating...",
    yourUserCode: "Your User Code",
    codeCopied: "Code copied to clipboard!",
    copyCode: "Copy",
    copied: "Copied!",
    saveCodeMessage:
      "Keep this code in a safe place. You will need it to log in to your account.",
    userLoginTitle: "User Login",
    enterExistingCode: "Enter your existing user code",
    userCode: "User Code",
    login: "Log In",
    loginSuccess: "Login successful!",
    codeFormatMessage: "Your code must be 8 characters in XXXX XXXX format",
    welcomeMessage: "Welcome!",
    accountCreatedSuccess: "Your user account has been successfully created",
    importantInfo: "Important Information:",
    saveCodeSecurely: "Keep this code in a safe place",
    needCodeForLogin: "You will need this code to log in to your account",
    dontShareCode: "Do not share your code with anyone",
    userScreen: "User Screen",
    userScreenDescription: "Create new records or view your existing records",
    newRecord: "New Record",
    myRecords: "My Records",
    userProfile: "User Profile",
    logout: "Logout",
    backToHome: "Back to Home",
    person: "Person",
    animal: "Animal",
    item: "Item",
    vehicle: "Vehicle",
    selectCategory: "Select Record Category",
    selectCategoryDescription: "Choose the type of record you want to create",
    changeCategory: "Change Category",
    personRecord: "Person Record",
    fullName: "Full Name",
    age: "Age",
    relationship: "Relationship",
    description: "Description",
    contactPerson: "Contact Person",
    contactInfo: "Contact Information",
    additionalInfo: "Additional information...",
    animalRecord: "Animal Record",
    name: "Name",
    species: "Species",
    color: "Color",
    notes: "Notes",
    itemRecord: "Item Record",
    itemName: "Item Name",
    brand: "Brand",
    serialNumber: "Serial Number",
    vehicleRecord: "Vehicle Record",
    licensePlate: "License Plate",
    model: "Model",
    required: "*",
    fillAllFields: "Please fill in all required fields",
    enterValidAge: "Please enter a valid age",
    recordCreatedSuccess: "Record created successfully!",
    recordCreationError: "An error occurred while creating the record",
    createQRCode: "Create QR Code and Inquiry Code",
    creating: "Creating...",
    recordCreatedSuccessTitle: "Record Created Successfully!",
    inquiryCode: "Inquiry Code:",
    downloadQR: "Download QR",
    saveCodeAndQR: "Keep this code and QR code in a safe place.",
    qrCodeInfo:
      "When scanned within the SafeLoved app, the QR code will automatically display your record. When scanned outside the app, download instructions will be displayed.",
    createNewRecord: "Create New Record",
    allRecords: "All Your Records",
    noRecordsYet: "You haven't created any records yet",
    createFirstRecord: "Create your first record from the New Record tab",
    recordsLoadError: "An error occurred while loading records",
    recordInquiry: "Record Inquiry",
    searchByCode: "Search by Code",
    scanQRCode: "Scan QR Code",
    inquiryCodeLabel: "Inquiry Code",
    search: "Search",
    searching: "Searching...",
    recordNotFound: "Record not found",
    code: "Code:",
    startScanning: "Start Scanning",
    stopScanning: "Stop Scanning",
    cameraNotSupported: "Camera not supported",
    cameraNotSupportedMessage:
      "No camera found or not supported on your device.",
    cameraClosed: "Camera closed",
    processingQR: "Processing QR code...",
    howToUse: "How to Use?",
    qrInstructions: [
      "Hold the QR code in front of the camera",
      "SafeLoved QR codes are automatically detected",
      "Record information is displayed instantly",
      "Information message is displayed for external QR codes",
    ],
    cameraPermissionRequired: "Camera Permission Required",
    cameraPermissionMessage:
      "We need camera access to scan QR codes. Please grant camera permission.",
    cameraPermissionDenied: "Camera Permission Denied",
    cameraPermissionDeniedMessage:
      "We need camera permission to scan QR codes. Please enable camera permission in device settings.",
    requestPermission: "Grant Permission",
    openSettings: "Open Settings",
    cameraPermissionNote:
      "If camera permission is not granted automatically, please go to your phone's Settings > Apps > SafeLoved > Permissions and enable Camera permission.",
    contactPersonLabel: "Contact Person:",
    contactInfoLabel: "Contact Information:",
    externalQRCode: "External QR Code",
    recordNotFoundTitle: "Record Not Found",
    recordNotFoundMessage:
      "This SafeLoved QR code is valid but no record was found in the system.",
    invalidQRCode: "Invalid QR Code",
    invalidQRMessage:
      "SafeLoved QR code format is invalid. Code information is missing or incorrect.",
    serverMaintenance: "Server Under Maintenance",
    serverMaintenanceMessage:
      "The system is currently under maintenance. Please try again later. Thank you for your understanding.",
    connectionError: "Connection Error",
    connectionErrorMessage:
      "Could not connect to server. Check your internet connection and try again.",
    tryAgainLater: "Please try again later",
    offlineMode: "You Are Working in Offline Mode",
    offlineModeMessage: "No internet connection",
    offlineModeDescription:
      "The app is running in offline mode. Some features may be limited. Please check your internet connection.",
    privacyPolicy: "Privacy Policy",
    exportMenu: "Export",
    exportAsPDF: "Export as PDF",
    generateShareLink: "Generate Share Link",
    exportingPDF: "Exporting PDF...",
    generatingLink: "Generating link...",
    pdfExportSuccess: "PDF downloaded successfully!",
    pdfExportError: "An error occurred while exporting PDF",
    shareLinkSuccess: "Share link created and copied!",
    shareLinkError: "An error occurred while generating share link",
    shareLinkCopied: "Share link copied!",
    copyShareLink: "Copy Link",

    // Share Record
    shareRecord: "Share Record",
    shareLink: "Generate Share Link",
    shareHint: "Record information can be shared with this link",

    // Stats
    statsTitle: "Statistics",
    totalRecords: "Total Records",
    totalViews: "Total Views",

    placeholders: {
      fullName: "e.g., John Doe",
      age: "e.g., 25",
      relationship: "e.g., mother, sibling, friend",
      description: "Additional information...",
      contactPerson: "e.g., Jane Doe",
      contactInfo: "e.g., +1 555 123 4567 or email@example.com",
      name: "e.g., Fluffy",
      species: "e.g., dog, cat, etc.",
      color: "e.g., Brown",
      notes: "Additional information...",
      itemName: "e.g., Laptop",
      brand: "e.g., Apple",
      serialNumber: "e.g., ABC123456",
      licensePlate: "e.g., ABC 1234",
      model: "e.g., 2020",
      inquiryCode: "XXXX XXXX",
    },
    toasts: {
      enterCode: "Please enter a code",
      invalidCodeFormat: "Code must be 8 characters (XXXX XXXX format)",
      qrCodeScanned: "SafeLoved QR code scanned successfully!",
      recordLoaded: "Record information loaded!",
      qrCodeDownloaded: "QR code downloaded!",
      qrCodeGenerationError: "Could not generate QR code",
      cameraStartError: "Could not start camera",
    },
  },

  zh: {
    loading: "加载中...",
    error: "错误",
    success: "成功",
    cancel: "取消",
    confirm: "确认",
    close: "关闭",
    save: "保存",
    delete: "删除",
    edit: "编辑",
    back: "返回",
    continue: "继续",
    ok: "确定",
    darkMode: "深色模式",
    lightMode: "浅色模式",
    darkModeToggle: "切换模式",
    themeSelector: "选择主题",
    themePurple: "紫色",
    themeGreen: "绿色",
    themeOrange: "橙色",
    themeRed: "红色",
    themeBlue: "蓝色",
    updateAvailable: "✨ 新版本可用！刷新以更新。",
    refreshApp: "刷新",
    dismissUpdate: "关闭",
    scanHistory: "扫描历史",
    noScanHistory: "暂无扫描历史",
    clearHistory: "清除历史",
    voiceSearch: "语音搜索",
    listening: "正在听取...",
    voiceNotSupported: "此浏览器不支持语音搜索",
    locationLabel: "位置",
    viewOnMap: "在地图上查看",
    photoLabel: "照片",
    addPhoto: "添加照片",
    removePhoto: "删除照片",
    editRecord: "编辑记录",
    versionHistory: "版本历史",
    noVersionHistory: "无版本历史",
    version: "版本",
    deleteRecord: "删除记录",
    confirmDelete: "您确定要删除此记录吗？此操作无法撤消。",
    deleteSuccess: "记录已成功删除",
    getMyLocation: "获取我的位置",
    locationDetecting: "正在获取位置...",
    locationError: "无法获取位置",
    scanCount: "查看次数",
    lastScanned: "最后扫描",
    neverScanned: "从未扫描",
    exportPDF: "下载PDF",
    printing: "打印中...",
    syncHint: "📱 跨设备：在其他设备上输入您的用户代码以访问相同记录。",
    notificationPrompt: "🔔 允许通知。获取记录提醒。",
    allowNotifications: "允许",
    dismissNotification: "关闭",
    backendOnline: "服务器在线",
    backendOffline: "连接失败，正在重试",
    backendChecking: "检查服务器...",
    retryingIn: "秒后:",
    retryNow: "立即重试",
    filterAll: "全部",
    filterPerson: "人员",
    filterAnimal: "动物",
    filterItem: "物品",
    filterVehicle: "车辆",
    searchRecords: "搜索记录...",
    welcomeTitle: "欢迎使用 SafeLoved",
    welcomeSubtitle: "为您所爱的人提供一个小代码，一份大信任",
    userEntry: "用户入口",
    userEntryDescription: "创建新账户或登录现有账户",
    newUserRegistration: "创建新用户注册",
    existingUserLogin: "现有用户登录",
    inquiryEntry: "查询入口",
    inquiryEntryDescription: "使用二维码或记录代码进行查询",
    qrCodeInquiry: "二维码查询",
    codeInquiry: "按记录代码搜索",
    newUserRegistrationTitle: "新用户注册",
    enterUsername: "输入您的用户名",
    username: "用户名",
    enterYourName: "输入您的姓名",
    generateCode: "生成代码",
    generating: "生成中...",
    yourUserCode: "您的用户代码",
    codeCopied: "代码已复制到剪贴板！",
    copyCode: "复制",
    copied: "已复制！",
    saveCodeMessage: "请将此代码保存在安全的地方。您需要它来登录您的账户。",
    userLoginTitle: "用户登录",
    enterExistingCode: "输入您现有的用户代码",
    userCode: "用户代码",
    login: "登录",
    loginSuccess: "登录成功！",
    codeFormatMessage: "您的代码必须是 XXXX XXXX 格式的 8 个字符",
    welcomeMessage: "欢迎！",
    accountCreatedSuccess: "您的用户账户已成功创建",
    importantInfo: "重要信息：",
    saveCodeSecurely: "请将此代码保存在安全的地方",
    needCodeForLogin: "您需要此代码来登录您的账户",
    dontShareCode: "不要与任何人分享您的代码",
    userScreen: "用户界面",
    userScreenDescription: "创建新记录或查看现有记录",
    newRecord: "新记录",
    myRecords: "我的记录",
    userProfile: "用户资料",
    logout: "登出",
    backToHome: "返回主页",
    person: "人员",
    animal: "动物",
    item: "物品",
    vehicle: "车辆",
    selectCategory: "选择记录类别",
    selectCategoryDescription: "选择您要创建的记录类型",
    changeCategory: "更改类别",
    personRecord: "人员记录",
    fullName: "全名",
    age: "年龄",
    relationship: "关系",
    description: "描述",
    contactPerson: "联系人",
    contactInfo: "联系信息",
    additionalInfo: "附加信息...",
    animalRecord: "动物记录",
    name: "名称",
    species: "物种",
    color: "颜色",
    notes: "备注",
    itemRecord: "物品记录",
    itemName: "物品名称",
    brand: "品牌",
    serialNumber: "序列号",
    vehicleRecord: "车辆记录",
    licensePlate: "车牌号",
    model: "型号",
    required: "*",
    fillAllFields: "请填写所有必填字段",
    enterValidAge: "请输入有效年龄",
    recordCreatedSuccess: "记录创建成功！",
    recordCreationError: "创建记录时发生错误",
    createQRCode: "创建二维码和查询代码",
    creating: "创建中...",
    recordCreatedSuccessTitle: "记录创建成功！",
    inquiryCode: "查询代码：",
    downloadQR: "下载二维码",
    saveCodeAndQR: "请将此代码和二维码保存在安全的地方。",
    qrCodeInfo:
      "在 SafeLoved 应用内扫描时，二维码将自动显示您的记录。在应用外扫描时，将显示下载说明。",
    createNewRecord: "创建新记录",
    allRecords: "所有记录",
    noRecordsYet: "您还没有创建任何记录",
    createFirstRecord: "从新记录选项卡创建您的第一条记录",
    recordsLoadError: "加载记录时发生错误",
    recordInquiry: "记录查询",
    searchByCode: "按代码搜索",
    scanQRCode: "扫描二维码",
    inquiryCodeLabel: "查询代码",
    search: "搜索",
    searching: "搜索中...",
    recordNotFound: "未找到记录",
    code: "代码：",
    startScanning: "开始扫描",
    stopScanning: "停止扫描",
    cameraNotSupported: "不支持相机",
    cameraNotSupportedMessage: "您的设备上未找到相机或不支持。",
    cameraClosed: "相机已关闭",
    processingQR: "处理二维码中...",
    howToUse: "如何使用？",
    qrInstructions: [
      "将二维码放在相机前",
      "SafeLoved 二维码会自动检测",
      "记录信息立即显示",
      "外部二维码显示信息消息",
    ],
    cameraPermissionRequired: "需要相机权限",
    cameraPermissionMessage:
      "我们需要相机访问权限来扫描二维码。请授予相机权限。",
    cameraPermissionDenied: "相机权限被拒绝",
    cameraPermissionDeniedMessage:
      "我们需要相机权限来扫描二维码。请在设备设置中启用相机权限。",
    requestPermission: "授予权限",
    openSettings: "打开设置",
    cameraPermissionNote:
      "如果相机权限未自动授予，请转到手机的设置 > 应用 > SafeLoved > 权限并启用相机权限。",
    contactPersonLabel: "联系人：",
    contactInfoLabel: "联系信息：",
    externalQRCode: "外部二维码",
    recordNotFoundTitle: "未找到记录",
    recordNotFoundMessage: "此 SafeLoved 二维码有效，但系统中未找到记录。",
    invalidQRCode: "无效的二维码",
    invalidQRMessage: "SafeLoved 二维码格式无效。代码信息缺失或不正确。",
    serverMaintenance: "服务器维护中",
    serverMaintenanceMessage: "系统目前正在维护中。请稍后再试。感谢您的理解。",
    connectionError: "连接错误",
    connectionErrorMessage: "无法连接到服务器。请检查您的互联网连接并重试。",
    tryAgainLater: "请稍后再试",
    offlineMode: "您正在离线模式下工作",
    offlineModeMessage: "没有互联网连接",
    offlineModeDescription:
      "应用程序正在离线模式下运行。某些功能可能受限。请检查您的互联网连接。",
    privacyPolicy: "隐私政策",
    exportMenu: "导出",
    exportAsPDF: "导出为PDF",
    generateShareLink: "生成分享链接",
    exportingPDF: "正在导出PDF...",
    generatingLink: "正在生成链接...",
    pdfExportSuccess: "PDF下载成功！",
    pdfExportError: "导出PDF时发生错误",
    shareLinkSuccess: "分享链接已创建并复制！",
    shareLinkError: "生成分享链接时发生错误",
    shareLinkCopied: "分享链接已复制！",
    copyShareLink: "复制链接",

    // Share Record
    shareRecord: "分享记录",
    shareLink: "生成分享链接",
    shareHint: "可通过此链接分享记录信息",

    // Stats
    statsTitle: "统计",
    totalRecords: "总记录",
    totalViews: "总浏览量",

    placeholders: {
      fullName: "例如：张三",
      age: "例如：25",
      relationship: "例如：母亲、兄弟姐妹、朋友",
      description: "附加信息...",
      contactPerson: "例如：李四",
      contactInfo: "例如：+86 138 0000 0000 或 email@example.com",
      name: "例如：小白",
      species: "例如：狗、猫等",
      color: "例如：棕色",
      notes: "附加信息...",
      itemName: "例如：笔记本电脑",
      brand: "例如：苹果",
      serialNumber: "例如：ABC123456",
      licensePlate: "例如：京A 12345",
      model: "例如：2020",
      inquiryCode: "XXXX XXXX",
    },
    toasts: {
      enterCode: "请输入代码",
      invalidCodeFormat: "代码必须是 8 个字符（XXXX XXXX 格式）",
      qrCodeScanned: "SafeLoved 二维码扫描成功！",
      recordLoaded: "记录信息已加载！",
      qrCodeDownloaded: "二维码已下载！",
      qrCodeGenerationError: "无法生成二维码",
      cameraStartError: "无法启动相机",
    },
  },

  es: {
    loading: "Cargando...",
    error: "Error",
    success: "Éxito",
    cancel: "Cancelar",
    confirm: "Confirmar",
    close: "Cerrar",
    save: "Guardar",
    delete: "Eliminar",
    edit: "Editar",
    back: "Atrás",
    continue: "Continuar",
    ok: "OK",
    darkMode: "Modo Oscuro",
    lightMode: "Modo Claro",
    darkModeToggle: "Cambiar Modo",
    themeSelector: "Seleccionar Tema",
    themePurple: "Morado",
    themeGreen: "Verde",
    themeOrange: "Naranja",
    themeRed: "Rojo",
    themeBlue: "Azul",
    updateAvailable: "✨ ¡Nueva versión disponible! Actualiza para refrescar.",
    refreshApp: "Actualizar",
    dismissUpdate: "Cerrar",
    scanHistory: "Historial de Escaneos",
    noScanHistory: "Sin historial de escaneos",
    clearHistory: "Limpiar Historial",
    voiceSearch: "Búsqueda por Voz",
    listening: "Escuchando...",
    voiceNotSupported: "Búsqueda por voz no compatible con este navegador",
    locationLabel: "Ubicación",
    viewOnMap: "Ver en Mapa",
    photoLabel: "Foto",
    addPhoto: "Agregar Foto",
    removePhoto: "Eliminar Foto",
    editRecord: "Editar Registro",
    versionHistory: "Historial de Versiones",
    noVersionHistory: "Sin historial de versiones",
    version: "Versión",
    deleteRecord: "Eliminar Registro",
    confirmDelete:
      "¿Está seguro de que desea eliminar este registro? Esta acción no se puede deshacer.",
    deleteSuccess: "Registro eliminado exitosamente",
    getMyLocation: "Obtener Mi Ubicación",
    locationDetecting: "Detectando ubicación...",
    locationError: "No se pudo obtener la ubicación",
    scanCount: "Vistas",
    lastScanned: "Último Escaneo",
    neverScanned: "Nunca escaneado",
    exportPDF: "Descargar PDF",
    printing: "Imprimiendo...",
    syncHint:
      "📱 Sincronización: Ingrese su código de usuario en otros dispositivos para acceder a los mismos registros.",
    notificationPrompt:
      "🔔 Permitir notificaciones. Reciba recordatorios para sus registros.",
    allowNotifications: "Permitir",
    dismissNotification: "Cerrar",
    backendOnline: "Servidor en línea",
    backendOffline: "Error de conexión, reintentando",
    backendChecking: "Verificando servidor...",
    retryingIn: "en",
    retryNow: "Reintentar",
    filterAll: "Todos",
    filterPerson: "Persona",
    filterAnimal: "Animal",
    filterItem: "Artículo",
    filterVehicle: "Vehículo",
    searchRecords: "Buscar registros...",
    welcomeTitle: "Bienvenido a SafeLoved",
    welcomeSubtitle:
      "Un pequeño código para sus seres queridos, una gran confianza",
    userEntry: "Entrada de Usuario",
    userEntryDescription:
      "Cree una nueva cuenta o inicie sesión en su cuenta existente",
    newUserRegistration: "Crear Nuevo Registro de Usuario",
    existingUserLogin: "Inicio de Sesión de Usuario Existente",
    inquiryEntry: "Entrada de Consulta",
    inquiryEntryDescription: "Buscar usando código QR o código de registro",
    qrCodeInquiry: "Consulta de Código QR",
    codeInquiry: "Buscar por Código de Registro",
    newUserRegistrationTitle: "Nuevo Registro de Usuario",
    enterUsername: "Ingrese su nombre de usuario",
    username: "Nombre de Usuario",
    enterYourName: "Ingrese su nombre",
    generateCode: "Generar Código",
    generating: "Generando...",
    yourUserCode: "Su Código de Usuario",
    codeCopied: "¡Código copiado al portapapeles!",
    copyCode: "Copiar",
    copied: "¡Copiado!",
    saveCodeMessage:
      "Guarde este código en un lugar seguro. Lo necesitará para iniciar sesión en su cuenta.",
    userLoginTitle: "Inicio de Sesión de Usuario",
    enterExistingCode: "Ingrese su código de usuario existente",
    userCode: "Código de Usuario",
    login: "Iniciar Sesión",
    loginSuccess: "¡Inicio de sesión exitoso!",
    codeFormatMessage: "Su código debe tener 8 caracteres en formato XXXX XXXX",
    welcomeMessage: "¡Bienvenido!",
    accountCreatedSuccess: "Su cuenta de usuario ha sido creada exitosamente",
    importantInfo: "Información Importante:",
    saveCodeSecurely: "Guarde este código en un lugar seguro",
    needCodeForLogin: "Necesitará este código para iniciar sesión en su cuenta",
    dontShareCode: "No comparta su código con nadie",
    userScreen: "Pantalla de Usuario",
    userScreenDescription:
      "Cree nuevos registros o vea sus registros existentes",
    newRecord: "Nuevo Registro",
    myRecords: "Mis Registros",
    userProfile: "Perfil de Usuario",
    logout: "Cerrar Sesión",
    backToHome: "Volver al Inicio",
    person: "Persona",
    animal: "Animal",
    item: "Artículo",
    vehicle: "Vehículo",
    selectCategory: "Seleccionar Categoría de Registro",
    selectCategoryDescription: "Elija el tipo de registro que desea crear",
    changeCategory: "Cambiar Categoría",
    personRecord: "Registro de Persona",
    fullName: "Nombre Completo",
    age: "Edad",
    relationship: "Relación",
    description: "Descripción",
    contactPerson: "Persona de Contacto",
    contactInfo: "Información de Contacto",
    additionalInfo: "Información adicional...",
    animalRecord: "Registro de Animal",
    name: "Nombre",
    species: "Especie",
    color: "Color",
    notes: "Notas",
    itemRecord: "Registro de Artículo",
    itemName: "Nombre del Artículo",
    brand: "Marca",
    serialNumber: "Número de Serie",
    vehicleRecord: "Registro de Vehículo",
    licensePlate: "Matrícula",
    model: "Modelo",
    required: "*",
    fillAllFields: "Por favor complete todos los campos obligatorios",
    enterValidAge: "Por favor ingrese una edad válida",
    recordCreatedSuccess: "¡Registro creado exitosamente!",
    recordCreationError: "Ocurrió un error al crear el registro",
    createQRCode: "Crear Código QR y Código de Consulta",
    creating: "Creando...",
    recordCreatedSuccessTitle: "¡Registro Creado Exitosamente!",
    inquiryCode: "Código de Consulta:",
    downloadQR: "Descargar QR",
    saveCodeAndQR: "Guarde este código y código QR en un lugar seguro.",
    qrCodeInfo:
      "Cuando se escanea dentro de la aplicación SafeLoved, el código QR mostrará automáticamente su registro. Cuando se escanea fuera de la aplicación, se mostrarán las instrucciones de descarga.",
    createNewRecord: "Crear Nuevo Registro",
    allRecords: "Todos Sus Registros",
    noRecordsYet: "Aún no ha creado ningún registro",
    createFirstRecord:
      "Cree su primer registro desde la pestaña Nuevo Registro",
    recordsLoadError: "Ocurrió un error al cargar los registros",
    recordInquiry: "Consulta de Registro",
    searchByCode: "Buscar por Código",
    scanQRCode: "Escanear Código QR",
    inquiryCodeLabel: "Código de Consulta",
    search: "Buscar",
    searching: "Buscando...",
    recordNotFound: "Registro no encontrado",
    code: "Código:",
    startScanning: "Iniciar Escaneo",
    stopScanning: "Detener Escaneo",
    cameraNotSupported: "Cámara no compatible",
    cameraNotSupportedMessage:
      "No se encontró cámara o no es compatible con su dispositivo.",
    cameraClosed: "Cámara cerrada",
    processingQR: "Procesando código QR...",
    howToUse: "¿Cómo Usar?",
    qrInstructions: [
      "Sostenga el código QR frente a la cámara",
      "Los códigos QR de SafeLoved se detectan automáticamente",
      "La información del registro se muestra instantáneamente",
      "Se muestra un mensaje de información para códigos QR externos",
    ],
    cameraPermissionRequired: "Permiso de Cámara Requerido",
    cameraPermissionMessage:
      "Necesitamos acceso a la cámara para escanear códigos QR. Por favor, otorgue permiso de cámara.",
    cameraPermissionDenied: "Permiso de Cámara Denegado",
    cameraPermissionDeniedMessage:
      "Necesitamos permiso de cámara para escanear códigos QR. Por favor, habilite el permiso de cámara en la configuración del dispositivo.",
    requestPermission: "Otorgar Permiso",
    openSettings: "Abrir Configuración",
    cameraPermissionNote:
      "Si el permiso de cámara no se otorga automáticamente, vaya a Configuración > Aplicaciones > SafeLoved > Permisos de su teléfono y habilite el permiso de Cámara.",
    contactPersonLabel: "Persona de Contacto:",
    contactInfoLabel: "Información de Contacto:",
    externalQRCode: "Código QR Externo",
    recordNotFoundTitle: "Registro No Encontrado",
    recordNotFoundMessage:
      "Este código QR de SafeLoved es válido pero no se encontró ningún registro en el sistema.",
    invalidQRCode: "Código QR Inválido",
    invalidQRMessage:
      "El formato del código QR de SafeLoved es inválido. La información del código falta o es incorrecta.",
    serverMaintenance: "Servidor en Mantenimiento",
    serverMaintenanceMessage:
      "El sistema está actualmente en mantenimiento. Por favor, inténtelo de nuevo más tarde. Gracias por su comprensión.",
    connectionError: "Error de Conexión",
    connectionErrorMessage:
      "No se pudo conectar al servidor. Verifique su conexión a Internet e inténtelo de nuevo.",
    tryAgainLater: "Por favor, inténtelo de nuevo más tarde",
    offlineMode: "Está Trabajando en Modo Sin Conexión",
    offlineModeMessage: "Sin conexión a Internet",
    offlineModeDescription:
      "La aplicación se está ejecutando en modo sin conexión. Algunas funciones pueden estar limitadas. Verifique su conexión a Internet.",
    privacyPolicy: "Política de Privacidad",
    exportMenu: "Exportar",
    exportAsPDF: "Exportar como PDF",
    generateShareLink: "Generar Enlace para Compartir",
    exportingPDF: "Exportando PDF...",
    generatingLink: "Generando enlace...",
    pdfExportSuccess: "¡PDF descargado exitosamente!",
    pdfExportError: "Ocurrió un error al exportar el PDF",
    shareLinkSuccess: "¡Enlace para compartir creado y copiado!",
    shareLinkError: "Ocurrió un error al generar el enlace para compartir",
    shareLinkCopied: "¡Enlace para compartir copiado!",
    copyShareLink: "Copiar Enlace",

    // Share Record
    shareRecord: "Compartir Registro",
    shareLink: "Generar Enlace para Compartir",
    shareHint: "La información del registro se puede compartir con este enlace",

    // Stats
    statsTitle: "Estadísticas",
    totalRecords: "Total de Registros",
    totalViews: "Total de Visualizaciones",

    placeholders: {
      fullName: "ej., Juan Pérez",
      age: "ej., 25",
      relationship: "ej., madre, hermano, amigo",
      description: "Información adicional...",
      contactPerson: "ej., María García",
      contactInfo: "ej., +34 600 000 000 o email@example.com",
      name: "ej., Pelusa",
      species: "ej., perro, gato, etc.",
      color: "ej., Marrón",
      notes: "Información adicional...",
      itemName: "ej., Portátil",
      brand: "ej., Apple",
      serialNumber: "ej., ABC123456",
      licensePlate: "ej., ABC 1234",
      model: "ej., 2020",
      inquiryCode: "XXXX XXXX",
    },
    toasts: {
      enterCode: "Por favor ingrese un código",
      invalidCodeFormat:
        "El código debe tener 8 caracteres (formato XXXX XXXX)",
      qrCodeScanned: "¡Código QR de SafeLoved escaneado exitosamente!",
      recordLoaded: "¡Información del registro cargada!",
      qrCodeDownloaded: "¡Código QR descargado!",
      qrCodeGenerationError: "No se pudo generar el código QR",
      cameraStartError: "No se pudo iniciar la cámara",
    },
  },
  ar: {
    loading: "جاري التحميل...",
    error: "خطأ",
    success: "نجح",
    cancel: "إلغاء",
    confirm: "تأكيد",
    close: "إغلاق",
    save: "حفظ",
    delete: "حذف",
    edit: "تعديل",
    back: "رجوع",
    continue: "متابعة",
    ok: "موافق",
    darkMode: "الوضع الداكن",
    lightMode: "الوضع الفاتح",
    darkModeToggle: "تبديل الوضع",
    themeSelector: "اختر السمة",
    themePurple: "بنفسجي",
    themeGreen: "أخضر",
    themeOrange: "برتقالي",
    themeRed: "أحمر",
    themeBlue: "أزرق",
    updateAvailable: "✨ نسخة جديدة متاحة! أعد التحميل للتحديث.",
    refreshApp: "تحديث",
    dismissUpdate: "إغلاق",
    scanHistory: "سجل المسح",
    noScanHistory: "لا يوجد سجل مسح",
    clearHistory: "مسح السجل",
    voiceSearch: "البحث الصوتي",
    listening: "جاري الاستماع...",
    voiceNotSupported: "البحث الصوتي غير مدعوم في هذا المتصفح",
    locationLabel: "الموقع",
    viewOnMap: "عرض على الخريطة",
    photoLabel: "صورة",
    addPhoto: "إضافة صورة",
    removePhoto: "إزالة الصورة",
    editRecord: "تعديل السجل",
    versionHistory: "سجل الإصدارات",
    noVersionHistory: "لا يوجد سجل إصدارات",
    version: "إصدار",
    deleteRecord: "حذف السجل",
    confirmDelete:
      "هل أنت متأكد أنك تريد حذف هذا السجل؟ لا يمكن التراجع عن هذا الإجراء.",
    deleteSuccess: "تم حذف السجل بنجاح",
    getMyLocation: "الحصول على موقعي",
    locationDetecting: "جاري تحديد الموقع...",
    locationError: "تعذر الحصول على الموقع",
    scanCount: "المشاهدات",
    lastScanned: "آخر مسح",
    neverScanned: "لم يُمسح أبداً",
    exportPDF: "تحميل PDF",
    printing: "جاري الطباعة...",
    syncHint:
      "📱 عبر الأجهزة: أدخل رمز المستخدم على أجهزة أخرى للوصول إلى نفس السجلات.",
    notificationPrompt: "🔔 اسمح بالإشعارات. احصل على تذكيرات لسجلاتك.",
    allowNotifications: "سماح",
    dismissNotification: "إغلاق",
    backendOnline: "الخادم متصل",
    backendOffline: "فشل الاتصال، إعادة المحاولة",
    backendChecking: "جاري التحقق من الخادم...",
    retryingIn: "في",
    retryNow: "حاول الآن",
    filterAll: "الكل",
    filterPerson: "شخص",
    filterAnimal: "حيوان",
    filterItem: "عنصر",
    filterVehicle: "مركبة",
    searchRecords: "البحث في السجلات...",
    welcomeTitle: "مرحباً بك في SafeLoved",
    welcomeSubtitle: "رمز صغير لأحبائك، ثقة كبيرة",
    userEntry: "دخول المستخدم",
    userEntryDescription: "إنشاء حساب جديد أو تسجيل الدخول إلى حسابك الحالي",
    newUserRegistration: "إنشاء تسجيل مستخدم جديد",
    existingUserLogin: "تسجيل دخول مستخدم حالي",
    inquiryEntry: "دخول الاستعلام",
    inquiryEntryDescription: "البحث باستخدام رمز QR أو رمز السجل",
    qrCodeInquiry: "استعلام رمز QR",
    codeInquiry: "البحث برمز السجل",
    newUserRegistrationTitle: "تسجيل مستخدم جديد",
    enterUsername: "أدخل اسم المستخدم الخاص بك",
    username: "اسم المستخدم",
    enterYourName: "أدخل اسمك",
    generateCode: "إنشاء رمز",
    generating: "جاري الإنشاء...",
    yourUserCode: "رمز المستخدم الخاص بك",
    codeCopied: "تم نسخ الرمز إلى الحافظة!",
    copyCode: "نسخ",
    copied: "تم النسخ!",
    saveCodeMessage:
      "احتفظ بهذا الرمز في مكان آمن. ستحتاجه لتسجيل الدخول إلى حسابك.",
    userLoginTitle: "تسجيل دخول المستخدم",
    enterExistingCode: "أدخل رمز المستخدم الحالي الخاص بك",
    userCode: "رمز المستخدم",
    login: "تسجيل الدخول",
    loginSuccess: "تم تسجيل الدخول بنجاح!",
    codeFormatMessage: "يجب أن يكون رمزك 8 أحرف بتنسيق XXXX XXXX",
    welcomeMessage: "مرحباً!",
    accountCreatedSuccess: "تم إنشاء حساب المستخدم الخاص بك بنجاح",
    importantInfo: "معلومات مهمة:",
    saveCodeSecurely: "احتفظ بهذا الرمز في مكان آمن",
    needCodeForLogin: "ستحتاج هذا الرمز لتسجيل الدخول إلى حسابك",
    dontShareCode: "لا تشارك رمزك مع أي شخص",
    userScreen: "شاشة المستخدم",
    userScreenDescription: "إنشاء سجلات جديدة أو عرض سجلاتك الحالية",
    newRecord: "سجل جديد",
    myRecords: "سجلاتي",
    userProfile: "ملف المستخدم",
    logout: "تسجيل الخروج",
    backToHome: "العودة إلى الصفحة الرئيسية",
    person: "شخص",
    animal: "حيوان",
    item: "عنصر",
    vehicle: "مركبة",
    selectCategory: "اختر فئة السجل",
    selectCategoryDescription: "اختر نوع السجل الذي تريد إنشاءه",
    changeCategory: "تغيير الفئة",
    personRecord: "سجل شخص",
    fullName: "الاسم الكامل",
    age: "العمر",
    relationship: "العلاقة",
    description: "الوصف",
    contactPerson: "شخص الاتصال",
    contactInfo: "معلومات الاتصال",
    additionalInfo: "معلومات إضافية...",
    animalRecord: "سجل حيوان",
    name: "الاسم",
    species: "النوع",
    color: "اللون",
    notes: "ملاحظات",
    itemRecord: "سجل عنصر",
    itemName: "اسم العنصر",
    brand: "العلامة التجارية",
    serialNumber: "الرقم التسلسلي",
    vehicleRecord: "سجل مركبة",
    licensePlate: "لوحة الترخيص",
    model: "الموديل",
    required: "*",
    fillAllFields: "يرجى ملء جميع الحقول المطلوبة",
    enterValidAge: "يرجى إدخال عمر صالح",
    recordCreatedSuccess: "تم إنشاء السجل بنجاح!",
    recordCreationError: "حدث خطأ أثناء إنشاء السجل",
    createQRCode: "إنشاء رمز QR ورمز الاستعلام",
    creating: "جاري الإنشاء...",
    recordCreatedSuccessTitle: "تم إنشاء السجل بنجاح!",
    inquiryCode: "رمز الاستعلام:",
    downloadQR: "تنزيل QR",
    saveCodeAndQR: "احتفظ بهذا الرمز ورمز QR في مكان آمن.",
    qrCodeInfo:
      "عند المسح داخل تطبيق SafeLoved، سيعرض رمز QR سجلك تلقائياً. عند المسح خارج التطبيق، ستظهر تعليمات التنزيل.",
    createNewRecord: "إنشاء سجل جديد",
    allRecords: "جميع سجلاتك",
    noRecordsYet: "لم تقم بإنشاء أي سجلات بعد",
    createFirstRecord: "أنشئ سجلك الأول من علامة التبويب سجل جديد",
    recordsLoadError: "حدث خطأ أثناء تحميل السجلات",
    recordInquiry: "استعلام السجل",
    searchByCode: "البحث بالرمز",
    scanQRCode: "مسح رمز QR",
    inquiryCodeLabel: "رمز الاستعلام",
    search: "بحث",
    searching: "جاري البحث...",
    recordNotFound: "لم يتم العثور على السجل",
    code: "الرمز:",
    startScanning: "بدء المسح",
    stopScanning: "إيقاف المسح",
    cameraNotSupported: "الكاميرا غير مدعومة",
    cameraNotSupportedMessage:
      "لم يتم العثور على كاميرا أو غير مدعومة على جهازك.",
    cameraClosed: "الكاميرا مغلقة",
    processingQR: "جاري معالجة رمز QR...",
    howToUse: "كيفية الاستخدام؟",
    qrInstructions: [
      "امسك رمز QR أمام الكاميرا",
      "يتم اكتشاف رموز QR الخاصة بـ SafeLoved تلقائياً",
      "يتم عرض معلومات السجل على الفور",
      "يتم عرض رسالة معلومات لرموز QR الخارجية",
    ],
    cameraPermissionRequired: "إذن الكاميرا مطلوب",
    cameraPermissionMessage:
      "نحتاج إلى الوصول إلى الكاميرا لمسح رموز QR. يرجى منح إذن الكاميرا.",
    cameraPermissionDenied: "تم رفض إذن الكاميرا",
    cameraPermissionDeniedMessage:
      "نحتاج إلى إذن الكاميرا لمسح رموز QR. يرجى تمكين إذن الكاميرا في إعدادات الجهاز.",
    requestPermission: "منح الإذن",
    openSettings: "فتح الإعدادات",
    cameraPermissionNote:
      "إذا لم يتم منح إذن الكاميرا تلقائياً، يرجى الانتقال إلى الإعدادات > التطبيقات > SafeLoved > الأذونات في هاتفك وتمكين إذن الكاميرا.",
    contactPersonLabel: "شخص الاتصال:",
    contactInfoLabel: "معلومات الاتصال:",
    externalQRCode: "رمز QR خارجي",
    recordNotFoundTitle: "لم يتم العثور على السجل",
    recordNotFoundMessage:
      "رمز QR الخاص بـ SafeLoved صالح ولكن لم يتم العثور على سجل في النظام.",
    invalidQRCode: "رمز QR غير صالح",
    invalidQRMessage:
      "تنسيق رمز QR الخاص بـ SafeLoved غير صالح. معلومات الرمز مفقودة أو غير صحيحة.",
    serverMaintenance: "الخادم قيد الصيانة",
    serverMaintenanceMessage:
      "النظام قيد الصيانة حالياً. يرجى المحاولة مرة أخرى لاحقاً. شكراً لتفهمك.",
    connectionError: "خطأ في الاتصال",
    connectionErrorMessage:
      "تعذر الاتصال بالخادم. تحقق من اتصالك بالإنترنت وحاول مرة أخرى.",
    tryAgainLater: "يرجى المحاولة مرة أخرى لاحقاً",
    offlineMode: "أنت تعمل في وضع عدم الاتصال",
    offlineModeMessage: "لا يوجد اتصال بالإنترنت",
    offlineModeDescription:
      "التطبيق يعمل في وضع عدم الاتصال. قد تكون بعض الميزات محدودة. يرجى التحقق من اتصالك بالإنترنت.",
    privacyPolicy: "سياسة الخصوصية",
    exportMenu: "تصدير",
    exportAsPDF: "تصدير كـ PDF",
    generateShareLink: "إنشاء رابط مشاركة",
    exportingPDF: "جاري تصدير PDF...",
    generatingLink: "جاري إنشاء الرابط...",
    pdfExportSuccess: "تم تنزيل PDF بنجاح!",
    pdfExportError: "حدث خطأ أثناء تصدير PDF",
    shareLinkSuccess: "تم إنشاء رابط المشاركة ونسخه!",
    shareLinkError: "حدث خطأ أثناء إنشاء رابط المشاركة",
    shareLinkCopied: "تم نسخ رابط المشاركة!",
    copyShareLink: "نسخ الرابط",

    // Share Record
    shareRecord: "مشاركة السجل",
    shareLink: "إنشاء رابط مشاركة",
    shareHint: "يمكن مشاركة معلومات السجل من خلال هذا الرابط",

    // Stats
    statsTitle: "الإحصاءات",
    totalRecords: "إجمالي السجلات",
    totalViews: "إجمالي المشاهدات",

    placeholders: {
      fullName: "مثال: أحمد محمد",
      age: "مثال: 25",
      relationship: "مثال: أم، أخ، صديق",
      description: "معلومات إضافية...",
      contactPerson: "مثال: محمد علي",
      contactInfo: "مثال: +966 50 000 0000 أو email@example.com",
      name: "مثال: فلافي",
      species: "مثال: كلب، قطة، إلخ",
      color: "مثال: بني",
      notes: "معلومات إضافية...",
      itemName: "مثال: كمبيوتر محمول",
      brand: "مثال: أبل",
      serialNumber: "مثال: ABC123456",
      licensePlate: "مثال: ABC 1234",
      model: "مثال: 2020",
      inquiryCode: "XXXX XXXX",
    },
    toasts: {
      enterCode: "يرجى إدخال رمز",
      invalidCodeFormat: "يجب أن يكون الرمز 8 أحرف (تنسيق XXXX XXXX)",
      qrCodeScanned: "تم مسح رمز QR الخاص بـ SafeLoved بنجاح!",
      recordLoaded: "تم تحميل معلومات السجل!",
      qrCodeDownloaded: "تم تنزيل رمز QR!",
      qrCodeGenerationError: "تعذر إنشاء رمز QR",
      cameraStartError: "تعذر بدء الكاميرا",
    },
  },
  hi: {
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफल",
    cancel: "रद्द करें",
    confirm: "पुष्टि करें",
    close: "बंद करें",
    save: "सहेजें",
    delete: "हटाएं",
    edit: "संपादित करें",
    back: "वापस",
    continue: "जारी रखें",
    ok: "ठीक है",
    darkMode: "डार्क मोड",
    lightMode: "लाइट मोड",
    darkModeToggle: "मोड बदलें",
    themeSelector: "थीम चुनें",
    themePurple: "बैंगनी",
    themeGreen: "हरा",
    themeOrange: "नारंगी",
    themeRed: "लाल",
    themeBlue: "नीला",
    updateAvailable: "✨ नया संस्करण उपलब्ध! अपडेट करने के लिए रिफ्रेश करें।",
    refreshApp: "रिफ्रेश",
    dismissUpdate: "बंद करें",
    scanHistory: "स्कैन इतिहास",
    noScanHistory: "कोई स्कैन इतिहास नहीं",
    clearHistory: "इतिहास साफ करें",
    voiceSearch: "वॉइस सर्च",
    listening: "सुन रहा है...",
    voiceNotSupported: "इस ब्राउज़र में वॉइस सर्च समर्थित नहीं है",
    locationLabel: "स्थान",
    viewOnMap: "मानचित्र पर देखें",
    photoLabel: "फ़ोटो",
    addPhoto: "फ़ोटो जोड़ें",
    removePhoto: "फ़ोटो हटाएं",
    editRecord: "रिकॉर्ड संपादित करें",
    versionHistory: "संस्करण इतिहास",
    noVersionHistory: "कोई संस्करण इतिहास नहीं",
    version: "संस्करण",
    deleteRecord: "रिकॉर्ड हटाएं",
    confirmDelete:
      "क्या आप वाकई इस रिकॉर्ड को हटाना चाहते हैं? यह क्रिया पूर्ववत नहीं की जा सकती।",
    deleteSuccess: "रिकॉर्ड सफलतापूर्वक हटाया गया",
    getMyLocation: "मेरा स्थान प्राप्त करें",
    locationDetecting: "स्थान का पता लगाया जा रहा है...",
    locationError: "स्थान प्राप्त नहीं किया जा सका",
    scanCount: "दर्शन",
    lastScanned: "अंतिम स्कैन",
    neverScanned: "कभी स्कैन नहीं किया",
    exportPDF: "PDF डाउनलोड करें",
    printing: "प्रिंट हो रहा है...",
    syncHint:
      "📱 क्रॉस-डिवाइस: अन्य डिवाइस पर उपयोगकर्ता कोड दर्ज करके समान रिकॉर्ड तक पहुंचें।",
    notificationPrompt:
      "🔔 सूचनाओं की अनुमति दें। अपने रिकॉर्ड के लिए रिमाइंडर प्राप्त करें।",
    allowNotifications: "अनुमति दें",
    dismissNotification: "बंद करें",
    backendOnline: "सर्वर ऑनलाइन",
    backendOffline: "कनेक्शन विफल, पुनः प्रयास",
    backendChecking: "सर्वर जांच रहा है...",
    retryingIn: "में:",
    retryNow: "अभी प्रयास करें",
    filterAll: "सभी",
    filterPerson: "व्यक्ति",
    filterAnimal: "जानवर",
    filterItem: "वस्तु",
    filterVehicle: "वाहन",
    searchRecords: "रिकॉर्ड खोजें...",
    welcomeTitle: "SafeLoved में आपका स्वागत है",
    welcomeSubtitle: "आपके प्रियजनों के लिए एक छोटा कोड, एक बड़ा विश्वास",
    userEntry: "उपयोगकर्ता प्रवेश",
    userEntryDescription: "नया खाता बनाएं या अपने मौजूदा खाते में लॉग इन करें",
    newUserRegistration: "नया उपयोगकर्ता पंजीकरण बनाएं",
    existingUserLogin: "मौजूदा उपयोगकर्ता लॉगिन",
    inquiryEntry: "पूछताछ प्रवेश",
    inquiryEntryDescription: "QR कोड या रिकॉर्ड कोड का उपयोग करके खोजें",
    qrCodeInquiry: "QR कोड पूछताछ",
    codeInquiry: "रिकॉर्ड कोड द्वारा खोजें",
    newUserRegistrationTitle: "नया उपयोगकर्ता पंजीकरण",
    enterUsername: "अपना उपयोगकर्ता नाम दर्ज करें",
    username: "उपयोगकर्ता नाम",
    enterYourName: "अपना नाम दर्ज करें",
    generateCode: "कोड जनरेट करें",
    generating: "जनरेट हो रहा है...",
    yourUserCode: "आपका उपयोगकर्ता कोड",
    codeCopied: "कोड क्लिपबोर्ड पर कॉपी किया गया!",
    copyCode: "कॉपी करें",
    copied: "कॉपी किया गया!",
    saveCodeMessage:
      "इस कोड को सुरक्षित स्थान पर रखें। आपको अपने खाते में लॉग इन करने के लिए इसकी आवश्यकता होगी।",
    userLoginTitle: "उपयोगकर्ता लॉगिन",
    enterExistingCode: "अपना मौजूदा उपयोगकर्ता कोड दर्ज करें",
    userCode: "उपयोगकर्ता कोड",
    login: "लॉग इन करें",
    loginSuccess: "लॉगिन सफल!",
    codeFormatMessage: "आपका कोड XXXX XXXX प्रारूप में 8 वर्णों का होना चाहिए",
    welcomeMessage: "स्वागत है!",
    accountCreatedSuccess: "आपका उपयोगकर्ता खाता सफलतापूर्वक बनाया गया है",
    importantInfo: "महत्वपूर्ण जानकारी:",
    saveCodeSecurely: "इस कोड को सुरक्षित स्थान पर रखें",
    needCodeForLogin: "आपको अपने खाते में लॉग इन करने के लिए इस कोड की आवश्यकता होगी",
    dontShareCode: "अपना कोड किसी के साथ साझा न करें",
    userScreen: "उपयोगकर्ता स्क्रीन",
    userScreenDescription: "नए रिकॉर्ड बनाएं या अपने मौजूदा रिकॉर्ड देखें",
    newRecord: "नया रिकॉर्ड",
    myRecords: "मेरे रिकॉर्ड",
    userProfile: "उपयोगकर्ता प्रोफ़ाइल",
    logout: "लॉग आउट",
    backToHome: "होम पर वापस जाएं",
    person: "व्यक्ति",
    animal: "जानवर",
    item: "वस्तु",
    vehicle: "वाहन",
    selectCategory: "रिकॉर्ड श्रेणी चुनें",
    selectCategoryDescription: "आप जो रिकॉर्ड बनाना चाहते हैं उसका प्रकार चुनें",
    changeCategory: "श्रेणी बदलें",
    personRecord: "व्यक्ति रिकॉर्ड",
    fullName: "पूरा नाम",
    age: "आयु",
    relationship: "संबंध",
    description: "विवरण",
    contactPerson: "संपर्क व्यक्ति",
    contactInfo: "संपर्क जानकारी",
    additionalInfo: "अतिरिक्त जानकारी...",
    animalRecord: "जानवर रिकॉर्ड",
    name: "नाम",
    species: "प्रजाति",
    color: "रंग",
    notes: "नोट्स",
    itemRecord: "वस्तु रिकॉर्ड",
    itemName: "वस्तु का नाम",
    brand: "ब्रांड",
    serialNumber: "सीरियल नंबर",
    vehicleRecord: "वाहन रिकॉर्ड",
    licensePlate: "लाइसेंस प्लेट",
    model: "मॉडल",
    required: "*",
    fillAllFields: "कृपया सभी आवश्यक फ़ील्ड भरें",
    enterValidAge: "कृपया एक मान्य आयु दर्ज करें",
    recordCreatedSuccess: "रिकॉर्ड सफलतापूर्वक बनाया गया!",
    recordCreationError: "रिकॉर्ड बनाते समय एक त्रुटि हुई",
    createQRCode: "QR कोड और पूछताछ कोड बनाएं",
    creating: "बना रहे हैं...",
    recordCreatedSuccessTitle: "रिकॉर्ड सफलतापूर्वक बनाया गया!",
    inquiryCode: "पूछताछ कोड:",
    downloadQR: "QR डाउनलोड करें",
    saveCodeAndQR: "इस कोड और QR कोड को सुरक्षित स्थान पर रखें।",
    qrCodeInfo:
      "SafeLoved ऐप के भीतर स्कैन करने पर, QR कोड स्वचालित रूप से आपका रिकॉर्ड प्रदर्शित करेगा। ऐप के बाहर स्कैन करने पर, डाउनलोड निर्देश प्रदर्शित होंगे।",
    createNewRecord: "नया रिकॉर्ड बनाएं",
    allRecords: "आपके सभी रिकॉर्ड",
    noRecordsYet: "आपने अभी तक कोई रिकॉर्ड नहीं बनाया है",
    createFirstRecord: "नया रिकॉर्ड टैब से अपना पहला रिकॉर्ड बनाएं",
    recordsLoadError: "रिकॉर्ड लोड करते समय एक त्रुटि हुई",
    recordInquiry: "रिकॉर्ड पूछताछ",
    searchByCode: "कोड द्वारा खोजें",
    scanQRCode: "QR कोड स्कैन करें",
    inquiryCodeLabel: "पूछताछ कोड",
    search: "खोजें",
    searching: "खोज रहे हैं...",
    recordNotFound: "रिकॉर्ड नहीं मिला",
    code: "कोड:",
    startScanning: "स्कैनिंग शुरू करें",
    stopScanning: "स्कैनिंग बंद करें",
    cameraNotSupported: "कैमरा समर्थित नहीं है",
    cameraNotSupportedMessage:
      "आपके डिवाइस पर कोई कैमरा नहीं मिला या समर्थित नहीं है।",
    cameraClosed: "कैमरा बंद",
    processingQR: "QR कोड प्रोसेस हो रहा है...",
    howToUse: "कैसे उपयोग करें?",
    qrInstructions: [
      "QR कोड को कैमरे के सामने रखें",
      "SafeLoved QR कोड स्वचालित रूप से पहचाने जाते हैं",
      "रिकॉर्ड जानकारी तुरंत प्रदर्शित होती है",
      "बाहरी QR कोड के लिए सूचना संदेश प्रदर्शित होता है",
    ],
    cameraPermissionRequired: "कैमरा अनुमति आवश्यक",
    cameraPermissionMessage:
      "QR कोड स्कैन करने के लिए हमें कैमरा एक्सेस की आवश्यकता है। कृपया कैमरा अनुमति दें।",
    cameraPermissionDenied: "कैमरा अनुमति अस्वीकृत",
    cameraPermissionDeniedMessage:
      "QR कोड स्कैन करने के लिए हमें कैमरा अनुमति की आवश्यकता है। कृपया डिवाइस सेटिंग्स में कैमरा अनुमति सक्षम करें।",
    requestPermission: "अनुमति दें",
    openSettings: "सेटिंग्स खोलें",
    cameraPermissionNote:
      "यदि कैमरा अनुमति स्वचालित रूप से नहीं दी गई है, तो कृपया अपने फोन की सेटिंग्स > ऐप्स > SafeLoved > अनुमतियां पर जाएं और कैमरा अनुमति सक्षम करें।",
    contactPersonLabel: "संपर्क व्यक्ति:",
    contactInfoLabel: "संपर्क जानकारी:",
    externalQRCode: "बाहरी QR कोड",
    recordNotFoundTitle: "रिकॉर्ड नहीं मिला",
    recordNotFoundMessage:
      "यह SafeLoved QR कोड मान्य है लेकिन सिस्टम में कोई रिकॉर्ड नहीं मिला।",
    invalidQRCode: "अमान्य QR कोड",
    invalidQRMessage:
      "SafeLoved QR कोड प्रारूप अमान्य है। कोड जानकारी गायब या गलत है।",
    serverMaintenance: "सर्वर रखरखाव में",
    serverMaintenanceMessage:
      "सिस्टम वर्तमान में रखरखाव में है। कृपया बाद में पुनः प्रयास करें। आपकी समझ के लिए धन्यवाद।",
    connectionError: "कनेक्शन त्रुटि",
    connectionErrorMessage:
      "सर्वर से कनेक्ट नहीं हो सका। अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।",
    tryAgainLater: "कृपया बाद में पुनः प्रयास करें",
    offlineMode: "आप ऑफ़लाइन मोड में काम कर रहे हैं",
    offlineModeMessage: "कोई इंटरनेट कनेक्शन नहीं",
    offlineModeDescription:
      "ऐप ऑफ़लाइन मोड में चल रहा है। कुछ सुविधाएं सीमित हो सकती हैं। कृपया अपना इंटरनेट कनेक्शन जांचें।",
    privacyPolicy: "गोपनीयता नीति",
    exportMenu: "निर्यात",
    exportAsPDF: "PDF के रूप में निर्यात करें",
    generateShareLink: "शेयर लिंक बनाएं",
    exportingPDF: "PDF निर्यात हो रहा है...",
    generatingLink: "लिंक बनाया जा रहा है...",
    pdfExportSuccess: "PDF सफलतापूर्वक डाउनलोड किया गया!",
    pdfExportError: "PDF निर्यात करते समय एक त्रुटि हुई",
    shareLinkSuccess: "शेयर लिंक बनाया और कॉपी किया गया!",
    shareLinkError: "शेयर लिंक बनाते समय एक त्रुटि हुई",
    shareLinkCopied: "शेयर लिंक कॉपी किया गया!",
    copyShareLink: "लिंक कॉपी करें",

    // Share Record
    shareRecord: "रिकॉर्ड शेयर करें",
    shareLink: "शेयर लिंक बनाएं",
    shareHint: "इस लिंक से रिकॉर्ड जानकारी साझा की जा सकती है",

    // Stats
    statsTitle: "आँकड़े",
    totalRecords: "कुल रिकॉर्ड",
    totalViews: "कुल दर्शन",

    placeholders: {
      fullName: "उदा., राज कुमार",
      age: "उदा., 25",
      relationship: "उदा., माँ, भाई, दोस्त",
      description: "अतिरिक्त जानकारी...",
      contactPerson: "उदा., सुनील शर्मा",
      contactInfo: "उदा., +91 98765 43210 या email@example.com",
      name: "उदा., टॉमी",
      species: "उदा., कुत्ता, बिल्ली, आदि",
      color: "उदा., भूरा",
      notes: "अतिरिक्त जानकारी...",
      itemName: "उदा., लैपटॉप",
      brand: "उदा., एप्पल",
      serialNumber: "उदा., ABC123456",
      licensePlate: "उदा., DL 01 AB 1234",
      model: "उदा., 2020",
      inquiryCode: "XXXX XXXX",
    },
    toasts: {
      enterCode: "कृपया एक कोड दर्ज करें",
      invalidCodeFormat: "कोड 8 वर्णों का होना चाहिए (XXXX XXXX प्रारूप)",
      qrCodeScanned: "SafeLoved QR कोड सफलतापूर्वक स्कैन किया गया!",
      recordLoaded: "रिकॉर्ड जानकारी लोड की गई!",
      qrCodeDownloaded: "QR कोड डाउनलोड किया गया!",
      qrCodeGenerationError: "QR कोड जनरेट नहीं किया जा सका",
      cameraStartError: "कैमरा शुरू नहीं किया जा सका",
    },
  },
  fr: {
    loading: "Chargement...",
    error: "Erreur",
    success: "Succès",
    cancel: "Annuler",
    confirm: "Confirmer",
    close: "Fermer",
    save: "Enregistrer",
    delete: "Supprimer",
    edit: "Modifier",
    back: "Retour",
    continue: "Continuer",
    ok: "OK",
    darkMode: "Mode Sombre",
    lightMode: "Mode Clair",
    darkModeToggle: "Changer de Mode",
    themeSelector: "Sélectionner un Thème",
    themePurple: "Violet",
    themeGreen: "Vert",
    themeOrange: "Orange",
    themeRed: "Rouge",
    themeBlue: "Bleu",
    updateAvailable:
      "✨ Nouvelle version disponible ! Actualisez pour mettre à jour.",
    refreshApp: "Actualiser",
    dismissUpdate: "Fermer",
    scanHistory: "Historique des Scans",
    noScanHistory: "Aucun historique de scan",
    clearHistory: "Effacer l'Historique",
    voiceSearch: "Recherche Vocale",
    listening: "Écoute en cours...",
    voiceNotSupported:
      "Recherche vocale non prise en charge dans ce navigateur",
    locationLabel: "Emplacement",
    viewOnMap: "Voir sur la Carte",
    photoLabel: "Photo",
    addPhoto: "Ajouter une Photo",
    removePhoto: "Supprimer la Photo",
    editRecord: "Modifier l'Enregistrement",
    versionHistory: "Historique des Versions",
    noVersionHistory: "Aucun historique de version",
    version: "Version",
    deleteRecord: "Supprimer l'Enregistrement",
    confirmDelete:
      "Êtes-vous sûr de vouloir supprimer cet enregistrement ? Cette action est irréversible.",
    deleteSuccess: "Enregistrement supprimé avec succès",
    getMyLocation: "Obtenir Ma Position",
    locationDetecting: "Détection de la position...",
    locationError: "Impossible d'obtenir la position",
    scanCount: "Vues",
    lastScanned: "Dernier Scan",
    neverScanned: "Jamais scanné",
    exportPDF: "Télécharger PDF",
    printing: "Impression...",
    syncHint:
      "📱 Multi-Appareils: Entrez votre code utilisateur sur d'autres appareils pour accéder aux mêmes enregistrements.",
    notificationPrompt:
      "🔔 Autorisez les notifications. Recevez des rappels pour vos enregistrements.",
    allowNotifications: "Autoriser",
    dismissNotification: "Fermer",
    backendOnline: "Serveur en ligne",
    backendOffline: "Connexion échouée, nouvelle tentative",
    backendChecking: "Vérification du serveur...",
    retryingIn: "dans",
    retryNow: "Réessayer",
    filterAll: "Tous",
    filterPerson: "Personne",
    filterAnimal: "Animal",
    filterItem: "Article",
    filterVehicle: "Véhicule",
    searchRecords: "Rechercher des enregistrements...",
    welcomeTitle: "Bienvenue sur SafeLoved",
    welcomeSubtitle: "Un petit code pour vos proches, une grande confiance",
    userEntry: "Entrée Utilisateur",
    userEntryDescription:
      "Créez un nouveau compte ou connectez-vous à votre compte existant",
    newUserRegistration: "Créer une Nouvelle Inscription Utilisateur",
    existingUserLogin: "Connexion Utilisateur Existant",
    inquiryEntry: "Entrée de Demande",
    inquiryEntryDescription:
      "Rechercher en utilisant le code QR ou le code d'enregistrement",
    qrCodeInquiry: "Demande de Code QR",
    codeInquiry: "Rechercher par Code d'Enregistrement",
    newUserRegistrationTitle: "Nouvelle Inscription Utilisateur",
    enterUsername: "Entrez votre nom d'utilisateur",
    username: "Nom d'Utilisateur",
    enterYourName: "Entrez votre nom",
    generateCode: "Générer le Code",
    generating: "Génération...",
    yourUserCode: "Votre Code Utilisateur",
    codeCopied: "Code copié dans le presse-papiers!",
    copyCode: "Copier",
    copied: "Copié!",
    saveCodeMessage:
      "Conservez ce code dans un endroit sûr. Vous en aurez besoin pour vous connecter à votre compte.",
    userLoginTitle: "Connexion Utilisateur",
    enterExistingCode: "Entrez votre code utilisateur existant",
    userCode: "Code Utilisateur",
    login: "Se Connecter",
    loginSuccess: "Connexion réussie!",
    codeFormatMessage:
      "Votre code doit comporter 8 caractères au format XXXX XXXX",
    welcomeMessage: "Bienvenue!",
    accountCreatedSuccess: "Votre compte utilisateur a été créé avec succès",
    importantInfo: "Informations Importantes:",
    saveCodeSecurely: "Conservez ce code dans un endroit sûr",
    needCodeForLogin:
      "Vous aurez besoin de ce code pour vous connecter à votre compte",
    dontShareCode: "Ne partagez pas votre code avec qui que ce soit",
    userScreen: "Écran Utilisateur",
    userScreenDescription:
      "Créez de nouveaux enregistrements ou consultez vos enregistrements existants",
    newRecord: "Nouvel Enregistrement",
    myRecords: "Mes Enregistrements",
    userProfile: "Profil Utilisateur",
    logout: "Déconnexion",
    backToHome: "Retour à l'Accueil",
    person: "Personne",
    animal: "Animal",
    item: "Article",
    vehicle: "Véhicule",
    selectCategory: "Sélectionner la Catégorie d'Enregistrement",
    selectCategoryDescription:
      "Choisissez le type d'enregistrement que vous souhaitez créer",
    changeCategory: "Changer de Catégorie",
    personRecord: "Enregistrement de Personne",
    fullName: "Nom Complet",
    age: "Âge",
    relationship: "Relation",
    description: "Description",
    contactPerson: "Personne de Contact",
    contactInfo: "Informations de Contact",
    additionalInfo: "Informations supplémentaires...",
    animalRecord: "Enregistrement d'Animal",
    name: "Nom",
    species: "Espèce",
    color: "Couleur",
    notes: "Notes",
    itemRecord: "Enregistrement d'Article",
    itemName: "Nom de l'Article",
    brand: "Marque",
    serialNumber: "Numéro de Série",
    vehicleRecord: "Enregistrement de Véhicule",
    licensePlate: "Plaque d'Immatriculation",
    model: "Modèle",
    required: "*",
    fillAllFields: "Veuillez remplir tous les champs obligatoires",
    enterValidAge: "Veuillez entrer un âge valide",
    recordCreatedSuccess: "Enregistrement créé avec succès!",
    recordCreationError:
      "Une erreur s'est produite lors de la création de l'enregistrement",
    createQRCode: "Créer le Code QR et le Code de Demande",
    creating: "Création...",
    recordCreatedSuccessTitle: "Enregistrement Créé avec Succès!",
    inquiryCode: "Code de Demande:",
    downloadQR: "Télécharger QR",
    saveCodeAndQR: "Conservez ce code et ce code QR dans un endroit sûr.",
    qrCodeInfo:
      "Lorsqu'il est scanné dans l'application SafeLoved, le code QR affichera automatiquement votre enregistrement. Lorsqu'il est scanné en dehors de l'application, les instructions de téléchargement seront affichées.",
    createNewRecord: "Créer un Nouvel Enregistrement",
    allRecords: "Tous Vos Enregistrements",
    noRecordsYet: "Vous n'avez pas encore créé d'enregistrements",
    createFirstRecord:
      "Créez votre premier enregistrement depuis l'onglet Nouvel Enregistrement",
    recordsLoadError:
      "Une erreur s'est produite lors du chargement des enregistrements",
    recordInquiry: "Demande d'Enregistrement",
    searchByCode: "Rechercher par Code",
    scanQRCode: "Scanner le Code QR",
    inquiryCodeLabel: "Code de Demande",
    search: "Rechercher",
    searching: "Recherche...",
    recordNotFound: "Enregistrement non trouvé",
    code: "Code:",
    startScanning: "Démarrer le Scan",
    stopScanning: "Arrêter le Scan",
    cameraNotSupported: "Caméra non prise en charge",
    cameraNotSupportedMessage:
      "Aucune caméra trouvée ou non prise en charge sur votre appareil.",
    cameraClosed: "Caméra fermée",
    processingQR: "Traitement du code QR...",
    howToUse: "Comment Utiliser?",
    qrInstructions: [
      "Tenez le code QR devant la caméra",
      "Les codes QR SafeLoved sont automatiquement détectés",
      "Les informations d'enregistrement sont affichées instantanément",
      "Un message d'information est affiché pour les codes QR externes",
    ],
    cameraPermissionRequired: "Autorisation de Caméra Requise",
    cameraPermissionMessage:
      "Nous avons besoin d'accéder à la caméra pour scanner les codes QR. Veuillez accorder l'autorisation de caméra.",
    cameraPermissionDenied: "Autorisation de Caméra Refusée",
    cameraPermissionDeniedMessage:
      "Nous avons besoin de l'autorisation de caméra pour scanner les codes QR. Veuillez activer l'autorisation de caméra dans les paramètres de l'appareil.",
    requestPermission: "Accorder l'Autorisation",
    openSettings: "Ouvrir les Paramètres",
    cameraPermissionNote:
      "Si l'autorisation de caméra n'est pas accordée automatiquement, veuillez accéder aux Paramètres > Applications > SafeLoved > Autorisations de votre téléphone et activer l'autorisation Caméra.",
    contactPersonLabel: "Personne de Contact:",
    contactInfoLabel: "Informations de Contact:",
    externalQRCode: "Code QR Externe",
    recordNotFoundTitle: "Enregistrement Non Trouvé",
    recordNotFoundMessage:
      "Ce code QR SafeLoved est valide mais aucun enregistrement n'a été trouvé dans le système.",
    invalidQRCode: "Code QR Invalide",
    invalidQRMessage:
      "Le format du code QR SafeLoved est invalide. Les informations du code sont manquantes ou incorrectes.",
    serverMaintenance: "Serveur en Maintenance",
    serverMaintenanceMessage:
      "Le système est actuellement en maintenance. Veuillez réessayer plus tard. Merci de votre compréhension.",
    connectionError: "Erreur de Connexion",
    connectionErrorMessage:
      "Impossible de se connecter au serveur. Vérifiez votre connexion Internet et réessayez.",
    tryAgainLater: "Veuillez réessayer plus tard",
    offlineMode: "Vous Travaillez en Mode Hors Ligne",
    offlineModeMessage: "Pas de connexion Internet",
    offlineModeDescription:
      "L'application fonctionne en mode hors ligne. Certaines fonctionnalités peuvent être limitées. Veuillez vérifier votre connexion Internet.",
    privacyPolicy: "Politique de Confidentialité",
    exportMenu: "Exporter",
    exportAsPDF: "Exporter en PDF",
    generateShareLink: "Générer un Lien de Partage",
    exportingPDF: "Exportation du PDF...",
    generatingLink: "Génération du lien...",
    pdfExportSuccess: "PDF téléchargé avec succès!",
    pdfExportError: "Une erreur s'est produite lors de l'exportation du PDF",
    shareLinkSuccess: "Lien de partage créé et copié!",
    shareLinkError:
      "Une erreur s'est produite lors de la génération du lien de partage",
    shareLinkCopied: "Lien de partage copié!",
    copyShareLink: "Copier le Lien",

    // Share Record
    shareRecord: "Partager l'Enregistrement",
    shareLink: "Générer un Lien de Partage",
    shareHint:
      "Les informations d'enregistrement peuvent être partagées avec ce lien",

    // Stats
    statsTitle: "Statistiques",
    totalRecords: "Total des Enregistrements",
    totalViews: "Total des Vues",

    placeholders: {
      fullName: "ex., Jean Dupont",
      age: "ex., 25",
      relationship: "ex., mère, frère, ami",
      description: "Informations supplémentaires...",
      contactPerson: "ex., Marie Martin",
      contactInfo: "ex., +33 6 00 00 00 00 ou email@example.com",
      name: "ex., Minou",
      species: "ex., chien, chat, etc.",
      color: "ex., Marron",
      notes: "Informations supplémentaires...",
      itemName: "ex., Ordinateur portable",
      brand: "ex., Apple",
      serialNumber: "ex., ABC123456",
      licensePlate: "ex., AB-123-CD",
      model: "ex., 2020",
      inquiryCode: "XXXX XXXX",
    },
    toasts: {
      enterCode: "Veuillez entrer un code",
      invalidCodeFormat:
        "Le code doit comporter 8 caractères (format XXXX XXXX)",
      qrCodeScanned: "Code QR SafeLoved scanné avec succès!",
      recordLoaded: "Informations d'enregistrement chargées!",
      qrCodeDownloaded: "Code QR téléchargé!",
      qrCodeGenerationError: "Impossible de générer le code QR",
      cameraStartError: "Impossible de démarrer la caméra",
    },
  },
  ru: {
    loading: "Загрузка...",
    error: "Ошибка",
    success: "Успешно",
    cancel: "Отмена",
    confirm: "Подтвердить",
    close: "Закрыть",
    save: "Сохранить",
    delete: "Удалить",
    edit: "Редактировать",
    back: "Назад",
    continue: "Продолжить",
    ok: "ОК",
    darkMode: "Тёмный Режим",
    lightMode: "Светлый Режим",
    darkModeToggle: "Переключить Режим",
    themeSelector: "Выбрать Тему",
    themePurple: "Фиолетовый",
    themeGreen: "Зелёный",
    themeOrange: "Оранжевый",
    themeRed: "Красный",
    themeBlue: "Синий",
    updateAvailable: "✨ Доступна новая версия! Обновите страницу.",
    refreshApp: "Обновить",
    dismissUpdate: "Закрыть",
    scanHistory: "История Сканирований",
    noScanHistory: "Нет истории сканирований",
    clearHistory: "Очистить Историю",
    voiceSearch: "Голосовой Поиск",
    listening: "Слушаю...",
    voiceNotSupported: "Голосовой поиск не поддерживается в этом браузере",
    locationLabel: "Местоположение",
    viewOnMap: "Посмотреть на Карте",
    photoLabel: "Фото",
    addPhoto: "Добавить Фото",
    removePhoto: "Удалить Фото",
    editRecord: "Редактировать Запись",
    versionHistory: "История Версий",
    noVersionHistory: "Нет истории версий",
    version: "Версия",
    deleteRecord: "Удалить Запись",
    confirmDelete:
      "Вы уверены, что хотите удалить эту запись? Это действие нельзя отменить.",
    deleteSuccess: "Запись успешно удалена",
    getMyLocation: "Получить Моё Местоположение",
    locationDetecting: "Определение местоположения...",
    locationError: "Не удалось получить местоположение",
    scanCount: "Просмотры",
    lastScanned: "Последнее Сканирование",
    neverScanned: "Никогда не сканировалось",
    exportPDF: "Скачать PDF",
    printing: "Печать...",
    syncHint:
      "📱 Между Устройствами: Введите код пользователя на других устройствах для доступа к тем же записям.",
    notificationPrompt:
      "🔔 Разрешите уведомления. Получайте напоминания для ваших записей.",
    allowNotifications: "Разрешить",
    dismissNotification: "Закрыть",
    backendOnline: "Сервер онлайн",
    backendOffline: "Нет соединения, повторная попытка",
    backendChecking: "Проверка сервера...",
    retryingIn: "через",
    retryNow: "Попробовать",
    filterAll: "Все",
    filterPerson: "Человек",
    filterAnimal: "Животное",
    filterItem: "Предмет",
    filterVehicle: "Транспорт",
    searchRecords: "Поиск записей...",
    welcomeTitle: "Добро пожаловать в SafeLoved",
    welcomeSubtitle: "Маленький код для ваших близких, большое доверие",
    userEntry: "Вход Пользователя",
    userEntryDescription:
      "Создайте новую учетную запись или войдите в существующую",
    newUserRegistration: "Создать Новую Регистрацию Пользователя",
    existingUserLogin: "Вход Существующего Пользователя",
    inquiryEntry: "Вход для Запроса",
    inquiryEntryDescription: "Поиск с использованием QR-кода или кода записи",
    qrCodeInquiry: "Запрос QR-кода",
    codeInquiry: "Поиск по Коду Записи",
    newUserRegistrationTitle: "Новая Регистрация Пользователя",
    enterUsername: "Введите ваше имя пользователя",
    username: "Имя Пользователя",
    enterYourName: "Введите ваше имя",
    generateCode: "Сгенерировать Код",
    generating: "Генерация...",
    yourUserCode: "Ваш Код Пользователя",
    codeCopied: "Код скопирован в буфер обмена!",
    copyCode: "Копировать",
    copied: "Скопировано!",
    saveCodeMessage:
      "Сохраните этот код в безопасном месте. Он понадобится вам для входа в вашу учетную запись.",
    userLoginTitle: "Вход Пользователя",
    enterExistingCode: "Введите ваш существующий код пользователя",
    userCode: "Код Пользователя",
    login: "Войти",
    loginSuccess: "Вход выполнен успешно!",
    codeFormatMessage:
      "Ваш код должен состоять из 8 символов в формате XXXX XXXX",
    welcomeMessage: "Добро пожаловать!",
    accountCreatedSuccess: "Ваша учетная запись пользователя успешно создана",
    importantInfo: "Важная Информация:",
    saveCodeSecurely: "Сохраните этот код в безопасном месте",
    needCodeForLogin:
      "Вам понадобится этот код для входа в вашу учетную запись",
    dontShareCode: "Не делитесь своим кодом ни с кем",
    userScreen: "Экран Пользователя",
    userScreenDescription:
      "Создавайте новые записи или просматривайте существующие",
    newRecord: "Новая Запись",
    myRecords: "Мои Записи",
    userProfile: "Профиль Пользователя",
    logout: "Выйти",
    backToHome: "Вернуться на Главную",
    person: "Человек",
    animal: "Животное",
    item: "Предмет",
    vehicle: "Транспорт",
    selectCategory: "Выберите Категорию Записи",
    selectCategoryDescription: "Выберите тип записи, которую хотите создать",
    changeCategory: "Изменить Категорию",
    personRecord: "Запись о Человеке",
    fullName: "Полное Имя",
    age: "Возраст",
    relationship: "Отношение",
    description: "Описание",
    contactPerson: "Контактное Лицо",
    contactInfo: "Контактная Информация",
    additionalInfo: "Дополнительная информация...",
    animalRecord: "Запись о Животном",
    name: "Имя",
    species: "Вид",
    color: "Цвет",
    notes: "Заметки",
    itemRecord: "Запись о Предмете",
    itemName: "Название Предмета",
    brand: "Бренд",
    serialNumber: "Серийный Номер",
    vehicleRecord: "Запись о Транспорте",
    licensePlate: "Номерной Знак",
    model: "Модель",
    required: "*",
    fillAllFields: "Пожалуйста, заполните все обязательные поля",
    enterValidAge: "Пожалуйста, введите действительный возраст",
    recordCreatedSuccess: "Запись успешно создана!",
    recordCreationError: "Произошла ошибка при создании записи",
    createQRCode: "Создать QR-код и Код Запроса",
    creating: "Создание...",
    recordCreatedSuccessTitle: "Запись Успешно Создана!",
    inquiryCode: "Код Запроса:",
    downloadQR: "Скачать QR",
    saveCodeAndQR: "Сохраните этот код и QR-код в безопасном месте.",
    qrCodeInfo:
      "При сканировании в приложении SafeLoved QR-код автоматически отобразит вашу запись. При сканировании вне приложения будут отображены инструкции по загрузке.",
    createNewRecord: "Создать Новую Запись",
    allRecords: "Все Ваши Записи",
    noRecordsYet: "Вы еще не создали ни одной записи",
    createFirstRecord: "Создайте свою первую запись на вкладке Новая Запись",
    recordsLoadError: "Произошла ошибка при загрузке записей",
    recordInquiry: "Запрос Записи",
    searchByCode: "Поиск по Коду",
    scanQRCode: "Сканировать QR-код",
    inquiryCodeLabel: "Код Запроса",
    search: "Поиск",
    searching: "Поиск...",
    recordNotFound: "Запись не найдена",
    code: "Код:",
    startScanning: "Начать Сканирование",
    stopScanning: "Остановить Сканирование",
    cameraNotSupported: "Камера не поддерживается",
    cameraNotSupportedMessage:
      "Камера не найдена или не поддерживается на вашем устройстве.",
    cameraClosed: "Камера закрыта",
    processingQR: "Обработка QR-кода...",
    howToUse: "Как Использовать?",
    qrInstructions: [
      "Держите QR-код перед камерой",
      "QR-коды SafeLoved определяются автоматически",
      "Информация о записи отображается мгновенно",
      "Для внешних QR-кодов отображается информационное сообщение",
    ],
    cameraPermissionRequired: "Требуется Разрешение Камеры",
    cameraPermissionMessage:
      "Нам нужен доступ к камере для сканирования QR-кодов. Пожалуйста, предоставьте разрешение камеры.",
    cameraPermissionDenied: "Разрешение Камеры Отклонено",
    cameraPermissionDeniedMessage:
      "Нам нужно разрешение камеры для сканирования QR-кодов. Пожалуйста, включите разрешение камеры в настройках устройства.",
    requestPermission: "Предоставить Разрешение",
    openSettings: "Открыть Настройки",
    cameraPermissionNote:
      "Если разрешение камеры не предоставлено автоматически, перейдите в Настройки > Приложения > SafeLoved > Разрешения на вашем телефоне и включите разрешение Камеры.",
    contactPersonLabel: "Контактное Лицо:",
    contactInfoLabel: "Контактная Информация:",
    externalQRCode: "Внешний QR-код",
    recordNotFoundTitle: "Запись Не Найдена",
    recordNotFoundMessage:
      "Этот QR-код SafeLoved действителен, но запись не найдена в системе.",
    invalidQRCode: "Недействительный QR-код",
    invalidQRMessage:
      "Формат QR-кода SafeLoved недействителен. Информация о коде отсутствует или неверна.",
    serverMaintenance: "Сервер на Обслуживании",
    serverMaintenanceMessage:
      "Система в настоящее время находится на обслуживании. Пожалуйста, попробуйте позже. Спасибо за понимание.",
    connectionError: "Ошибка Подключения",
    connectionErrorMessage:
      "Не удалось подключиться к серверу. Проверьте подключение к Интернету и повторите попытку.",
    tryAgainLater: "Пожалуйста, попробуйте позже",
    offlineMode: "Вы Работаете в Автономном Режиме",
    offlineModeMessage: "Нет подключения к Интернету",
    offlineModeDescription:
      "Приложение работает в автономном режиме. Некоторые функции могут быть ограничены. Пожалуйста, проверьте подключение к Интернету.",
    privacyPolicy: "Политика Конфиденциальности",
    exportMenu: "Экспорт",
    exportAsPDF: "Экспортировать в PDF",
    generateShareLink: "Создать Ссылку для Обмена",
    exportingPDF: "Экспорт PDF...",
    generatingLink: "Создание ссылки...",
    pdfExportSuccess: "PDF успешно загружен!",
    pdfExportError: "Произошла ошибка при экспорте PDF",
    shareLinkSuccess: "Ссылка для обмена создана и скопирована!",
    shareLinkError: "Произошла ошибка при создании ссылки для обмена",
    shareLinkCopied: "Ссылка для обмена скопирована!",
    copyShareLink: "Копировать Ссылку",

    // Share Record
    shareRecord: "Поделиться Записью",
    shareLink: "Создать Ссылку для Обмена",
    shareHint: "Информацию о записи можно поделиться по этой ссылке",

    // Stats
    statsTitle: "Статистика",
    totalRecords: "Всего Записей",
    totalViews: "Всего Просмотров",

    placeholders: {
      fullName: "напр., Иван Иванов",
      age: "напр., 25",
      relationship: "напр., мать, брат, друг",
      description: "Дополнительная информация...",
      contactPerson: "напр., Петр Петров",
      contactInfo: "напр., +7 900 000 00 00 или email@example.com",
      name: "напр., Пушок",
      species: "напр., собака, кошка и т.д.",
      color: "напр., Коричневый",
      notes: "Дополнительная информация...",
      itemName: "напр., Ноутбук",
      brand: "напр., Apple",
      serialNumber: "напр., ABC123456",
      licensePlate: "напр., А123БВ",
      model: "напр., 2020",
      inquiryCode: "XXXX XXXX",
    },
    toasts: {
      enterCode: "Пожалуйста, введите код",
      invalidCodeFormat: "Код должен состоять из 8 символов (формат XXXX XXXX)",
      qrCodeScanned: "QR-код SafeLoved успешно отсканирован!",
      recordLoaded: "Информация о записи загружена!",
      qrCodeDownloaded: "QR-код загружен!",
      qrCodeGenerationError: "Не удалось сгенерировать QR-код",
      cameraStartError: "Не удалось запустить камеру",
    },
  },
  pt: {
    loading: "Carregando...",
    error: "Erro",
    success: "Sucesso",
    cancel: "Cancelar",
    confirm: "Confirmar",
    close: "Fechar",
    save: "Salvar",
    delete: "Excluir",
    edit: "Editar",
    back: "Voltar",
    continue: "Continuar",
    ok: "OK",
    darkMode: "Modo Escuro",
    lightMode: "Modo Claro",
    darkModeToggle: "Alternar Modo",
    themeSelector: "Selecionar Tema",
    themePurple: "Roxo",
    themeGreen: "Verde",
    themeOrange: "Laranja",
    themeRed: "Vermelho",
    themeBlue: "Azul",
    updateAvailable: "✨ Nova versão disponível! Atualize para renovar.",
    refreshApp: "Atualizar",
    dismissUpdate: "Fechar",
    scanHistory: "Histórico de Scans",
    noScanHistory: "Nenhum histórico de scan",
    clearHistory: "Limpar Histórico",
    voiceSearch: "Pesquisa por Voz",
    listening: "Ouvindo...",
    voiceNotSupported: "Pesquisa por voz não suportada neste navegador",
    locationLabel: "Localização",
    viewOnMap: "Ver no Mapa",
    photoLabel: "Foto",
    addPhoto: "Adicionar Foto",
    removePhoto: "Remover Foto",
    editRecord: "Editar Registro",
    versionHistory: "Histórico de Versões",
    noVersionHistory: "Sem histórico de versões",
    version: "Versão",
    deleteRecord: "Excluir Registro",
    confirmDelete:
      "Tem certeza de que deseja excluir este registro? Esta ação não pode ser desfeita.",
    deleteSuccess: "Registro excluído com sucesso",
    getMyLocation: "Obter Minha Localização",
    locationDetecting: "Detectando localização...",
    locationError: "Não foi possível obter a localização",
    scanCount: "Visualizações",
    lastScanned: "Último Scan",
    neverScanned: "Nunca escaneado",
    exportPDF: "Baixar PDF",
    printing: "Imprimindo...",
    syncHint:
      "📱 Entre Dispositivos: Insira seu código de usuário em outros dispositivos para acessar os mesmos registros.",
    notificationPrompt:
      "🔔 Permita notificações. Receba lembretes para seus registros.",
    allowNotifications: "Permitir",
    dismissNotification: "Fechar",
    backendOnline: "Servidor online",
    backendOffline: "Conexão falhou, tentando reconectar",
    backendChecking: "Verificando servidor...",
    retryingIn: "em",
    retryNow: "Tentar Agora",
    filterAll: "Todos",
    filterPerson: "Pessoa",
    filterAnimal: "Animal",
    filterItem: "Item",
    filterVehicle: "Veículo",
    searchRecords: "Pesquisar registros...",
    welcomeTitle: "Bem-vindo ao SafeLoved",
    welcomeSubtitle:
      "Um pequeno código para seus entes queridos, uma grande confiança",
    userEntry: "Entrada de Usuário",
    userEntryDescription:
      "Crie uma nova conta ou faça login em sua conta existente",
    newUserRegistration: "Criar Novo Registro de Usuário",
    existingUserLogin: "Login de Usuário Existente",
    inquiryEntry: "Entrada de Consulta",
    inquiryEntryDescription: "Pesquisar usando código QR ou código de registro",
    qrCodeInquiry: "Consulta de Código QR",
    codeInquiry: "Pesquisar por Código de Registro",
    newUserRegistrationTitle: "Novo Registro de Usuário",
    enterUsername: "Digite seu nome de usuário",
    username: "Nome de Usuário",
    enterYourName: "Digite seu nome",
    generateCode: "Gerar Código",
    generating: "Gerando...",
    yourUserCode: "Seu Código de Usuário",
    codeCopied: "Código copiado para a área de transferência!",
    copyCode: "Copiar",
    copied: "Copiado!",
    saveCodeMessage:
      "Guarde este código em um lugar seguro. Você precisará dele para fazer login em sua conta.",
    userLoginTitle: "Login de Usuário",
    enterExistingCode: "Digite seu código de usuário existente",
    userCode: "Código de Usuário",
    login: "Entrar",
    loginSuccess: "Login bem-sucedido!",
    codeFormatMessage: "Seu código deve ter 8 caracteres no formato XXXX XXXX",
    welcomeMessage: "Bem-vindo!",
    accountCreatedSuccess: "Sua conta de usuário foi criada com sucesso",
    importantInfo: "Informações Importantes:",
    saveCodeSecurely: "Guarde este código em um lugar seguro",
    needCodeForLogin:
      "Você precisará deste código para fazer login em sua conta",
    dontShareCode: "Não compartilhe seu código com ninguém",
    userScreen: "Tela de Usuário",
    userScreenDescription:
      "Crie novos registros ou visualize seus registros existentes",
    newRecord: "Novo Registro",
    myRecords: "Meus Registros",
    userProfile: "Perfil de Usuário",
    logout: "Sair",
    backToHome: "Voltar para Início",
    person: "Pessoa",
    animal: "Animal",
    item: "Item",
    vehicle: "Veículo",
    selectCategory: "Selecionar Categoria de Registro",
    selectCategoryDescription: "Escolha o tipo de registro que deseja criar",
    changeCategory: "Mudar Categoria",
    personRecord: "Registro de Pessoa",
    fullName: "Nome Completo",
    age: "Idade",
    relationship: "Relacionamento",
    description: "Descrição",
    contactPerson: "Pessoa de Contato",
    contactInfo: "Informações de Contato",
    additionalInfo: "Informações adicionais...",
    animalRecord: "Registro de Animal",
    name: "Nome",
    species: "Espécie",
    color: "Cor",
    notes: "Notas",
    itemRecord: "Registro de Item",
    itemName: "Nome do Item",
    brand: "Marca",
    serialNumber: "Número de Série",
    vehicleRecord: "Registro de Veículo",
    licensePlate: "Placa",
    model: "Modelo",
    required: "*",
    fillAllFields: "Por favor, preencha todos os campos obrigatórios",
    enterValidAge: "Por favor, insira uma idade válida",
    recordCreatedSuccess: "Registro criado com sucesso!",
    recordCreationError: "Ocorreu um erro ao criar o registro",
    createQRCode: "Criar Código QR e Código de Consulta",
    creating: "Criando...",
    recordCreatedSuccessTitle: "Registro Criado com Sucesso!",
    inquiryCode: "Código de Consulta:",
    downloadQR: "Baixar QR",
    saveCodeAndQR: "Guarde este código e código QR em um lugar seguro.",
    qrCodeInfo:
      "Quando escaneado dentro do aplicativo SafeLoved, o código QR exibirá automaticamente seu registro. Quando escaneado fora do aplicativo, as instruções de download serão exibidas.",
    createNewRecord: "Criar Novo Registro",
    allRecords: "Todos os Seus Registros",
    noRecordsYet: "Você ainda não criou nenhum registro",
    createFirstRecord: "Crie seu primeiro registro na aba Novo Registro",
    recordsLoadError: "Ocorreu um erro ao carregar os registros",
    recordInquiry: "Consulta de Registro",
    searchByCode: "Pesquisar por Código",
    scanQRCode: "Escanear Código QR",
    inquiryCodeLabel: "Código de Consulta",
    search: "Pesquisar",
    searching: "Pesquisando...",
    recordNotFound: "Registro não encontrado",
    code: "Código:",
    startScanning: "Iniciar Escaneamento",
    stopScanning: "Parar Escaneamento",
    cameraNotSupported: "Câmera não suportada",
    cameraNotSupportedMessage:
      "Nenhuma câmera encontrada ou não suportada em seu dispositivo.",
    cameraClosed: "Câmera fechada",
    processingQR: "Processando código QR...",
    howToUse: "Como Usar?",
    qrInstructions: [
      "Segure o código QR na frente da câmera",
      "Os códigos QR SafeLoved são detectados automaticamente",
      "As informações do registro são exibidas instantaneamente",
      "Uma mensagem de informação é exibida para códigos QR externos",
    ],
    cameraPermissionRequired: "Permissão de Câmera Necessária",
    cameraPermissionMessage:
      "Precisamos de acesso à câmera para escanear códigos QR. Por favor, conceda permissão de câmera.",
    cameraPermissionDenied: "Permissão de Câmera Negada",
    cameraPermissionDeniedMessage:
      "Precisamos de permissão de câmera para escanear códigos QR. Por favor, habilite a permissão de câmera nas configurações do dispositivo.",
    requestPermission: "Conceder Permissão",
    openSettings: "Abrir Configurações",
    cameraPermissionNote:
      "Se a permissão da câmera não for concedida automaticamente, vá para Configurações > Aplicativos > SafeLoved > Permissões do seu telefone e habilite a permissão de Câmera.",
    contactPersonLabel: "Pessoa de Contato:",
    contactInfoLabel: "Informações de Contato:",
    externalQRCode: "Código QR Externo",
    recordNotFoundTitle: "Registro Não Encontrado",
    recordNotFoundMessage:
      "Este código QR SafeLoved é válido, mas nenhum registro foi encontrado no sistema.",
    invalidQRCode: "Código QR Inválido",
    invalidQRMessage:
      "O formato do código QR SafeLoved é inválido. As informações do código estão faltando ou incorretas.",
    serverMaintenance: "Servidor em Manutenção",
    serverMaintenanceMessage:
      "O sistema está atualmente em manutenção. Por favor, tente novamente mais tarde. Obrigado pela compreensão.",
    connectionError: "Erro de Conexão",
    connectionErrorMessage:
      "Não foi possível conectar ao servidor. Verifique sua conexão com a Internet e tente novamente.",
    tryAgainLater: "Por favor, tente novamente mais tarde",
    offlineMode: "Você Está Trabalhando no Modo Offline",
    offlineModeMessage: "Sem conexão com a Internet",
    offlineModeDescription:
      "O aplicativo está sendo executado no modo offline. Alguns recursos podem estar limitados. Verifique sua conexão com a Internet.",
    privacyPolicy: "Política de Privacidade",
    exportMenu: "Exportar",
    exportAsPDF: "Exportar como PDF",
    generateShareLink: "Gerar Link de Compartilhamento",
    exportingPDF: "Exportando PDF...",
    generatingLink: "Gerando link...",
    pdfExportSuccess: "PDF baixado com sucesso!",
    pdfExportError: "Ocorreu um erro ao exportar o PDF",
    shareLinkSuccess: "Link de compartilhamento criado e copiado!",
    shareLinkError: "Ocorreu um erro ao gerar o link de compartilhamento",
    shareLinkCopied: "Link de compartilhamento copiado!",
    copyShareLink: "Copiar Link",

    // Share Record
    shareRecord: "Compartilhar Registro",
    shareLink: "Gerar Link de Compartilhamento",
    shareHint:
      "As informações do registro podem ser compartilhadas com este link",

    // Stats
    statsTitle: "Estatísticas",
    totalRecords: "Total de Registros",
    totalViews: "Total de Visualizações",

    placeholders: {
      fullName: "ex., João Silva",
      age: "ex., 25",
      relationship: "ex., mãe, irmão, amigo",
      description: "Informações adicionais...",
      contactPerson: "ex., Maria Santos",
      contactInfo: "ex., +55 11 98765-4321 ou email@example.com",
      name: "ex., Fofinho",
      species: "ex., cachorro, gato, etc.",
      color: "ex., Marrom",
      notes: "Informações adicionais...",
      itemName: "ex., Notebook",
      brand: "ex., Apple",
      serialNumber: "ex., ABC123456",
      licensePlate: "ex., ABC-1234",
      model: "ex., 2020",
      inquiryCode: "XXXX XXXX",
    },
    toasts: {
      enterCode: "Por favor, insira um código",
      invalidCodeFormat: "O código deve ter 8 caracteres (formato XXXX XXXX)",
      qrCodeScanned: "Código QR SafeLoved escaneado com sucesso!",
      recordLoaded: "Informações do registro carregadas!",
      qrCodeDownloaded: "Código QR baixado!",
      qrCodeGenerationError: "Não foi possível gerar o código QR",
      cameraStartError: "Não foi possível iniciar a câmera",
    },
  },
};

export function getTranslations(language: Language): Translations {
  return translations[language] || translations.tr;
}
