# SafeLoved

## Current State

SafeLoved is a no-auth multi-category record management and QR code app. Current features:
- User registration with unique 8-char codes (XXXX XXXX format)
- Four record categories: human (insan), animal (hayvan), item (esya), vehicle (arac)
- QR code generation per record
- In-app QR scanning (web-based via getUserMedia)
- Multi-language support (TR, EN, ZH, ES, AR, HI, FR, RU, PT)
- Offline support with service worker/PWA cache
- AdMob banner + interstitial ads
- Backend connectivity error handling (Canister stopped detection)
- Shareable link generation

## Requested Changes (Diff)

### Add

**A -- Technical Fixes:**
- A1: Backend health check -- frontend polls backend status and shows a clear "Sunucu Bakımda" banner with auto-retry countdown (not just on mutation errors but proactively on app load)
- A2: QR scanning robustness -- improve scan interval and decoding logic so camera actively decodes without manual trigger; add visual feedback when QR is detected before lookup
- A3: White screen fix on load -- add a proper loading splash screen that shows until the app is hydrated; prevent blank white flash

**B -- New Features:**
- B1: Photo attachment -- allow users to attach 1 photo per record using blob-storage; display photo in RecordCard and InquiryScreen
- B2: Record search and filter -- search bar in MyRecordsTab with filter by category (insan/hayvan/esya/arac) and text search by name/title
- B3: Record version history -- backend stores previous versions when a record is updated; frontend shows version history list per record
- B4: QR scan analytics -- backend records each time a record is looked up (timestamp); frontend shows scan count and last-scanned date in RecordCard
- B5: Dark mode -- toggle button in header; persists to localStorage; full dark theme via Tailwind dark: classes
- B6: Custom themes -- 5 color theme options (default purple/cyan, green, orange, red, blue); stored in localStorage; applied via CSS variables
- B7: Auto update notification -- on app load, check a version string in the backend; if newer version available, show a dismissable banner "Yeni sürüm mevcut, lütfen sayfayı yenileyin"
- B8: Location tagging -- optional lat/lng coordinates on records; displayed as a Google Maps link in record details
- B9: Data export -- export record as PDF (already partially in translations); share link already exists; add working PDF export via browser print/jsPDF
- B10: Cross-device sync hint -- show a note explaining that user code is the sync mechanism; no actual sync needed since backend is shared
- B11: QR scan history -- localStorage list of last 20 scanned codes with timestamps; accessible from InquiryScreen
- B12: Voice commands -- Web Speech API voice input for search field in InquiryScreen; microphone button next to search input
- B13: Push notifications -- Web Push API notification permission request; show reminder notification after 3 days (localStorage timer); no server-side push needed
- B14: Backend status page -- a dedicated status indicator in the header showing green/yellow/red dot based on backend ping result

### Modify

- Backend: Add `scanCount` and `lastScannedAt` fields to UserRecord; add `recordVersions` map for history; add `location` (optional lat/lng text) field to all record types; add `photoUrl` (optional text) field to all record types; add `incrementScanCount` public query; add `updateRecord` mutation that saves old version; add `getRecordVersions` query; add `appVersion` query returning a version string
- MyRecordsTab: Add search/filter UI above record list
- RecordCard: Show photo if available; show scan count + last scanned; add version history button; add location link if present; add PDF export button
- InquiryScreen: Show scan history tab; add voice search button; show photo and location in result
- App.tsx: Add dark mode context; add theme context; add loading splash; add backend status indicator in header; add update notification banner
- translations.ts: Add all new translation keys for all 9 languages

### Remove

- Nothing removed

## Implementation Plan

1. Update backend (main.mo): add photoUrl + location to all record types, scanCount + lastScannedAt to UserRecord, recordVersions map, incrementScanCount, updateRecord, getRecordVersions, appVersion functions
2. Regenerate backend.d.ts bindings
3. Frontend context additions: DarkModeContext, ThemeContext
4. App.tsx: loading splash (A3), backend health check banner (A1, B14), update notification banner (B7), dark mode + theme providers
5. InquiryScreen: QR scan robustness (A2), scan history (B11), voice search (B12)
6. MyRecordsTab: search + category filter (B2)
7. RecordCard: photo display (B1), scan analytics (B4), version history (B3), location link (B8), PDF export (B9)
8. UserScreen/NewRecordTab: photo upload (B1), location input (B8)
9. Push notification setup (B13): prompt on appropriate action
10. Cross-device sync hint (B10): info card in user profile dropdown
11. translations.ts: add all new keys for 9 languages
12. Validate and deploy
