import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";

module {
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

  type UserProfile = {
    username : Text;
    userCode : Text;
  };

  type OldUserRecord = {
    userCode : Text;
    username : Text;
    category : RecordCategory;
    recordData : RecordData;
    uniqueCode : Text;
    qrEncodedData : QREncodedData;
    creationTimestamp : Time.Time;
  };

  type NewUserRecord = {
    userCode : Text;
    username : Text;
    category : RecordCategory;
    recordData : RecordData;
    uniqueCode : Text;
    qrEncodedData : QREncodedData;
    creationTimestamp : Time.Time;
    location : Text;
    viewCount : Nat;
  };

  type OldActor = {
    manualUserRoles : Map.Map<Principal, Bool>;
    userProfiles : Map.Map<Principal, UserProfile>;
    userCodeToProfile : Map.Map<Text, UserProfile>;
    userCodeToPrincipal : Map.Map<Text, Principal>;
    userCodes : Map.Map<Text, Time.Time>;
    userRecords : Map.Map<Text, OldUserRecord>;
    userToRecords : Map.Map<Text, Map.Map<Text, OldUserRecord>>;
    shareableLinks : Map.Map<Text, Text>;
  };

  type NewActor = {
    manualUserRoles : Map.Map<Principal, Bool>;
    userProfiles : Map.Map<Principal, UserProfile>;
    userCodeToProfile : Map.Map<Text, UserProfile>;
    userCodeToPrincipal : Map.Map<Text, Principal>;
    userCodes : Map.Map<Text, Time.Time>;
    userRecords : Map.Map<Text, NewUserRecord>;
    userToRecords : Map.Map<Text, Map.Map<Text, NewUserRecord>>;
    shareableLinks : Map.Map<Text, Text>;
  };

  public func run(old : OldActor) : NewActor {
    let newUserRecords = old.userRecords.map<Text, OldUserRecord, NewUserRecord>(
      func(_uniqueCode, oldRecord) {
        { oldRecord with location = ""; viewCount = 0 };
      }
    );

    let newUserToRecords = old.userToRecords.map<Text, Map.Map<Text, OldUserRecord>, Map.Map<Text, NewUserRecord>>(
      func(_userCode, oldRecordMap) {
        let newRecordMap = oldRecordMap.map<Text, OldUserRecord, NewUserRecord>(
          func(_code, oldRecord) {
            { oldRecord with location = ""; viewCount = 0 };
          }
        );
        newRecordMap;
      }
    );

    {
      old with
      userRecords = newUserRecords;
      userToRecords = newUserToRecords;
    };
  };
};
