/**
 * Internationalization (i18n) system for SafeLoved
 * Supports 9 languages with automatic device language detection
 */

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

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
  direction: "ltr" | "rtl";
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: "tr", name: "Turkish", nativeName: "Türkçe", direction: "ltr" },
  { code: "en", name: "English", nativeName: "English", direction: "ltr" },
  { code: "zh", name: "Chinese", nativeName: "中文", direction: "ltr" },
  { code: "es", name: "Spanish", nativeName: "Español", direction: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", direction: "rtl" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", direction: "ltr" },
  { code: "fr", name: "French", nativeName: "Français", direction: "ltr" },
  { code: "ru", name: "Russian", nativeName: "Русский", direction: "ltr" },
  { code: "pt", name: "Portuguese", nativeName: "Português", direction: "ltr" },
];

const STORAGE_KEY = "safeloved_language";
const DEFAULT_LANGUAGE: Language = "tr";

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  tr: {
    // Main Screen
    "app.title": "SafeLoved'a Hoş Geldiniz",
    "app.subtitle": "Güvenli ve kolay kullanıcı yönetimi için modern çözümünüz",
    "user.entry": "Kullanıcı Girişi",
    "user.entry.desc":
      "Yeni bir hesap oluşturun veya mevcut hesabınıza giriş yapın",
    "user.new.register": "Yeni Kullanıcı Kaydı Oluştur",
    "user.existing.login": "Mevcut Kullanıcı Girişi",
    "inquiry.entry": "Sorgulama Girişi",
    "inquiry.entry.desc": "QR kod veya kayıt kodu ile sorgulama yapın",
    "inquiry.qr": "QR Kod Sorgulama",
    "inquiry.code": "Kayıt Kodu ile Sorgulama",

    // User Registration
    "register.title": "Yeni Kullanıcı Kaydı",
    "register.username.prompt": "Kullanıcı adınızı girin",
    "register.code.prompt": "Size özel benzersiz bir kod oluşturun",
    username: "Kullanıcı Adı",
    "username.placeholder": "Adınızı girin",
    continue: "Devam Et",
    "generate.code": "Kod Oluştur",
    generating: "Oluşturuluyor...",
    "your.code": "Kullanıcı Kodunuz:",
    copy: "Kopyala",
    copied: "Kopyalandı!",
    "code.save.note":
      "Bu kodu güvenli bir yerde saklayın. Hesabınıza giriş yapmak için ihtiyacınız olacak.",

    // User Login
    "login.title": "Kullanıcı Girişi",
    "login.prompt": "Mevcut kullanıcı kodunuzu girin",
    "user.code": "Kullanıcı Kodu",
    "code.placeholder": "XXXX XXXX",
    login: "Giriş Yap",
    "code.format.note":
      "Kodunuz XXXX XXXX formatında 8 karakterden oluşmalıdır",

    // User Screen
    "back.to.main": "Ana Sayfaya Dön",
    "user.profile": "Kullanıcı Profili",
    logout: "Çıkış",
    "user.screen.title": "Kullanıcı Ekranı",
    "user.screen.desc":
      "Yeni kayıt oluşturun veya mevcut kayıtlarınızı görüntüleyin",
    "new.record": "Yeni Kayıt",
    "my.records": "Kayıtlarım",

    // Categories
    "category.insan": "İnsan",
    "category.hayvan": "Hayvan",
    "category.esya": "Eşya",
    "category.arac": "Araç",

    // Forms - Common
    "contact.person": "İletişime Geçilecek Kişi",
    "contact.info": "İletişim Bilgisi",
    "contact.person.placeholder": "Örn: Mehmet Yılmaz",
    "contact.info.placeholder": "Örn: 0555 123 45 67 veya email@example.com",
    "generate.qr.code": "QR Kod ve Sorgulama Kodu Oluştur",
    "required.fields": "Lütfen tüm zorunlu alanları doldurun",

    // Forms - Insan
    "insan.name": "Ad Soyad",
    "insan.name.placeholder": "Örn: Ahmet Yılmaz",
    "insan.age": "Yaş",
    "insan.age.placeholder": "Örn: 25",
    "insan.relationship": "İlişki",
    "insan.relationship.placeholder": "Örn: anne, kardeş, arkadaş",
    "insan.description": "Açıklama",
    "insan.description.placeholder": "Ek bilgiler...",

    // Forms - Hayvan
    "hayvan.name": "Ad",
    "hayvan.name.placeholder": "Örn: Minnoş",
    "hayvan.species": "Tür",
    "hayvan.species.placeholder": "Örn: köpek, kedi vb.",
    "hayvan.color": "Renk",
    "hayvan.color.placeholder": "Örn: kahverengi",
    "hayvan.notes": "Not",
    "hayvan.notes.placeholder": "Ek bilgiler...",

    // Forms - Esya
    "esya.name": "Eşya Adı",
    "esya.name.placeholder": "Örn: Laptop",
    "esya.brand": "Marka",
    "esya.brand.placeholder": "Örn: Apple",
    "esya.serial": "Seri No",
    "esya.serial.placeholder": "Örn: ABC123456",
    "esya.description": "Açıklama",
    "esya.description.placeholder": "Ek bilgiler...",

    // Forms - Arac
    "arac.plate": "Plaka",
    "arac.plate.placeholder": "Örn: 34 ABC 123",
    "arac.brand": "Marka",
    "arac.brand.placeholder": "Örn: Toyota",
    "arac.model": "Model",
    "arac.model.placeholder": "Örn: Corolla",
    "arac.color": "Renk",
    "arac.color.placeholder": "Örn: beyaz",

    // Inquiry Screen
    "inquiry.title": "Kayıt Sorgulama",
    "back.to.home": "Ana Sayfa",
    "search.by.code": "Kod ile Sorgula",
    "scan.qr": "QR Kod Tara",
    "search.code": "Sorgulama Kodu",
    search: "Sorgula",
    searching: "Sorgulanıyor...",
    "start.scanning": "Taramayı Başlat",
    "stop.scanning": "Taramayı Durdur",
    "camera.off": "Kamera kapalı",
    "processing.qr": "QR kod işleniyor...",
    "camera.not.supported": "Kamera desteklenmiyor",
    "camera.not.found": "Cihazınızda kamera bulunamadı veya desteklenmiyor.",
    "how.to.use": "Nasıl Kullanılır?",
    "qr.instruction.1": "QR kodu kamera önüne tutun",
    "qr.instruction.2": "SafeLoved QR kodları otomatik olarak algılanır",
    "qr.instruction.3": "Kayıt bilgileri anında gösterilir",
    "qr.instruction.4":
      "Harici QR kodlar için bilgilendirme mesajı görüntülenir",

    // Record Display
    "record.not.found": "Kayıt bulunamadı",
    "record.not.found.desc":
      "Bu SafeLoved QR kodu geçerli ancak sistemde kayıtlı bir kayıt bulunamadı.",
    "external.qr": "Harici QR Kod",
    "invalid.qr": "Geçersiz QR Kod",
    "unreadable.qr": "QR kod okunamadı. Lütfen tekrar deneyin.",
    "invalid.qr.format":
      "SafeLoved QR kodu formatı geçersiz. Kod bilgisi eksik veya hatalı.",
    "code.label": "Kod:",
    age: "Yaş:",
    relationship: "İlişki:",
    description: "Açıklama:",
    species: "Tür:",
    color: "Renk:",
    notes: "Not:",
    brand: "Marka:",
    "serial.no": "Seri No:",
    model: "Model:",

    // QR Code Display
    "qr.code.title": "QR Kod ve Sorgulama Kodu",
    "qr.code.desc":
      "Kayıt başarıyla oluşturuldu! QR kodunuzu ve sorgulama kodunuzu aşağıda bulabilirsiniz.",
    "query.code": "Sorgulama Kodu:",
    "copy.code": "Kodu Kopyala",
    "download.qr": "QR Kodu İndir",
    "create.new": "Yeni Kayıt Oluştur",
    "qr.info.title": "QR Kod Nasıl Kullanılır?",
    "qr.info.1": "QR kodu yazdırın veya dijital olarak saklayın",
    "qr.info.2": "Kodu eşyanıza, aracınıza veya evcil hayvanınıza ekleyin",
    "qr.info.3": "Bulan kişi SafeLoved uygulaması ile QR kodu taratabilir",
    "qr.info.4": "İletişim bilgileriniz otomatik olarak gösterilir",

    // My Records
    "no.records": "Henüz kayıt oluşturmadınız",
    "no.records.desc":
      "Yeni Kayıt sekmesinden ilk kaydınızı oluşturabilirsiniz.",
    "loading.records": "Kayıtlar yükleniyor...",
    "error.loading.records": "Kayıtlar yüklenirken bir hata oluştu",

    // Messages
    loading: "Yükleniyor...",
    ok: "Tamam",
    error: "Hata",
    success: "Başarılı",
    "error.occurred": "Bir hata oluştu",
    "code.copied": "Kod panoya kopyalandı!",
    "qr.downloaded": "QR kod indirildi!",
    "record.created": "Kayıt başarıyla oluşturuldu!",
    "user.code.created": "Kullanıcı kodu başarıyla oluşturuldu!",
    "login.success": "Giriş başarılı!",
    "safeloved.qr.scanned": "SafeLoved QR kodu başarıyla okundu!",
    "record.loaded": "Kayıt bilgileri yüklendi!",
    "enter.username": "Lütfen bir kullanıcı adı girin",
    "enter.code": "Lütfen bir kod girin",
    "code.must.be.8": "Kod 8 karakter olmalıdır (XXXX XXXX formatında)",
    "enter.valid.age": "Lütfen geçerli bir yaş girin",
    "code.generation.error":
      "Kod oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.",
    "record.creation.error": "Kayıt oluşturulurken bir hata oluştu",
    "camera.start.error": "Kamera başlatılamadı",
    "qr.generation.error": "QR kod oluşturulamadı",
    "camera.permission.note":
      "Lütfen tarayıcı ayarlarından kamera iznini kontrol edin.",

    // QR Fallback Text
    "qr.fallback.text":
      "İletişim için Google Play Store'den SafeLoved Uygulamasını İndirin ve QR Kodu Sorgulama Ekranına Okutun",
  },

  en: {
    // Main Screen
    "app.title": "Welcome to SafeLoved",
    "app.subtitle": "Your modern solution for secure and easy user management",
    "user.entry": "User Entry",
    "user.entry.desc":
      "Create a new account or log in to your existing account",
    "user.new.register": "Create New User Registration",
    "user.existing.login": "Existing User Login",
    "inquiry.entry": "Inquiry Entry",
    "inquiry.entry.desc": "Search by QR code or registration code",
    "inquiry.qr": "QR Code Inquiry",
    "inquiry.code": "Search by Registration Code",

    // User Registration
    "register.title": "New User Registration",
    "register.username.prompt": "Enter your username",
    "register.code.prompt": "Generate your unique code",
    username: "Username",
    "username.placeholder": "Enter your name",
    continue: "Continue",
    "generate.code": "Generate Code",
    generating: "Generating...",
    "your.code": "Your User Code:",
    copy: "Copy",
    copied: "Copied!",
    "code.save.note":
      "Save this code in a safe place. You will need it to log in to your account.",

    // User Login
    "login.title": "User Login",
    "login.prompt": "Enter your existing user code",
    "user.code": "User Code",
    "code.placeholder": "XXXX XXXX",
    login: "Log In",
    "code.format.note": "Your code must be 8 characters in XXXX XXXX format",

    // User Screen
    "back.to.main": "Back to Main Page",
    "user.profile": "User Profile",
    logout: "Logout",
    "user.screen.title": "User Dashboard",
    "user.screen.desc": "Create new records or view your existing records",
    "new.record": "New Record",
    "my.records": "My Records",

    // Categories
    "category.insan": "Person",
    "category.hayvan": "Animal",
    "category.esya": "Item",
    "category.arac": "Vehicle",

    // Forms - Common
    "contact.person": "Contact Person",
    "contact.info": "Contact Information",
    "contact.person.placeholder": "e.g., John Smith",
    "contact.info.placeholder": "e.g., +1 555 123 4567 or email@example.com",
    "generate.qr.code": "Generate QR Code and Query Code",
    "required.fields": "Please fill in all required fields",

    // Forms - Insan
    "insan.name": "Full Name",
    "insan.name.placeholder": "e.g., John Smith",
    "insan.age": "Age",
    "insan.age.placeholder": "e.g., 25",
    "insan.relationship": "Relationship",
    "insan.relationship.placeholder": "e.g., mother, sibling, friend",
    "insan.description": "Description",
    "insan.description.placeholder": "Additional information...",

    // Forms - Hayvan
    "hayvan.name": "Name",
    "hayvan.name.placeholder": "e.g., Fluffy",
    "hayvan.species": "Species",
    "hayvan.species.placeholder": "e.g., dog, cat, etc.",
    "hayvan.color": "Color",
    "hayvan.color.placeholder": "e.g., brown",
    "hayvan.notes": "Notes",
    "hayvan.notes.placeholder": "Additional information...",

    // Forms - Esya
    "esya.name": "Item Name",
    "esya.name.placeholder": "e.g., Laptop",
    "esya.brand": "Brand",
    "esya.brand.placeholder": "e.g., Apple",
    "esya.serial": "Serial No",
    "esya.serial.placeholder": "e.g., ABC123456",
    "esya.description": "Description",
    "esya.description.placeholder": "Additional information...",

    // Forms - Arac
    "arac.plate": "License Plate",
    "arac.plate.placeholder": "e.g., ABC 1234",
    "arac.brand": "Brand",
    "arac.brand.placeholder": "e.g., Toyota",
    "arac.model": "Model",
    "arac.model.placeholder": "e.g., Corolla",
    "arac.color": "Color",
    "arac.color.placeholder": "e.g., white",

    // Inquiry Screen
    "inquiry.title": "Record Inquiry",
    "back.to.home": "Home",
    "search.by.code": "Search by Code",
    "scan.qr": "Scan QR Code",
    "search.code": "Search Code",
    search: "Search",
    searching: "Searching...",
    "start.scanning": "Start Scanning",
    "stop.scanning": "Stop Scanning",
    "camera.off": "Camera off",
    "processing.qr": "Processing QR code...",
    "camera.not.supported": "Camera not supported",
    "camera.not.found": "No camera found or not supported on your device.",
    "how.to.use": "How to Use?",
    "qr.instruction.1": "Hold the QR code in front of the camera",
    "qr.instruction.2": "SafeLoved QR codes are automatically detected",
    "qr.instruction.3": "Record information is displayed instantly",
    "qr.instruction.4":
      "Information message is displayed for external QR codes",

    // Record Display
    "record.not.found": "Record Not Found",
    "record.not.found.desc":
      "This SafeLoved QR code is valid but no record was found in the system.",
    "external.qr": "External QR Code",
    "invalid.qr": "Invalid QR Code",
    "unreadable.qr": "QR code could not be read. Please try again.",
    "invalid.qr.format":
      "SafeLoved QR code format is invalid. Code information is missing or incorrect.",
    "code.label": "Code:",
    age: "Age:",
    relationship: "Relationship:",
    description: "Description:",
    species: "Species:",
    color: "Color:",
    notes: "Notes:",
    brand: "Brand:",
    "serial.no": "Serial No:",
    model: "Model:",

    // QR Code Display
    "qr.code.title": "QR Code and Query Code",
    "qr.code.desc":
      "Record created successfully! You can find your QR code and query code below.",
    "query.code": "Query Code:",
    "copy.code": "Copy Code",
    "download.qr": "Download QR Code",
    "create.new": "Create New Record",
    "qr.info.title": "How to Use QR Code?",
    "qr.info.1": "Print or save the QR code digitally",
    "qr.info.2": "Attach the code to your item, vehicle, or pet",
    "qr.info.3": "Finder can scan the QR code with SafeLoved app",
    "qr.info.4": "Your contact information will be displayed automatically",

    // My Records
    "no.records": "You haven't created any records yet",
    "no.records.desc":
      "You can create your first record from the New Record tab.",
    "loading.records": "Loading records...",
    "error.loading.records": "An error occurred while loading records",

    // Messages
    loading: "Loading...",
    ok: "OK",
    error: "Error",
    success: "Success",
    "error.occurred": "An error occurred",
    "code.copied": "Code copied to clipboard!",
    "qr.downloaded": "QR code downloaded!",
    "record.created": "Record created successfully!",
    "user.code.created": "User code created successfully!",
    "login.success": "Login successful!",
    "safeloved.qr.scanned": "SafeLoved QR code scanned successfully!",
    "record.loaded": "Record information loaded!",
    "enter.username": "Please enter a username",
    "enter.code": "Please enter a code",
    "code.must.be.8": "Code must be 8 characters (XXXX XXXX format)",
    "enter.valid.age": "Please enter a valid age",
    "code.generation.error":
      "An error occurred while generating the code. Please try again.",
    "record.creation.error": "An error occurred while creating the record",
    "camera.start.error": "Could not start camera",
    "qr.generation.error": "Could not generate QR code",
    "camera.permission.note":
      "Please check camera permission in browser settings.",

    // QR Fallback Text
    "qr.fallback.text":
      "Download SafeLoved App from Google Play Store and scan QR code in the inquiry screen for contact",
  },

  zh: {
    // Main Screen
    "app.title": "欢迎使用 SafeLoved",
    "app.subtitle": "安全便捷的用户管理现代解决方案",
    "user.entry": "用户入口",
    "user.entry.desc": "创建新账户或登录现有账户",
    "user.new.register": "创建新用户注册",
    "user.existing.login": "现有用户登录",
    "inquiry.entry": "查询入口",
    "inquiry.entry.desc": "通过二维码或注册码查询",
    "inquiry.qr": "二维码查询",
    "inquiry.code": "通过注册码查询",

    // User Registration
    "register.title": "新用户注册",
    "register.username.prompt": "输入您的用户名",
    "register.code.prompt": "生成您的唯一代码",
    username: "用户名",
    "username.placeholder": "输入您的姓名",
    continue: "继续",
    "generate.code": "生成代码",
    generating: "生成中...",
    "your.code": "您的用户代码：",
    copy: "复制",
    copied: "已复制！",
    "code.save.note": "请将此代码保存在安全的地方。您需要它来登录您的账户。",

    // User Login
    "login.title": "用户登录",
    "login.prompt": "输入您现有的用户代码",
    "user.code": "用户代码",
    "code.placeholder": "XXXX XXXX",
    login: "登录",
    "code.format.note": "您的代码必须是 XXXX XXXX 格式的 8 个字符",

    // User Screen
    "back.to.main": "返回主页",
    "user.profile": "用户资料",
    logout: "登出",
    "user.screen.title": "用户仪表板",
    "user.screen.desc": "创建新记录或查看现有记录",
    "new.record": "新记录",
    "my.records": "我的记录",

    // Categories
    "category.insan": "人",
    "category.hayvan": "动物",
    "category.esya": "物品",
    "category.arac": "车辆",

    // Forms - Common
    "contact.person": "联系人",
    "contact.info": "联系信息",
    "contact.person.placeholder": "例如：张三",
    "contact.info.placeholder": "例如：+86 138 0000 0000 或 email@example.com",
    "generate.qr.code": "生成二维码和查询码",
    "required.fields": "请填写所有必填字段",

    // Forms - Insan
    "insan.name": "全名",
    "insan.name.placeholder": "例如：张三",
    "insan.age": "年龄",
    "insan.age.placeholder": "例如：25",
    "insan.relationship": "关系",
    "insan.relationship.placeholder": "例如：母亲、兄弟姐妹、朋友",
    "insan.description": "描述",
    "insan.description.placeholder": "附加信息...",

    // Forms - Hayvan
    "hayvan.name": "名字",
    "hayvan.name.placeholder": "例如：小白",
    "hayvan.species": "物种",
    "hayvan.species.placeholder": "例如：狗、猫等",
    "hayvan.color": "颜色",
    "hayvan.color.placeholder": "例如：棕色",
    "hayvan.notes": "备注",
    "hayvan.notes.placeholder": "附加信息...",

    // Forms - Esya
    "esya.name": "物品名称",
    "esya.name.placeholder": "例如：笔记本电脑",
    "esya.brand": "品牌",
    "esya.brand.placeholder": "例如：苹果",
    "esya.serial": "序列号",
    "esya.serial.placeholder": "例如：ABC123456",
    "esya.description": "描述",
    "esya.description.placeholder": "附加信息...",

    // Forms - Arac
    "arac.plate": "车牌号",
    "arac.plate.placeholder": "例如：京A 12345",
    "arac.brand": "品牌",
    "arac.brand.placeholder": "例如：丰田",
    "arac.model": "型号",
    "arac.model.placeholder": "例如：卡罗拉",
    "arac.color": "颜色",
    "arac.color.placeholder": "例如：白色",

    // Inquiry Screen
    "inquiry.title": "记录查询",
    "back.to.home": "主页",
    "search.by.code": "按代码搜索",
    "scan.qr": "扫描二维码",
    "search.code": "搜索代码",
    search: "搜索",
    searching: "搜索中...",
    "start.scanning": "开始扫描",
    "stop.scanning": "停止扫描",
    "camera.off": "相机关闭",
    "processing.qr": "处理二维码中...",
    "camera.not.supported": "不支持相机",
    "camera.not.found": "未找到相机或您的设备不支持。",
    "how.to.use": "如何使用？",
    "qr.instruction.1": "将二维码放在相机前",
    "qr.instruction.2": "SafeLoved 二维码会自动检测",
    "qr.instruction.3": "记录信息立即显示",
    "qr.instruction.4": "外部二维码显示信息消息",

    // Record Display
    "record.not.found": "未找到记录",
    "record.not.found.desc": "此 SafeLoved 二维码有效，但系统中未找到记录。",
    "external.qr": "外部二维码",
    "invalid.qr": "无效的二维码",
    "unreadable.qr": "无法读取二维码。请重试。",
    "invalid.qr.format": "SafeLoved 二维码格式无效。代码信息缺失或不正确。",
    "code.label": "代码：",
    age: "年龄：",
    relationship: "关系：",
    description: "描述：",
    species: "物种：",
    color: "颜色：",
    notes: "备注：",
    brand: "品牌：",
    "serial.no": "序列号：",
    model: "型号：",

    // QR Code Display
    "qr.code.title": "二维码和查询码",
    "qr.code.desc": "记录创建成功！您可以在下面找到您的二维码和查询码。",
    "query.code": "查询码：",
    "copy.code": "复制代码",
    "download.qr": "下载二维码",
    "create.new": "创建新记录",
    "qr.info.title": "如何使用二维码？",
    "qr.info.1": "打印或数字保存二维码",
    "qr.info.2": "将代码附加到您的物品、车辆或宠物上",
    "qr.info.3": "发现者可以使用 SafeLoved 应用扫描二维码",
    "qr.info.4": "您的联系信息将自动显示",

    // My Records
    "no.records": "您还没有创建任何记录",
    "no.records.desc": '您可以从"新记录"选项卡创建您的第一条记录。',
    "loading.records": "加载记录中...",
    "error.loading.records": "加载记录时发生错误",

    // Messages
    loading: "加载中...",
    ok: "确定",
    error: "错误",
    success: "成功",
    "error.occurred": "发生错误",
    "code.copied": "代码已复制到剪贴板！",
    "qr.downloaded": "二维码已下载！",
    "record.created": "记录创建成功！",
    "user.code.created": "用户代码创建成功！",
    "login.success": "登录成功！",
    "safeloved.qr.scanned": "SafeLoved 二维码扫描成功！",
    "record.loaded": "记录信息已加载！",
    "enter.username": "请输入用户名",
    "enter.code": "请输入代码",
    "code.must.be.8": "代码必须是 8 个字符（XXXX XXXX 格式）",
    "enter.valid.age": "请输入有效年龄",
    "code.generation.error": "生成代码时发生错误。请重试。",
    "record.creation.error": "创建记录时发生错误",
    "camera.start.error": "无法启动相机",
    "qr.generation.error": "无法生成二维码",
    "camera.permission.note": "请在浏览器设置中检查相机权限。",

    // QR Fallback Text
    "qr.fallback.text":
      "从 Google Play 商店下载 SafeLoved 应用程序，并在查询屏幕中扫描二维码以获取联系方式",
  },

  es: {
    // Main Screen
    "app.title": "Bienvenido a SafeLoved",
    "app.subtitle":
      "Su solución moderna para una gestión de usuarios segura y fácil",
    "user.entry": "Entrada de Usuario",
    "user.entry.desc":
      "Cree una nueva cuenta o inicie sesión en su cuenta existente",
    "user.new.register": "Crear Nuevo Registro de Usuario",
    "user.existing.login": "Inicio de Sesión de Usuario Existente",
    "inquiry.entry": "Entrada de Consulta",
    "inquiry.entry.desc": "Buscar por código QR o código de registro",
    "inquiry.qr": "Consulta de Código QR",
    "inquiry.code": "Buscar por Código de Registro",

    // User Registration
    "register.title": "Nuevo Registro de Usuario",
    "register.username.prompt": "Ingrese su nombre de usuario",
    "register.code.prompt": "Genere su código único",
    username: "Nombre de Usuario",
    "username.placeholder": "Ingrese su nombre",
    continue: "Continuar",
    "generate.code": "Generar Código",
    generating: "Generando...",
    "your.code": "Su Código de Usuario:",
    copy: "Copiar",
    copied: "¡Copiado!",
    "code.save.note":
      "Guarde este código en un lugar seguro. Lo necesitará para iniciar sesión en su cuenta.",

    // User Login
    "login.title": "Inicio de Sesión de Usuario",
    "login.prompt": "Ingrese su código de usuario existente",
    "user.code": "Código de Usuario",
    "code.placeholder": "XXXX XXXX",
    login: "Iniciar Sesión",
    "code.format.note":
      "Su código debe tener 8 caracteres en formato XXXX XXXX",

    // User Screen
    "back.to.main": "Volver a la Página Principal",
    "user.profile": "Perfil de Usuario",
    logout: "Cerrar Sesión",
    "user.screen.title": "Panel de Usuario",
    "user.screen.desc": "Cree nuevos registros o vea sus registros existentes",
    "new.record": "Nuevo Registro",
    "my.records": "Mis Registros",

    // Categories
    "category.insan": "Persona",
    "category.hayvan": "Animal",
    "category.esya": "Artículo",
    "category.arac": "Vehículo",

    // Forms - Common
    "contact.person": "Persona de Contacto",
    "contact.info": "Información de Contacto",
    "contact.person.placeholder": "ej., Juan Pérez",
    "contact.info.placeholder": "ej., +34 555 123 456 o email@example.com",
    "generate.qr.code": "Generar Código QR y Código de Consulta",
    "required.fields": "Por favor complete todos los campos obligatorios",

    // Forms - Insan
    "insan.name": "Nombre Completo",
    "insan.name.placeholder": "ej., Juan Pérez",
    "insan.age": "Edad",
    "insan.age.placeholder": "ej., 25",
    "insan.relationship": "Relación",
    "insan.relationship.placeholder": "ej., madre, hermano, amigo",
    "insan.description": "Descripción",
    "insan.description.placeholder": "Información adicional...",

    // Forms - Hayvan
    "hayvan.name": "Nombre",
    "hayvan.name.placeholder": "ej., Pelusa",
    "hayvan.species": "Especie",
    "hayvan.species.placeholder": "ej., perro, gato, etc.",
    "hayvan.color": "Color",
    "hayvan.color.placeholder": "ej., marrón",
    "hayvan.notes": "Notas",
    "hayvan.notes.placeholder": "Información adicional...",

    // Forms - Esya
    "esya.name": "Nombre del Artículo",
    "esya.name.placeholder": "ej., Portátil",
    "esya.brand": "Marca",
    "esya.brand.placeholder": "ej., Apple",
    "esya.serial": "Número de Serie",
    "esya.serial.placeholder": "ej., ABC123456",
    "esya.description": "Descripción",
    "esya.description.placeholder": "Información adicional...",

    // Forms - Arac
    "arac.plate": "Matrícula",
    "arac.plate.placeholder": "ej., ABC 1234",
    "arac.brand": "Marca",
    "arac.brand.placeholder": "ej., Toyota",
    "arac.model": "Modelo",
    "arac.model.placeholder": "ej., Corolla",
    "arac.color": "Color",
    "arac.color.placeholder": "ej., blanco",

    // Inquiry Screen
    "inquiry.title": "Consulta de Registro",
    "back.to.home": "Inicio",
    "search.by.code": "Buscar por Código",
    "scan.qr": "Escanear Código QR",
    "search.code": "Código de Búsqueda",
    search: "Buscar",
    searching: "Buscando...",
    "start.scanning": "Iniciar Escaneo",
    "stop.scanning": "Detener Escaneo",
    "camera.off": "Cámara apagada",
    "processing.qr": "Procesando código QR...",
    "camera.not.supported": "Cámara no compatible",
    "camera.not.found":
      "No se encontró cámara o no es compatible con su dispositivo.",
    "how.to.use": "¿Cómo Usar?",
    "qr.instruction.1": "Sostenga el código QR frente a la cámara",
    "qr.instruction.2":
      "Los códigos QR de SafeLoved se detectan automáticamente",
    "qr.instruction.3":
      "La información del registro se muestra instantáneamente",
    "qr.instruction.4":
      "Se muestra un mensaje informativo para códigos QR externos",

    // Record Display
    "record.not.found": "Registro No Encontrado",
    "record.not.found.desc":
      "Este código QR de SafeLoved es válido pero no se encontró ningún registro en el sistema.",
    "external.qr": "Código QR Externo",
    "invalid.qr": "Código QR Inválido",
    "unreadable.qr":
      "No se pudo leer el código QR. Por favor, inténtelo de nuevo.",
    "invalid.qr.format":
      "El formato del código QR de SafeLoved no es válido. Falta información del código o es incorrecta.",
    "code.label": "Código:",
    age: "Edad:",
    relationship: "Relación:",
    description: "Descripción:",
    species: "Especie:",
    color: "Color:",
    notes: "Notas:",
    brand: "Marca:",
    "serial.no": "Número de Serie:",
    model: "Modelo:",

    // QR Code Display
    "qr.code.title": "Código QR y Código de Consulta",
    "qr.code.desc":
      "¡Registro creado con éxito! Puede encontrar su código QR y código de consulta a continuación.",
    "query.code": "Código de Consulta:",
    "copy.code": "Copiar Código",
    "download.qr": "Descargar Código QR",
    "create.new": "Crear Nuevo Registro",
    "qr.info.title": "¿Cómo Usar el Código QR?",
    "qr.info.1": "Imprima o guarde el código QR digitalmente",
    "qr.info.2": "Adjunte el código a su artículo, vehículo o mascota",
    "qr.info.3":
      "El buscador puede escanear el código QR con la aplicación SafeLoved",
    "qr.info.4": "Su información de contacto se mostrará automáticamente",

    // My Records
    "no.records": "Aún no ha creado ningún registro",
    "no.records.desc":
      "Puede crear su primer registro desde la pestaña Nuevo Registro.",
    "loading.records": "Cargando registros...",
    "error.loading.records": "Ocurrió un error al cargar los registros",

    // Messages
    loading: "Cargando...",
    ok: "OK",
    error: "Error",
    success: "Éxito",
    "error.occurred": "Ocurrió un error",
    "code.copied": "¡Código copiado al portapapeles!",
    "qr.downloaded": "¡Código QR descargado!",
    "record.created": "¡Registro creado con éxito!",
    "user.code.created": "¡Código de usuario creado con éxito!",
    "login.success": "¡Inicio de sesión exitoso!",
    "safeloved.qr.scanned": "¡Código QR de SafeLoved escaneado con éxito!",
    "record.loaded": "¡Información del registro cargada!",
    "enter.username": "Por favor ingrese un nombre de usuario",
    "enter.code": "Por favor ingrese un código",
    "code.must.be.8": "El código debe tener 8 caracteres (formato XXXX XXXX)",
    "enter.valid.age": "Por favor ingrese una edad válida",
    "code.generation.error":
      "Ocurrió un error al generar el código. Por favor, inténtelo de nuevo.",
    "record.creation.error": "Ocurrió un error al crear el registro",
    "camera.start.error": "No se pudo iniciar la cámara",
    "qr.generation.error": "No se pudo generar el código QR",
    "camera.permission.note":
      "Por favor verifique el permiso de la cámara en la configuración del navegador.",

    // QR Fallback Text
    "qr.fallback.text":
      "Descargue la aplicación SafeLoved de Google Play Store y escanee el código QR en la pantalla de consulta para contacto",
  },

  ar: {
    // Main Screen
    "app.title": "مرحباً بك في SafeLoved",
    "app.subtitle": "حلك الحديث لإدارة المستخدمين الآمنة والسهلة",
    "user.entry": "دخول المستخدم",
    "user.entry.desc": "إنشاء حساب جديد أو تسجيل الدخول إلى حسابك الحالي",
    "user.new.register": "إنشاء تسجيل مستخدم جديد",
    "user.existing.login": "تسجيل دخول مستخدم حالي",
    "inquiry.entry": "دخول الاستعلام",
    "inquiry.entry.desc": "البحث برمز QR أو رمز التسجيل",
    "inquiry.qr": "استعلام رمز QR",
    "inquiry.code": "البحث برمز التسجيل",

    // User Registration
    "register.title": "تسجيل مستخدم جديد",
    "register.username.prompt": "أدخل اسم المستخدم الخاص بك",
    "register.code.prompt": "إنشاء الرمز الفريد الخاص بك",
    username: "اسم المستخدم",
    "username.placeholder": "أدخل اسمك",
    continue: "متابعة",
    "generate.code": "إنشاء الرمز",
    generating: "جاري الإنشاء...",
    "your.code": "رمز المستخدم الخاص بك:",
    copy: "نسخ",
    copied: "تم النسخ!",
    "code.save.note":
      "احفظ هذا الرمز في مكان آمن. ستحتاجه لتسجيل الدخول إلى حسابك.",

    // User Login
    "login.title": "تسجيل دخول المستخدم",
    "login.prompt": "أدخل رمز المستخدم الحالي الخاص بك",
    "user.code": "رمز المستخدم",
    "code.placeholder": "XXXX XXXX",
    login: "تسجيل الدخول",
    "code.format.note": "يجب أن يكون الرمز الخاص بك 8 أحرف بتنسيق XXXX XXXX",

    // User Screen
    "back.to.main": "العودة إلى الصفحة الرئيسية",
    "user.profile": "ملف المستخدم",
    logout: "تسجيل الخروج",
    "user.screen.title": "لوحة تحكم المستخدم",
    "user.screen.desc": "إنشاء سجلات جديدة أو عرض سجلاتك الحالية",
    "new.record": "سجل جديد",
    "my.records": "سجلاتي",

    // Categories
    "category.insan": "شخص",
    "category.hayvan": "حيوان",
    "category.esya": "عنصر",
    "category.arac": "مركبة",

    // Forms - Common
    "contact.person": "شخص الاتصال",
    "contact.info": "معلومات الاتصال",
    "contact.person.placeholder": "مثال: أحمد محمد",
    "contact.info.placeholder": "مثال: +966 55 123 4567 أو email@example.com",
    "generate.qr.code": "إنشاء رمز QR ورمز الاستعلام",
    "required.fields": "يرجى ملء جميع الحقول المطلوبة",

    // Forms - Insan
    "insan.name": "الاسم الكامل",
    "insan.name.placeholder": "مثال: أحمد محمد",
    "insan.age": "العمر",
    "insan.age.placeholder": "مثال: 25",
    "insan.relationship": "العلاقة",
    "insan.relationship.placeholder": "مثال: أم، أخ، صديق",
    "insan.description": "الوصف",
    "insan.description.placeholder": "معلومات إضافية...",

    // Forms - Hayvan
    "hayvan.name": "الاسم",
    "hayvan.name.placeholder": "مثال: فلافي",
    "hayvan.species": "النوع",
    "hayvan.species.placeholder": "مثال: كلب، قطة، إلخ",
    "hayvan.color": "اللون",
    "hayvan.color.placeholder": "مثال: بني",
    "hayvan.notes": "ملاحظات",
    "hayvan.notes.placeholder": "معلومات إضافية...",

    // Forms - Esya
    "esya.name": "اسم العنصر",
    "esya.name.placeholder": "مثال: كمبيوتر محمول",
    "esya.brand": "العلامة التجارية",
    "esya.brand.placeholder": "مثال: أبل",
    "esya.serial": "الرقم التسلسلي",
    "esya.serial.placeholder": "مثال: ABC123456",
    "esya.description": "الوصف",
    "esya.description.placeholder": "معلومات إضافية...",

    // Forms - Arac
    "arac.plate": "لوحة الترخيص",
    "arac.plate.placeholder": "مثال: ABC 1234",
    "arac.brand": "العلامة التجارية",
    "arac.brand.placeholder": "مثال: تويوتا",
    "arac.model": "الموديل",
    "arac.model.placeholder": "مثال: كورولا",
    "arac.color": "اللون",
    "arac.color.placeholder": "مثال: أبيض",

    // Inquiry Screen
    "inquiry.title": "استعلام السجل",
    "back.to.home": "الصفحة الرئيسية",
    "search.by.code": "البحث بالرمز",
    "scan.qr": "مسح رمز QR",
    "search.code": "رمز البحث",
    search: "بحث",
    searching: "جاري البحث...",
    "start.scanning": "بدء المسح",
    "stop.scanning": "إيقاف المسح",
    "camera.off": "الكاميرا مغلقة",
    "processing.qr": "معالجة رمز QR...",
    "camera.not.supported": "الكاميرا غير مدعومة",
    "camera.not.found": "لم يتم العثور على كاميرا أو غير مدعومة على جهازك.",
    "how.to.use": "كيفية الاستخدام؟",
    "qr.instruction.1": "امسك رمز QR أمام الكاميرا",
    "qr.instruction.2": "يتم اكتشاف رموز SafeLoved QR تلقائياً",
    "qr.instruction.3": "يتم عرض معلومات السجل على الفور",
    "qr.instruction.4": "يتم عرض رسالة معلومات لرموز QR الخارجية",

    // Record Display
    "record.not.found": "لم يتم العثور على السجل",
    "record.not.found.desc":
      "رمز SafeLoved QR هذا صالح ولكن لم يتم العثور على سجل في النظام.",
    "external.qr": "رمز QR خارجي",
    "invalid.qr": "رمز QR غير صالح",
    "unreadable.qr": "تعذر قراءة رمز QR. يرجى المحاولة مرة أخرى.",
    "invalid.qr.format":
      "تنسيق رمز SafeLoved QR غير صالح. معلومات الرمز مفقودة أو غير صحيحة.",
    "code.label": "الرمز:",
    age: "العمر:",
    relationship: "العلاقة:",
    description: "الوصف:",
    species: "النوع:",
    color: "اللون:",
    notes: "ملاحظات:",
    brand: "العلامة التجارية:",
    "serial.no": "الرقم التسلسلي:",
    model: "الموديل:",

    // QR Code Display
    "qr.code.title": "رمز QR ورمز الاستعلام",
    "qr.code.desc":
      "تم إنشاء السجل بنجاح! يمكنك العثور على رمز QR ورمز الاستعلام أدناه.",
    "query.code": "رمز الاستعلام:",
    "copy.code": "نسخ الرمز",
    "download.qr": "تنزيل رمز QR",
    "create.new": "إنشاء سجل جديد",
    "qr.info.title": "كيفية استخدام رمز QR؟",
    "qr.info.1": "اطبع أو احفظ رمز QR رقمياً",
    "qr.info.2": "أرفق الرمز بعنصرك أو مركبتك أو حيوانك الأليف",
    "qr.info.3": "يمكن للباحث مسح رمز QR باستخدام تطبيق SafeLoved",
    "qr.info.4": "سيتم عرض معلومات الاتصال الخاصة بك تلقائياً",

    // My Records
    "no.records": "لم تقم بإنشاء أي سجلات بعد",
    "no.records.desc": "يمكنك إنشاء سجلك الأول من علامة التبويب سجل جديد.",
    "loading.records": "جاري تحميل السجلات...",
    "error.loading.records": "حدث خطأ أثناء تحميل السجلات",

    // Messages
    loading: "جاري التحميل...",
    ok: "موافق",
    error: "خطأ",
    success: "نجاح",
    "error.occurred": "حدث خطأ",
    "code.copied": "تم نسخ الرمز إلى الحافظة!",
    "qr.downloaded": "تم تنزيل رمز QR!",
    "record.created": "تم إنشاء السجل بنجاح!",
    "user.code.created": "تم إنشاء رمز المستخدم بنجاح!",
    "login.success": "تم تسجيل الدخول بنجاح!",
    "safeloved.qr.scanned": "تم مسح رمز SafeLoved QR بنجاح!",
    "record.loaded": "تم تحميل معلومات السجل!",
    "enter.username": "يرجى إدخال اسم مستخدم",
    "enter.code": "يرجى إدخال رمز",
    "code.must.be.8": "يجب أن يكون الرمز 8 أحرف (تنسيق XXXX XXXX)",
    "enter.valid.age": "يرجى إدخال عمر صالح",
    "code.generation.error":
      "حدث خطأ أثناء إنشاء الرمز. يرجى المحاولة مرة أخرى.",
    "record.creation.error": "حدث خطأ أثناء إنشاء السجل",
    "camera.start.error": "تعذر بدء تشغيل الكاميرا",
    "qr.generation.error": "تعذر إنشاء رمز QR",
    "camera.permission.note": "يرجى التحقق من إذن الكاميرا في إعدادات المتصفح.",

    // QR Fallback Text
    "qr.fallback.text":
      "قم بتنزيل تطبيق SafeLoved من متجر Google Play وامسح رمز QR في شاشة الاستعلام للاتصال",
  },

  hi: {
    // Main Screen
    "app.title": "SafeLoved में आपका स्वागत है",
    "app.subtitle": "सुरक्षित और आसान उपयोगकर्ता प्रबंधन के लिए आपका आधुनिक समाधान",
    "user.entry": "उपयोगकर्ता प्रवेश",
    "user.entry.desc": "नया खाता बनाएं या अपने मौजूदा खाते में लॉग इन करें",
    "user.new.register": "नया उपयोगकर्ता पंजीकरण बनाएं",
    "user.existing.login": "मौजूदा उपयोगकर्ता लॉगिन",
    "inquiry.entry": "पूछताछ प्रवेश",
    "inquiry.entry.desc": "QR कोड या पंजीकरण कोड द्वारा खोजें",
    "inquiry.qr": "QR कोड पूछताछ",
    "inquiry.code": "पंजीकरण कोड द्वारा खोजें",

    // User Registration
    "register.title": "नया उपयोगकर्ता पंजीकरण",
    "register.username.prompt": "अपना उपयोगकर्ता नाम दर्ज करें",
    "register.code.prompt": "अपना अद्वितीय कोड उत्पन्न करें",
    username: "उपयोगकर्ता नाम",
    "username.placeholder": "अपना नाम दर्ज करें",
    continue: "जारी रखें",
    "generate.code": "कोड उत्पन्न करें",
    generating: "उत्पन्न हो रहा है...",
    "your.code": "आपका उपयोगकर्ता कोड:",
    copy: "कॉपी करें",
    copied: "कॉपी किया गया!",
    "code.save.note":
      "इस कोड को सुरक्षित स्थान पर सहेजें। आपको अपने खाते में लॉग इन करने के लिए इसकी आवश्यकता होगी।",

    // User Login
    "login.title": "उपयोगकर्ता लॉगिन",
    "login.prompt": "अपना मौजूदा उपयोगकर्ता कोड दर्ज करें",
    "user.code": "उपयोगकर्ता कोड",
    "code.placeholder": "XXXX XXXX",
    login: "लॉग इन करें",
    "code.format.note": "आपका कोड XXXX XXXX प्रारूप में 8 वर्णों का होना चाहिए",

    // User Screen
    "back.to.main": "मुख्य पृष्ठ पर वापस जाएं",
    "user.profile": "उपयोगकर्ता प्रोफ़ाइल",
    logout: "लॉग आउट",
    "user.screen.title": "उपयोगकर्ता डैशबोर्ड",
    "user.screen.desc": "नए रिकॉर्ड बनाएं या अपने मौजूदा रिकॉर्ड देखें",
    "new.record": "नया रिकॉर्ड",
    "my.records": "मेरे रिकॉर्ड",

    // Categories
    "category.insan": "व्यक्ति",
    "category.hayvan": "जानवर",
    "category.esya": "वस्तु",
    "category.arac": "वाहन",

    // Forms - Common
    "contact.person": "संपर्क व्यक्ति",
    "contact.info": "संपर्क जानकारी",
    "contact.person.placeholder": "उदा., राज कुमार",
    "contact.info.placeholder": "उदा., +91 98765 43210 या email@example.com",
    "generate.qr.code": "QR कोड और क्वेरी कोड उत्पन्न करें",
    "required.fields": "कृपया सभी आवश्यक फ़ील्ड भरें",

    // Forms - Insan
    "insan.name": "पूरा नाम",
    "insan.name.placeholder": "उदा., राज कुमार",
    "insan.age": "आयु",
    "insan.age.placeholder": "उदा., 25",
    "insan.relationship": "संबंध",
    "insan.relationship.placeholder": "उदा., माँ, भाई, दोस्त",
    "insan.description": "विवरण",
    "insan.description.placeholder": "अतिरिक्त जानकारी...",

    // Forms - Hayvan
    "hayvan.name": "नाम",
    "hayvan.name.placeholder": "उदा., फ्लफी",
    "hayvan.species": "प्रजाति",
    "hayvan.species.placeholder": "उदा., कुत्ता, बिल्ली, आदि",
    "hayvan.color": "रंग",
    "hayvan.color.placeholder": "उदा., भूरा",
    "hayvan.notes": "नोट्स",
    "hayvan.notes.placeholder": "अतिरिक्त जानकारी...",

    // Forms - Esya
    "esya.name": "वस्तु का नाम",
    "esya.name.placeholder": "उदा., लैपटॉप",
    "esya.brand": "ब्रांड",
    "esya.brand.placeholder": "उदा., एप्पल",
    "esya.serial": "सीरियल नंबर",
    "esya.serial.placeholder": "उदा., ABC123456",
    "esya.description": "विवरण",
    "esya.description.placeholder": "अतिरिक्त जानकारी...",

    // Forms - Arac
    "arac.plate": "लाइसेंस प्लेट",
    "arac.plate.placeholder": "उदा., DL 01 AB 1234",
    "arac.brand": "ब्रांड",
    "arac.brand.placeholder": "उदा., टोयोटा",
    "arac.model": "मॉडल",
    "arac.model.placeholder": "उदा., कोरोला",
    "arac.color": "रंग",
    "arac.color.placeholder": "उदा., सफेद",

    // Inquiry Screen
    "inquiry.title": "रिकॉर्ड पूछताछ",
    "back.to.home": "होम",
    "search.by.code": "कोड द्वारा खोजें",
    "scan.qr": "QR कोड स्कैन करें",
    "search.code": "खोज कोड",
    search: "खोजें",
    searching: "खोज रहे हैं...",
    "start.scanning": "स्कैनिंग शुरू करें",
    "stop.scanning": "स्कैनिंग बंद करें",
    "camera.off": "कैमरा बंद",
    "processing.qr": "QR कोड प्रोसेस हो रहा है...",
    "camera.not.supported": "कैमरा समर्थित नहीं है",
    "camera.not.found": "कोई कैमरा नहीं मिला या आपके डिवाइस पर समर्थित नहीं है।",
    "how.to.use": "कैसे उपयोग करें?",
    "qr.instruction.1": "QR कोड को कैमरे के सामने रखें",
    "qr.instruction.2": "SafeLoved QR कोड स्वचालित रूप से पहचाने जाते हैं",
    "qr.instruction.3": "रिकॉर्ड जानकारी तुरंत प्रदर्शित होती है",
    "qr.instruction.4": "बाहरी QR कोड के लिए सूचना संदेश प्रदर्शित होता है",

    // Record Display
    "record.not.found": "रिकॉर्ड नहीं मिला",
    "record.not.found.desc":
      "यह SafeLoved QR कोड मान्य है लेकिन सिस्टम में कोई रिकॉर्ड नहीं मिला।",
    "external.qr": "बाहरी QR कोड",
    "invalid.qr": "अमान्य QR कोड",
    "unreadable.qr": "QR कोड पढ़ा नहीं जा सका। कृपया पुनः प्रयास करें।",
    "invalid.qr.format":
      "SafeLoved QR कोड प्रारूप अमान्य है। कोड जानकारी गायब है या गलत है।",
    "code.label": "कोड:",
    age: "आयु:",
    relationship: "संबंध:",
    description: "विवरण:",
    species: "प्रजाति:",
    color: "रंग:",
    notes: "नोट्स:",
    brand: "ब्रांड:",
    "serial.no": "सीरियल नंबर:",
    model: "मॉडल:",

    // QR Code Display
    "qr.code.title": "QR कोड और क्वेरी कोड",
    "qr.code.desc":
      "रिकॉर्ड सफलतापूर्वक बनाया गया! आप नीचे अपना QR कोड और क्वेरी कोड पा सकते हैं।",
    "query.code": "क्वेरी कोड:",
    "copy.code": "कोड कॉपी करें",
    "download.qr": "QR कोड डाउनलोड करें",
    "create.new": "नया रिकॉर्ड बनाएं",
    "qr.info.title": "QR कोड का उपयोग कैसे करें?",
    "qr.info.1": "QR कोड को प्रिंट करें या डिजिटल रूप से सहेजें",
    "qr.info.2": "कोड को अपनी वस्तु, वाहन या पालतू जानवर से संलग्न करें",
    "qr.info.3": "खोजकर्ता SafeLoved ऐप से QR कोड स्कैन कर सकता है",
    "qr.info.4": "आपकी संपर्क जानकारी स्वचालित रूप से प्रदर्शित होगी",

    // My Records
    "no.records": "आपने अभी तक कोई रिकॉर्ड नहीं बनाया है",
    "no.records.desc": "आप नया रिकॉर्ड टैब से अपना पहला रिकॉर्ड बना सकते हैं।",
    "loading.records": "रिकॉर्ड लोड हो रहे हैं...",
    "error.loading.records": "रिकॉर्ड लोड करते समय एक त्रुटि हुई",

    // Messages
    loading: "लोड हो रहा है...",
    ok: "ठीक है",
    error: "त्रुटि",
    success: "सफलता",
    "error.occurred": "एक त्रुटि हुई",
    "code.copied": "कोड क्लिपबोर्ड पर कॉपी किया गया!",
    "qr.downloaded": "QR कोड डाउनलोड किया गया!",
    "record.created": "रिकॉर्ड सफलतापूर्वक बनाया गया!",
    "user.code.created": "उपयोगकर्ता कोड सफलतापूर्वक बनाया गया!",
    "login.success": "लॉगिन सफल!",
    "safeloved.qr.scanned": "SafeLoved QR कोड सफलतापूर्वक स्कैन किया गया!",
    "record.loaded": "रिकॉर्ड जानकारी लोड की गई!",
    "enter.username": "कृपया एक उपयोगकर्ता नाम दर्ज करें",
    "enter.code": "कृपया एक कोड दर्ज करें",
    "code.must.be.8": "कोड 8 वर्णों का होना चाहिए (XXXX XXXX प्रारूप)",
    "enter.valid.age": "कृपया एक मान्य आयु दर्ज करें",
    "code.generation.error": "कोड उत्पन्न करते समय एक त्रुटि हुई। कृपया पुनः प्रयास करें।",
    "record.creation.error": "रिकॉर्ड बनाते समय एक त्रुटि हुई",
    "camera.start.error": "कैमरा शुरू नहीं हो सका",
    "qr.generation.error": "QR कोड उत्पन्न नहीं हो सका",
    "camera.permission.note": "कृपया ब्राउज़र सेटिंग्स में कैमरा अनुमति जांचें।",

    // QR Fallback Text
    "qr.fallback.text":
      "Google Play Store से SafeLoved ऐप डाउनलोड करें और संपर्क के लिए पूछताछ स्क्रीन में QR कोड स्कैन करें",
  },

  fr: {
    // Main Screen
    "app.title": "Bienvenue sur SafeLoved",
    "app.subtitle":
      "Votre solution moderne pour une gestion des utilisateurs sécurisée et facile",
    "user.entry": "Entrée Utilisateur",
    "user.entry.desc":
      "Créez un nouveau compte ou connectez-vous à votre compte existant",
    "user.new.register": "Créer un Nouvel Enregistrement Utilisateur",
    "user.existing.login": "Connexion Utilisateur Existant",
    "inquiry.entry": "Entrée de Demande",
    "inquiry.entry.desc": "Rechercher par code QR ou code d'enregistrement",
    "inquiry.qr": "Demande de Code QR",
    "inquiry.code": "Rechercher par Code d'Enregistrement",

    // User Registration
    "register.title": "Nouvel Enregistrement Utilisateur",
    "register.username.prompt": "Entrez votre nom d'utilisateur",
    "register.code.prompt": "Générez votre code unique",
    username: "Nom d'Utilisateur",
    "username.placeholder": "Entrez votre nom",
    continue: "Continuer",
    "generate.code": "Générer le Code",
    generating: "Génération...",
    "your.code": "Votre Code Utilisateur:",
    copy: "Copier",
    copied: "Copié!",
    "code.save.note":
      "Enregistrez ce code dans un endroit sûr. Vous en aurez besoin pour vous connecter à votre compte.",

    // User Login
    "login.title": "Connexion Utilisateur",
    "login.prompt": "Entrez votre code utilisateur existant",
    "user.code": "Code Utilisateur",
    "code.placeholder": "XXXX XXXX",
    login: "Se Connecter",
    "code.format.note":
      "Votre code doit comporter 8 caractères au format XXXX XXXX",

    // User Screen
    "back.to.main": "Retour à la Page Principale",
    "user.profile": "Profil Utilisateur",
    logout: "Déconnexion",
    "user.screen.title": "Tableau de Bord Utilisateur",
    "user.screen.desc":
      "Créez de nouveaux enregistrements ou consultez vos enregistrements existants",
    "new.record": "Nouvel Enregistrement",
    "my.records": "Mes Enregistrements",

    // Categories
    "category.insan": "Personne",
    "category.hayvan": "Animal",
    "category.esya": "Article",
    "category.arac": "Véhicule",

    // Forms - Common
    "contact.person": "Personne de Contact",
    "contact.info": "Informations de Contact",
    "contact.person.placeholder": "ex., Jean Dupont",
    "contact.info.placeholder": "ex., +33 6 12 34 56 78 ou email@example.com",
    "generate.qr.code": "Générer le Code QR et le Code de Requête",
    "required.fields": "Veuillez remplir tous les champs obligatoires",

    // Forms - Insan
    "insan.name": "Nom Complet",
    "insan.name.placeholder": "ex., Jean Dupont",
    "insan.age": "Âge",
    "insan.age.placeholder": "ex., 25",
    "insan.relationship": "Relation",
    "insan.relationship.placeholder": "ex., mère, frère, ami",
    "insan.description": "Description",
    "insan.description.placeholder": "Informations supplémentaires...",

    // Forms - Hayvan
    "hayvan.name": "Nom",
    "hayvan.name.placeholder": "ex., Fluffy",
    "hayvan.species": "Espèce",
    "hayvan.species.placeholder": "ex., chien, chat, etc.",
    "hayvan.color": "Couleur",
    "hayvan.color.placeholder": "ex., marron",
    "hayvan.notes": "Notes",
    "hayvan.notes.placeholder": "Informations supplémentaires...",

    // Forms - Esya
    "esya.name": "Nom de l'Article",
    "esya.name.placeholder": "ex., Ordinateur Portable",
    "esya.brand": "Marque",
    "esya.brand.placeholder": "ex., Apple",
    "esya.serial": "Numéro de Série",
    "esya.serial.placeholder": "ex., ABC123456",
    "esya.description": "Description",
    "esya.description.placeholder": "Informations supplémentaires...",

    // Forms - Arac
    "arac.plate": "Plaque d'Immatriculation",
    "arac.plate.placeholder": "ex., AB-123-CD",
    "arac.brand": "Marque",
    "arac.brand.placeholder": "ex., Toyota",
    "arac.model": "Modèle",
    "arac.model.placeholder": "ex., Corolla",
    "arac.color": "Couleur",
    "arac.color.placeholder": "ex., blanc",

    // Inquiry Screen
    "inquiry.title": "Demande d'Enregistrement",
    "back.to.home": "Accueil",
    "search.by.code": "Rechercher par Code",
    "scan.qr": "Scanner le Code QR",
    "search.code": "Code de Recherche",
    search: "Rechercher",
    searching: "Recherche...",
    "start.scanning": "Démarrer le Scan",
    "stop.scanning": "Arrêter le Scan",
    "camera.off": "Caméra éteinte",
    "processing.qr": "Traitement du code QR...",
    "camera.not.supported": "Caméra non prise en charge",
    "camera.not.found":
      "Aucune caméra trouvée ou non prise en charge sur votre appareil.",
    "how.to.use": "Comment Utiliser?",
    "qr.instruction.1": "Tenez le code QR devant la caméra",
    "qr.instruction.2": "Les codes QR SafeLoved sont automatiquement détectés",
    "qr.instruction.3":
      "Les informations d'enregistrement sont affichées instantanément",
    "qr.instruction.4":
      "Un message d'information est affiché pour les codes QR externes",

    // Record Display
    "record.not.found": "Enregistrement Non Trouvé",
    "record.not.found.desc":
      "Ce code QR SafeLoved est valide mais aucun enregistrement n'a été trouvé dans le système.",
    "external.qr": "Code QR Externe",
    "invalid.qr": "Code QR Invalide",
    "unreadable.qr": "Le code QR n'a pas pu être lu. Veuillez réessayer.",
    "invalid.qr.format":
      "Le format du code QR SafeLoved est invalide. Les informations du code sont manquantes ou incorrectes.",
    "code.label": "Code:",
    age: "Âge:",
    relationship: "Relation:",
    description: "Description:",
    species: "Espèce:",
    color: "Couleur:",
    notes: "Notes:",
    brand: "Marque:",
    "serial.no": "Numéro de Série:",
    model: "Modèle:",

    // QR Code Display
    "qr.code.title": "Code QR et Code de Requête",
    "qr.code.desc":
      "Enregistrement créé avec succès! Vous pouvez trouver votre code QR et votre code de requête ci-dessous.",
    "query.code": "Code de Requête:",
    "copy.code": "Copier le Code",
    "download.qr": "Télécharger le Code QR",
    "create.new": "Créer un Nouvel Enregistrement",
    "qr.info.title": "Comment Utiliser le Code QR?",
    "qr.info.1": "Imprimez ou enregistrez le code QR numériquement",
    "qr.info.2":
      "Attachez le code à votre article, véhicule ou animal de compagnie",
    "qr.info.3":
      "Le trouveur peut scanner le code QR avec l'application SafeLoved",
    "qr.info.4": "Vos informations de contact seront affichées automatiquement",

    // My Records
    "no.records": "Vous n'avez pas encore créé d'enregistrements",
    "no.records.desc":
      "Vous pouvez créer votre premier enregistrement à partir de l'onglet Nouvel Enregistrement.",
    "loading.records": "Chargement des enregistrements...",
    "error.loading.records":
      "Une erreur s'est produite lors du chargement des enregistrements",

    // Messages
    loading: "Chargement...",
    ok: "OK",
    error: "Erreur",
    success: "Succès",
    "error.occurred": "Une erreur s'est produite",
    "code.copied": "Code copié dans le presse-papiers!",
    "qr.downloaded": "Code QR téléchargé!",
    "record.created": "Enregistrement créé avec succès!",
    "user.code.created": "Code utilisateur créé avec succès!",
    "login.success": "Connexion réussie!",
    "safeloved.qr.scanned": "Code QR SafeLoved scanné avec succès!",
    "record.loaded": "Informations d'enregistrement chargées!",
    "enter.username": "Veuillez entrer un nom d'utilisateur",
    "enter.code": "Veuillez entrer un code",
    "code.must.be.8": "Le code doit comporter 8 caractères (format XXXX XXXX)",
    "enter.valid.age": "Veuillez entrer un âge valide",
    "code.generation.error":
      "Une erreur s'est produite lors de la génération du code. Veuillez réessayer.",
    "record.creation.error":
      "Une erreur s'est produite lors de la création de l'enregistrement",
    "camera.start.error": "Impossible de démarrer la caméra",
    "qr.generation.error": "Impossible de générer le code QR",
    "camera.permission.note":
      "Veuillez vérifier l'autorisation de la caméra dans les paramètres du navigateur.",

    // QR Fallback Text
    "qr.fallback.text":
      "Téléchargez l'application SafeLoved depuis Google Play Store et scannez le code QR dans l'écran de demande pour le contact",
  },

  ru: {
    // Main Screen
    "app.title": "Добро пожаловать в SafeLoved",
    "app.subtitle":
      "Ваше современное решение для безопасного и простого управления пользователями",
    "user.entry": "Вход Пользователя",
    "user.entry.desc":
      "Создайте новую учетную запись или войдите в существующую",
    "user.new.register": "Создать Новую Регистрацию Пользователя",
    "user.existing.login": "Вход Существующего Пользователя",
    "inquiry.entry": "Вход для Запроса",
    "inquiry.entry.desc": "Поиск по QR-коду или регистрационному коду",
    "inquiry.qr": "Запрос QR-кода",
    "inquiry.code": "Поиск по Регистрационному Коду",

    // User Registration
    "register.title": "Новая Регистрация Пользователя",
    "register.username.prompt": "Введите ваше имя пользователя",
    "register.code.prompt": "Сгенерируйте ваш уникальный код",
    username: "Имя Пользователя",
    "username.placeholder": "Введите ваше имя",
    continue: "Продолжить",
    "generate.code": "Сгенерировать Код",
    generating: "Генерация...",
    "your.code": "Ваш Код Пользователя:",
    copy: "Копировать",
    copied: "Скопировано!",
    "code.save.note":
      "Сохраните этот код в безопасном месте. Он понадобится вам для входа в вашу учетную запись.",

    // User Login
    "login.title": "Вход Пользователя",
    "login.prompt": "Введите ваш существующий код пользователя",
    "user.code": "Код Пользователя",
    "code.placeholder": "XXXX XXXX",
    login: "Войти",
    "code.format.note":
      "Ваш код должен состоять из 8 символов в формате XXXX XXXX",

    // User Screen
    "back.to.main": "Вернуться на Главную Страницу",
    "user.profile": "Профиль Пользователя",
    logout: "Выйти",
    "user.screen.title": "Панель Пользователя",
    "user.screen.desc":
      "Создавайте новые записи или просматривайте существующие",
    "new.record": "Новая Запись",
    "my.records": "Мои Записи",

    // Categories
    "category.insan": "Человек",
    "category.hayvan": "Животное",
    "category.esya": "Предмет",
    "category.arac": "Транспорт",

    // Forms - Common
    "contact.person": "Контактное Лицо",
    "contact.info": "Контактная Информация",
    "contact.person.placeholder": "напр., Иван Иванов",
    "contact.info.placeholder": "напр., +7 900 123 45 67 или email@example.com",
    "generate.qr.code": "Сгенерировать QR-код и Код Запроса",
    "required.fields": "Пожалуйста, заполните все обязательные поля",

    // Forms - Insan
    "insan.name": "Полное Имя",
    "insan.name.placeholder": "напр., Иван Иванов",
    "insan.age": "Возраст",
    "insan.age.placeholder": "напр., 25",
    "insan.relationship": "Отношение",
    "insan.relationship.placeholder": "напр., мать, брат, друг",
    "insan.description": "Описание",
    "insan.description.placeholder": "Дополнительная информация...",

    // Forms - Hayvan
    "hayvan.name": "Имя",
    "hayvan.name.placeholder": "напр., Пушистик",
    "hayvan.species": "Вид",
    "hayvan.species.placeholder": "напр., собака, кошка и т.д.",
    "hayvan.color": "Цвет",
    "hayvan.color.placeholder": "напр., коричневый",
    "hayvan.notes": "Заметки",
    "hayvan.notes.placeholder": "Дополнительная информация...",

    // Forms - Esya
    "esya.name": "Название Предмета",
    "esya.name.placeholder": "напр., Ноутбук",
    "esya.brand": "Бренд",
    "esya.brand.placeholder": "напр., Apple",
    "esya.serial": "Серийный Номер",
    "esya.serial.placeholder": "напр., ABC123456",
    "esya.description": "Описание",
    "esya.description.placeholder": "Дополнительная информация...",

    // Forms - Arac
    "arac.plate": "Номерной Знак",
    "arac.plate.placeholder": "напр., А123БВ 77",
    "arac.brand": "Бренд",
    "arac.brand.placeholder": "напр., Toyota",
    "arac.model": "Модель",
    "arac.model.placeholder": "напр., Corolla",
    "arac.color": "Цвет",
    "arac.color.placeholder": "напр., белый",

    // Inquiry Screen
    "inquiry.title": "Запрос Записи",
    "back.to.home": "Главная",
    "search.by.code": "Поиск по Коду",
    "scan.qr": "Сканировать QR-код",
    "search.code": "Код Поиска",
    search: "Поиск",
    searching: "Поиск...",
    "start.scanning": "Начать Сканирование",
    "stop.scanning": "Остановить Сканирование",
    "camera.off": "Камера выключена",
    "processing.qr": "Обработка QR-кода...",
    "camera.not.supported": "Камера не поддерживается",
    "camera.not.found":
      "Камера не найдена или не поддерживается на вашем устройстве.",
    "how.to.use": "Как Использовать?",
    "qr.instruction.1": "Держите QR-код перед камерой",
    "qr.instruction.2": "QR-коды SafeLoved определяются автоматически",
    "qr.instruction.3": "Информация о записи отображается мгновенно",
    "qr.instruction.4":
      "Для внешних QR-кодов отображается информационное сообщение",

    // Record Display
    "record.not.found": "Запись Не Найдена",
    "record.not.found.desc":
      "Этот QR-код SafeLoved действителен, но запись не найдена в системе.",
    "external.qr": "Внешний QR-код",
    "invalid.qr": "Недействительный QR-код",
    "unreadable.qr":
      "QR-код не удалось прочитать. Пожалуйста, попробуйте еще раз.",
    "invalid.qr.format":
      "Формат QR-кода SafeLoved недействителен. Информация о коде отсутствует или неверна.",
    "code.label": "Код:",
    age: "Возраст:",
    relationship: "Отношение:",
    description: "Описание:",
    species: "Вид:",
    color: "Цвет:",
    notes: "Заметки:",
    brand: "Бренд:",
    "serial.no": "Серийный Номер:",
    model: "Модель:",

    // QR Code Display
    "qr.code.title": "QR-код и Код Запроса",
    "qr.code.desc":
      "Запись успешно создана! Вы можете найти свой QR-код и код запроса ниже.",
    "query.code": "Код Запроса:",
    "copy.code": "Копировать Код",
    "download.qr": "Скачать QR-код",
    "create.new": "Создать Новую Запись",
    "qr.info.title": "Как Использовать QR-код?",
    "qr.info.1": "Распечатайте или сохраните QR-код в цифровом виде",
    "qr.info.2": "Прикрепите код к вашему предмету, транспорту или питомцу",
    "qr.info.3":
      "Нашедший может отсканировать QR-код с помощью приложения SafeLoved",
    "qr.info.4": "Ваша контактная информация будет отображена автоматически",

    // My Records
    "no.records": "Вы еще не создали ни одной записи",
    "no.records.desc":
      "Вы можете создать свою первую запись на вкладке Новая Запись.",
    "loading.records": "Загрузка записей...",
    "error.loading.records": "Произошла ошибка при загрузке записей",

    // Messages
    loading: "Загрузка...",
    ok: "ОК",
    error: "Ошибка",
    success: "Успех",
    "error.occurred": "Произошла ошибка",
    "code.copied": "Код скопирован в буфер обмена!",
    "qr.downloaded": "QR-код загружен!",
    "record.created": "Запись успешно создана!",
    "user.code.created": "Код пользователя успешно создан!",
    "login.success": "Вход выполнен успешно!",
    "safeloved.qr.scanned": "QR-код SafeLoved успешно отсканирован!",
    "record.loaded": "Информация о записи загружена!",
    "enter.username": "Пожалуйста, введите имя пользователя",
    "enter.code": "Пожалуйста, введите код",
    "code.must.be.8": "Код должен состоять из 8 символов (формат XXXX XXXX)",
    "enter.valid.age": "Пожалуйста, введите действительный возраст",
    "code.generation.error":
      "Произошла ошибка при генерации кода. Пожалуйста, попробуйте еще раз.",
    "record.creation.error": "Произошла ошибка при создании записи",
    "camera.start.error": "Не удалось запустить камеру",
    "qr.generation.error": "Не удалось сгенерировать QR-код",
    "camera.permission.note":
      "Пожалуйста, проверьте разрешение камеры в настройках браузера.",

    // QR Fallback Text
    "qr.fallback.text":
      "Загрузите приложение SafeLoved из Google Play Store и отсканируйте QR-код на экране запроса для контакта",
  },

  pt: {
    // Main Screen
    "app.title": "Bem-vindo ao SafeLoved",
    "app.subtitle":
      "Sua solução moderna para gerenciamento de usuários seguro e fácil",
    "user.entry": "Entrada de Usuário",
    "user.entry.desc":
      "Crie uma nova conta ou faça login em sua conta existente",
    "user.new.register": "Criar Novo Registro de Usuário",
    "user.existing.login": "Login de Usuário Existente",
    "inquiry.entry": "Entrada de Consulta",
    "inquiry.entry.desc": "Pesquisar por código QR ou código de registro",
    "inquiry.qr": "Consulta de Código QR",
    "inquiry.code": "Pesquisar por Código de Registro",

    // User Registration
    "register.title": "Novo Registro de Usuário",
    "register.username.prompt": "Digite seu nome de usuário",
    "register.code.prompt": "Gere seu código único",
    username: "Nome de Usuário",
    "username.placeholder": "Digite seu nome",
    continue: "Continuar",
    "generate.code": "Gerar Código",
    generating: "Gerando...",
    "your.code": "Seu Código de Usuário:",
    copy: "Copiar",
    copied: "Copiado!",
    "code.save.note":
      "Salve este código em um local seguro. Você precisará dele para fazer login em sua conta.",

    // User Login
    "login.title": "Login de Usuário",
    "login.prompt": "Digite seu código de usuário existente",
    "user.code": "Código de Usuário",
    "code.placeholder": "XXXX XXXX",
    login: "Entrar",
    "code.format.note": "Seu código deve ter 8 caracteres no formato XXXX XXXX",

    // User Screen
    "back.to.main": "Voltar à Página Principal",
    "user.profile": "Perfil de Usuário",
    logout: "Sair",
    "user.screen.title": "Painel do Usuário",
    "user.screen.desc":
      "Crie novos registros ou visualize seus registros existentes",
    "new.record": "Novo Registro",
    "my.records": "Meus Registros",

    // Categories
    "category.insan": "Pessoa",
    "category.hayvan": "Animal",
    "category.esya": "Item",
    "category.arac": "Veículo",

    // Forms - Common
    "contact.person": "Pessoa de Contato",
    "contact.info": "Informações de Contato",
    "contact.person.placeholder": "ex., João Silva",
    "contact.info.placeholder": "ex., +55 11 98765 4321 ou email@example.com",
    "generate.qr.code": "Gerar Código QR e Código de Consulta",
    "required.fields": "Por favor, preencha todos os campos obrigatórios",

    // Forms - Insan
    "insan.name": "Nome Completo",
    "insan.name.placeholder": "ex., João Silva",
    "insan.age": "Idade",
    "insan.age.placeholder": "ex., 25",
    "insan.relationship": "Relacionamento",
    "insan.relationship.placeholder": "ex., mãe, irmão, amigo",
    "insan.description": "Descrição",
    "insan.description.placeholder": "Informações adicionais...",

    // Forms - Hayvan
    "hayvan.name": "Nome",
    "hayvan.name.placeholder": "ex., Fofinho",
    "hayvan.species": "Espécie",
    "hayvan.species.placeholder": "ex., cachorro, gato, etc.",
    "hayvan.color": "Cor",
    "hayvan.color.placeholder": "ex., marrom",
    "hayvan.notes": "Notas",
    "hayvan.notes.placeholder": "Informações adicionais...",

    // Forms - Esya
    "esya.name": "Nome do Item",
    "esya.name.placeholder": "ex., Notebook",
    "esya.brand": "Marca",
    "esya.brand.placeholder": "ex., Apple",
    "esya.serial": "Número de Série",
    "esya.serial.placeholder": "ex., ABC123456",
    "esya.description": "Descrição",
    "esya.description.placeholder": "Informações adicionais...",

    // Forms - Arac
    "arac.plate": "Placa",
    "arac.plate.placeholder": "ex., ABC-1234",
    "arac.brand": "Marca",
    "arac.brand.placeholder": "ex., Toyota",
    "arac.model": "Modelo",
    "arac.model.placeholder": "ex., Corolla",
    "arac.color": "Cor",
    "arac.color.placeholder": "ex., branco",

    // Inquiry Screen
    "inquiry.title": "Consulta de Registro",
    "back.to.home": "Início",
    "search.by.code": "Pesquisar por Código",
    "scan.qr": "Escanear Código QR",
    "search.code": "Código de Pesquisa",
    search: "Pesquisar",
    searching: "Pesquisando...",
    "start.scanning": "Iniciar Escaneamento",
    "stop.scanning": "Parar Escaneamento",
    "camera.off": "Câmera desligada",
    "processing.qr": "Processando código QR...",
    "camera.not.supported": "Câmera não suportada",
    "camera.not.found":
      "Nenhuma câmera encontrada ou não suportada em seu dispositivo.",
    "how.to.use": "Como Usar?",
    "qr.instruction.1": "Segure o código QR na frente da câmera",
    "qr.instruction.2":
      "Os códigos QR SafeLoved são detectados automaticamente",
    "qr.instruction.3":
      "As informações do registro são exibidas instantaneamente",
    "qr.instruction.4":
      "Uma mensagem informativa é exibida para códigos QR externos",

    // Record Display
    "record.not.found": "Registro Não Encontrado",
    "record.not.found.desc":
      "Este código QR SafeLoved é válido, mas nenhum registro foi encontrado no sistema.",
    "external.qr": "Código QR Externo",
    "invalid.qr": "Código QR Inválido",
    "unreadable.qr":
      "O código QR não pôde ser lido. Por favor, tente novamente.",
    "invalid.qr.format":
      "O formato do código QR SafeLoved é inválido. As informações do código estão faltando ou incorretas.",
    "code.label": "Código:",
    age: "Idade:",
    relationship: "Relacionamento:",
    description: "Descrição:",
    species: "Espécie:",
    color: "Cor:",
    notes: "Notas:",
    brand: "Marca:",
    "serial.no": "Número de Série:",
    model: "Modelo:",

    // QR Code Display
    "qr.code.title": "Código QR e Código de Consulta",
    "qr.code.desc":
      "Registro criado com sucesso! Você pode encontrar seu código QR e código de consulta abaixo.",
    "query.code": "Código de Consulta:",
    "copy.code": "Copiar Código",
    "download.qr": "Baixar Código QR",
    "create.new": "Criar Novo Registro",
    "qr.info.title": "Como Usar o Código QR?",
    "qr.info.1": "Imprima ou salve o código QR digitalmente",
    "qr.info.2": "Anexe o código ao seu item, veículo ou animal de estimação",
    "qr.info.3":
      "O localizador pode escanear o código QR com o aplicativo SafeLoved",
    "qr.info.4": "Suas informações de contato serão exibidas automaticamente",

    // My Records
    "no.records": "Você ainda não criou nenhum registro",
    "no.records.desc":
      "Você pode criar seu primeiro registro na aba Novo Registro.",
    "loading.records": "Carregando registros...",
    "error.loading.records": "Ocorreu um erro ao carregar os registros",

    // Messages
    loading: "Carregando...",
    ok: "OK",
    error: "Erro",
    success: "Sucesso",
    "error.occurred": "Ocorreu um erro",
    "code.copied": "Código copiado para a área de transferência!",
    "qr.downloaded": "Código QR baixado!",
    "record.created": "Registro criado com sucesso!",
    "user.code.created": "Código de usuário criado com sucesso!",
    "login.success": "Login bem-sucedido!",
    "safeloved.qr.scanned": "Código QR SafeLoved escaneado com sucesso!",
    "record.loaded": "Informações do registro carregadas!",
    "enter.username": "Por favor, digite um nome de usuário",
    "enter.code": "Por favor, digite um código",
    "code.must.be.8": "O código deve ter 8 caracteres (formato XXXX XXXX)",
    "enter.valid.age": "Por favor, digite uma idade válida",
    "code.generation.error":
      "Ocorreu um erro ao gerar o código. Por favor, tente novamente.",
    "record.creation.error": "Ocorreu um erro ao criar o registro",
    "camera.start.error": "Não foi possível iniciar a câmera",
    "qr.generation.error": "Não foi possível gerar o código QR",
    "camera.permission.note":
      "Por favor, verifique a permissão da câmera nas configurações do navegador.",

    // QR Fallback Text
    "qr.fallback.text":
      "Baixe o aplicativo SafeLoved da Google Play Store e escaneie o código QR na tela de consulta para contato",
  },
};

/**
 * Detects the device language and returns a supported language code
 */
export function detectDeviceLanguage(): Language {
  const browserLang = navigator.language.toLowerCase();

  // Map browser language codes to our supported languages
  const langMap: Record<string, Language> = {
    tr: "tr",
    "tr-tr": "tr",
    en: "en",
    "en-us": "en",
    "en-gb": "en",
    zh: "zh",
    "zh-cn": "zh",
    "zh-hans": "zh",
    es: "es",
    "es-es": "es",
    "es-mx": "es",
    ar: "ar",
    "ar-sa": "ar",
    hi: "hi",
    "hi-in": "hi",
    fr: "fr",
    "fr-fr": "fr",
    ru: "ru",
    "ru-ru": "ru",
    pt: "pt",
    "pt-br": "pt",
    "pt-pt": "pt",
  };

  // Try exact match first
  if (langMap[browserLang]) {
    return langMap[browserLang];
  }

  // Try language prefix (e.g., 'en' from 'en-au')
  const langPrefix = browserLang.split("-")[0];
  if (langMap[langPrefix]) {
    return langMap[langPrefix];
  }

  // Default to Turkish
  return DEFAULT_LANGUAGE;
}

/**
 * Gets the stored language preference or detects device language
 */
export function getInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.some((lang) => lang.code === stored)) {
      return stored as Language;
    }
  } catch (error) {
    console.error("Error reading language preference:", error);
  }

  return detectDeviceLanguage();
}

/**
 * Saves the language preference to localStorage
 */
export function saveLanguagePreference(language: Language): void {
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch (error) {
    console.error("Error saving language preference:", error);
  }
}

/**
 * Gets a translation for a key in the specified language
 */
export function translate(key: string, language: Language): string {
  return (
    translations[language]?.[key] ||
    translations[DEFAULT_LANGUAGE]?.[key] ||
    key
  );
}

/**
 * Gets the text direction for a language
 */
export function getTextDirection(language: Language): "ltr" | "rtl" {
  const lang = SUPPORTED_LANGUAGES.find((l) => l.code === language);
  return lang?.direction || "ltr";
}

/**
 * Gets the language option for a language code
 */
export function getLanguageOption(
  language: Language,
): LanguageOption | undefined {
  return SUPPORTED_LANGUAGES.find((l) => l.code === language);
}
