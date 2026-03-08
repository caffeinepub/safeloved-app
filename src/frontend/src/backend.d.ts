import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface EsyaKaydi {
    marka: string;
    contactInfo: string;
    esyaAdi: string;
    contactPerson: string;
    seriNo: string;
    aciklama: string;
}
export interface AracKaydi {
    marka: string;
    model: string;
    contactInfo: string;
    renk: string;
    contactPerson: string;
    plaka: string;
}
export type Time = bigint;
export interface HayvanKaydi {
    ad: string;
    tur: string;
    contactInfo: string;
    notlar: string;
    renk: string;
    contactPerson: string;
}
export type RecordData = {
    __kind__: "arac";
    arac: AracKaydi;
} | {
    __kind__: "esya";
    esya: EsyaKaydi;
} | {
    __kind__: "insan";
    insan: InsanKaydi;
} | {
    __kind__: "hayvan";
    hayvan: HayvanKaydi;
};
export interface QREncodedData {
    contactInfo: string;
    displayText: string;
    contactPerson: string;
    uniqueCode: string;
}
export interface InsanKaydi {
    yas: bigint;
    contactInfo: string;
    contactPerson: string;
    iliski: string;
    aciklama: string;
    adSoyad: string;
}
export interface UserRecord {
    userCode: string;
    username: string;
    qrEncodedData: QREncodedData;
    creationTimestamp: Time;
    recordData: RecordData;
    uniqueCode: string;
    category: RecordCategory;
}
export interface UserProfile {
    userCode: string;
    username: string;
}
export enum RecordCategory {
    arac = "arac",
    esya = "esya",
    insan = "insan",
    hayvan = "hayvan"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addNewRecord(userCode: string, category: RecordCategory, recordData: RecordData, contactPerson: string, contactInfo: string): Promise<string | null>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createNewUserCode(username: string): Promise<UserProfile | null>;
    generateShareableLink(recordId: string): Promise<string | null>;
    getAllRecordsForUser(userCode: string): Promise<Array<UserRecord>>;
    getAllUserCodes(): Promise<Array<string>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProfileByUserCode(userCode: string): Promise<UserProfile | null>;
    getRecordByShareableLink(linkId: string): Promise<UserRecord | null>;
    getRecordByUniqueCode(code: string): Promise<UserRecord | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
