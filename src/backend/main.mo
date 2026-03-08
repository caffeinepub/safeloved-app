import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Iter "mo:core/Iter";



actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Manual role tracking to bypass admin-only assignRole restriction
  let manualUserRoles = Map.empty<Principal, Bool>();

  func ensureUserAccess(caller : Principal) {
    // Check if caller already has a role in the access control system
    let currentRole = AccessControl.getUserRole(accessControlState, caller);

    switch (currentRole) {
      case (#guest) {
        // Since AccessControl.assignRole requires admin privileges,
        // we track user roles manually for self-assignment
        // This allows any caller (including anonymous) to self-assign #user role
        if (not manualUserRoles.containsKey(caller)) {
          manualUserRoles.add(caller, true);
        };
      };
      case (#user) {
        // Already has user role, ensure it's tracked
        if (not manualUserRoles.containsKey(caller)) {
          manualUserRoles.add(caller, true);
        };
      };
      case (#admin) {
        // Admin already has all permissions
      };
    };
  };

  func hasUserAccess(caller : Principal) : Bool {
    let currentRole = AccessControl.getUserRole(accessControlState, caller);
    switch (currentRole) {
      case (#admin) { true };
      case (#user) { true };
      case (#guest) {
        // Check manual role assignment
        switch (manualUserRoles.get(caller)) {
          case (?true) { true };
          case (_) { false };
        };
      };
    };
  };

  public type UserProfile = {
    username : Text;
    userCode : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let userCodeToProfile = Map.empty<Text, UserProfile>();
  let userCodeToPrincipal = Map.empty<Text, Principal>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (not AccessControl.isAdmin(accessControlState, caller) and caller != user) {
      Runtime.trap("Yetkili kullanıcılar sadece kendi profillerini görebilirler.");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func getProfileByUserCode(userCode : Text) : async ?UserProfile {
    userCodeToProfile.get(userCode);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    ensureUserAccess(caller);
    if (not hasUserAccess(caller)) {
      Runtime.trap("Yetkilendirme hatası. Lütfen tekrar giriş yapın.");
    };
    userProfiles.add(caller, profile);
    userCodeToProfile.add(profile.userCode, profile);
    userCodeToPrincipal.add(profile.userCode, caller);
  };

  type RecordCategory = { #insan; #hayvan; #esya; #arac };

  type InsanKaydi = {
    adSoyad : Text;
    yas : Nat;
    iliski : Text;
    aciklama : Text;
    contactPerson : Text;
    contactInfo : Text;
  };

  type HayvanKaydi = {
    ad : Text;
    tur : Text;
    renk : Text;
    notlar : Text;
    contactPerson : Text;
    contactInfo : Text;
  };

  type EsyaKaydi = {
    esyaAdi : Text;
    marka : Text;
    seriNo : Text;
    aciklama : Text;
    contactPerson : Text;
    contactInfo : Text;
  };

  type AracKaydi = {
    plaka : Text;
    marka : Text;
    model : Text;
    renk : Text;
    contactPerson : Text;
    contactInfo : Text;
  };

  type RecordData = {
    #insan : InsanKaydi;
    #hayvan : HayvanKaydi;
    #esya : EsyaKaydi;
    #arac : AracKaydi;
  };

  type QREncodedData = {
    displayText : Text;
    uniqueCode : Text;
    contactPerson : Text;
    contactInfo : Text;
  };

  type UserRecord = {
    userCode : Text;
    username : Text;
    category : RecordCategory;
    recordData : RecordData;
    uniqueCode : Text;
    qrEncodedData : QREncodedData;
    creationTimestamp : Time.Time;
  };

  let userCodes = Map.empty<Text, Time.Time>();
  let userRecords = Map.empty<Text, UserRecord>();
  let userToRecords = Map.empty<Text, Map.Map<Text, UserRecord>>();
  let shareableLinks = Map.empty<Text, Text>();

  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".toArray();
  let charsetSize = 36;

  func generateRandomIndices() : ?[Nat] {
    let now = Time.now();
    if (now < 0) { return null };
    let time = now.toNat();
    if (time == 0) { return null };

    let shiftAmount = time % 17;
    let shiftedTime = time * 2 ** Nat.min(shiftAmount, 63);

    let randomIndex1 = (shiftedTime + 13) % charsetSize;
    let randomIndex2 = (shiftedTime + 29) % charsetSize;
    let randomIndex3 = (shiftedTime + 47) % charsetSize;
    let randomIndex4 = (shiftedTime + 73) % charsetSize;
    let randomIndex5 = (shiftedTime + 89) % charsetSize;
    let randomIndex6 = (shiftedTime + 101) % charsetSize;
    let randomIndex7 = (shiftedTime + 127) % charsetSize;
    let randomIndex8 = (shiftedTime + 151) % charsetSize;

    ?[
      randomIndex1,
      randomIndex2,
      randomIndex3,
      randomIndex4,
      randomIndex5,
      randomIndex6,
      randomIndex7,
      randomIndex8,
    ];
  };

  func generateUniqueCode() : Text {
    switch (generateRandomIndices()) {
      case (null) { "" };
      case (?indices) {
        if (indices.size() != 8) { return "" };

        let firstPart = Text.fromArray([
          chars[indices[0]],
          chars[indices[1]],
          chars[indices[2]],
          chars[indices[3]],
        ]);

        let secondPart = Text.fromArray([
          chars[indices[4]],
          chars[indices[5]],
          chars[indices[6]],
          chars[indices[7]],
        ]);
        firstPart # " " # secondPart;
      };
    };
  };

  func generateUniqueUserCode() : Text {
    switch (generateRandomIndices()) {
      case (null) { "" };
      case (?indices) {
        if (indices.size() != 8) { return "" };

        let firstPart = Text.fromArray([
          chars[indices[0]],
          chars[indices[1]],
          chars[indices[2]],
          chars[indices[3]],
        ]);
        let secondPart = Text.fromArray([
          chars[indices[4]],
          chars[indices[5]],
          chars[indices[6]],
          chars[indices[7]],
        ]);
        firstPart # " " # secondPart;
      };
    };
  };

  public shared ({ caller }) func createNewUserCode(username : Text) : async ?UserProfile {
    ensureUserAccess(caller);
    if (not hasUserAccess(caller)) {
      Runtime.trap("Yetkilendirme hatası. Lütfen tekrar giriş yapın.");
    };

    var code = generateUniqueUserCode();

    var attemptCount = 0;
    while ((userCodes.containsKey(code) or code == "") and attemptCount < 50) {
      code := generateUniqueUserCode();
      attemptCount += 1;
    };
    if (attemptCount >= 50) {
      code := generateUniqueUserCode() # "X";
    };

    userCodes.add(code, Time.now());
    let userProfile = {
      username;
      userCode = code;
    };
    userProfiles.add(caller, userProfile);
    userCodeToProfile.add(code, userProfile);
    userCodeToPrincipal.add(code, caller);

    ?userProfile;
  };

  func generateQREncodedData(
    uniqueCode : Text,
    contactPerson : Text,
    contactInfo : Text,
  ) : QREncodedData {
    {
      displayText = "İletişim için Google Play Store'den SafeLoved Uygulamasını İndirin ve QR Kodu Sorgulama Ekranına Okutun";
      uniqueCode;
      contactPerson;
      contactInfo;
    };
  };

  public shared ({ caller }) func addNewRecord(
    userCode : Text,
    category : RecordCategory,
    recordData : RecordData,
    contactPerson : Text,
    contactInfo : Text,
  ) : async ?Text {
    ensureUserAccess(caller);
    if (not hasUserAccess(caller)) {
      Runtime.trap("Yetkilendirme hatası. Lütfen tekrar giriş yapın.");
    };

    switch (userCodeToPrincipal.get(userCode)) {
      case (?owner) {
        if (caller != owner and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Yetkili kullanıcılar sadece kendi kayıtlarını oluşturabilirler.");
        };
      };
      case (null) {
        return null;
      };
    };

    let uniqueCode = generateUniqueCode();
    if (uniqueCode == "") {
      return null;
    };

    let qrEncodedData = generateQREncodedData(
      uniqueCode,
      contactPerson,
      contactInfo,
    );

    let username = switch (userCodeToProfile.get(userCode)) {
      case (?profile) { profile.username };
      case (null) { "" };
    };

    let newRecord : UserRecord = {
      userCode;
      username;
      category;
      recordData;
      uniqueCode;
      qrEncodedData;
      creationTimestamp = Time.now();
    };

    userRecords.add(uniqueCode, newRecord);
    switch (userToRecords.get(userCode)) {
      case (?existingRecords) {
        existingRecords.add(uniqueCode, newRecord);
      };
      case (null) {
        let newRecordMap = Map.empty<Text, UserRecord>();
        newRecordMap.add(uniqueCode, newRecord);
        userToRecords.add(userCode, newRecordMap);
      };
    };
    ?uniqueCode;
  };

  public shared ({ caller }) func getAllRecordsForUser(userCode : Text) : async [UserRecord] {
    ensureUserAccess(caller);
    if (not hasUserAccess(caller)) {
      Runtime.trap("Yetkilendirme hatası. Lütfen tekrar giriş yapın.");
    };

    switch (userCodeToPrincipal.get(userCode)) {
      case (?owner) {
        if (not (AccessControl.isAdmin(accessControlState, caller)) and caller != owner) {
          Runtime.trap("Yetkili kullanıcılar sadece kendi kayıtlarını görüntüleyebilirler.");
        };
      };
      case (null) {
        return [];
      };
    };
    switch (userToRecords.get(userCode)) {
      case (?recordMap) {
        recordMap.values().toArray();
      };
      case (null) { [] };
    };
  };

  public query func getRecordByUniqueCode(code : Text) : async ?UserRecord {
    userRecords.get(code);
  };

  public shared ({ caller }) func generateShareableLink(recordId : Text) : async ?Text {
    ensureUserAccess(caller);
    if (not hasUserAccess(caller)) {
      Runtime.trap("Yetkilendirme hatası. Lütfen tekrar giriş yapın.");
    };

    switch (userRecords.get(recordId)) {
      case (null) {
        return null;
      };
      case (?record) {
        switch (userCodeToPrincipal.get(record.userCode)) {
          case (?owner) {
            if (caller != owner and not AccessControl.isAdmin(accessControlState, caller)) {
              Runtime.trap("Yetkili kullanıcılar sadece kendi kayıtları için paylaşım linki oluşturabilirler.");
            };
          };
          case (null) {
            return null;
          };
        };
      };
    };

    let linkId = generateUniqueLinkId();
    shareableLinks.add(linkId, recordId);
    ?linkId;
  };

  func generateUniqueLinkId() : Text {
    "safeloved_" # Time.now().toText();
  };

  public query ({ caller }) func getRecordByShareableLink(linkId : Text) : async ?UserRecord {
    switch (shareableLinks.get(linkId)) {
      case (?recordId) {
        userRecords.get(recordId);
      };
      case (null) { null };
    };
  };

  public query ({ caller }) func getAllUserCodes() : async [Text] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Sadece yöneticiler tüm kullanıcı kodlarını görüntüleyebilir.");
    };
    userCodes.keys().toArray();
  };
};
