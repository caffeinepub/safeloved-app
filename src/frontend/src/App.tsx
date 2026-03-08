import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toaster } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Bell, Moon, Palette, RefreshCw, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import AdMobInterstitial from "./components/AdMobInterstitial";
import LanguageSelector from "./components/LanguageSelector";
import { DarkModeProvider, useDarkMode } from "./contexts/DarkModeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { useLanguage } from "./contexts/LanguageContext";
import {
  type ThemeName,
  ThemeProvider,
  themes,
  useTheme,
} from "./contexts/ThemeContext";
import { useAdManager } from "./hooks/useAdManager";
import { useBackendHealth } from "./hooks/useBackendHealth";
import InquiryScreen from "./pages/InquiryScreen";
import MainScreen from "./pages/MainScreen";
import UserScreen from "./pages/UserScreen";

const APP_VERSION = "2.0.0";
const VERSION_KEY = "safeloved_app_version";
const NOTIF_DISMISSED_KEY = "safeloved_notif_dismissed";
const NOTIF_GRANTED_KEY = "safeloved_notif_granted";
const NOTIF_SCHEDULED_KEY = "safeloved_notif_scheduled";

// Create query client with better error handling and retry logic
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
      retry: (failureCount, error: any) => {
        const errorMessage = error?.message || String(error);
        if (
          errorMessage.includes("IC0508") ||
          errorMessage.includes("bakımda") ||
          errorMessage.includes("Canister is stopped")
        ) {
          return false;
        }
        return failureCount < 2;
      },
      staleTime: 30000,
    },
    mutations: {
      retry: (failureCount, error: any) => {
        const errorMessage = error?.message || String(error);
        if (
          errorMessage.includes("IC0508") ||
          errorMessage.includes("bakımda") ||
          errorMessage.includes("Canister is stopped")
        ) {
          return false;
        }
        return failureCount < 2;
      },
    },
  },
});

export type Screen = "main" | "user-screen" | "inquiry";

interface UserSession {
  username: string;
  userCode: string;
}

const STORAGE_KEY = "safeloved_user_session";

// --- Dark mode toggle component ---
function DarkModeToggle() {
  const { isDark, toggleDark } = useDarkMode();
  const { t } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggleDark}
      title={isDark ? t.lightMode : t.darkMode}
      data-ocid="header.toggle"
      className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

// --- Theme selector ---
function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  const themeColors: Record<ThemeName, string> = {
    purple: "#8b5cf6",
    green: "#22c55e",
    orange: "#f97316",
    red: "#ef4444",
    blue: "#3b82f6",
  };

  const themeNames: Record<ThemeName, string> = {
    purple: t.themePurple,
    green: t.themeGreen,
    orange: t.themeOrange,
    red: t.themeRed,
    blue: t.themeBlue,
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          title={t.themeSelector}
          data-ocid="header.popover"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
        >
          <Palette className="h-4 w-4" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-3" align="end">
        <p className="text-sm font-medium mb-2">{t.themeSelector}</p>
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(themeColors) as ThemeName[]).map((name) => (
            <button
              type="button"
              key={name}
              data-ocid="theme.button"
              onClick={() => setTheme(name)}
              title={themeNames[name]}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                theme === name
                  ? "border-foreground scale-110"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: themeColors[name] }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// --- Backend status dot ---
function BackendStatusDot() {
  const { status } = useBackendHealth();
  const { t } = useLanguage();

  const colorClass = {
    online: "bg-green-400",
    offline: "bg-red-500",
    checking: "bg-yellow-400 animate-pulse",
  }[status];

  const label = {
    online: t.backendOnline,
    offline: t.backendOffline,
    checking: t.backendChecking,
  }[status];

  return (
    <div title={label} className="flex items-center">
      <div
        className={`w-2.5 h-2.5 rounded-full ${colorClass}`}
        data-ocid="header.toggle"
      />
    </div>
  );
}

// --- Backend maintenance banner ---
function BackendBanner() {
  const { status, countdown, checkHealth } = useBackendHealth();
  const { t } = useLanguage();
  const [dismissed, setDismissed] = useState(false);

  // Reset dismissed when status changes to offline again
  useEffect(() => {
    if (status === "online") setDismissed(false);
  }, [status]);

  if (status !== "offline" || dismissed) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] bg-yellow-500 text-black px-4 py-2 flex items-center justify-between gap-3 text-sm font-medium shadow-lg"
      data-ocid="backend.error_state"
    >
      <span className="flex-1 text-center">
        {t.backendOffline} &mdash; {t.retryingIn} {countdown}s
      </span>
      <div className="flex items-center gap-2 flex-shrink-0">
        <button
          type="button"
          onClick={() => checkHealth()}
          className="text-xs underline opacity-80 hover:opacity-100"
        >
          {t.retryNow ?? "Şimdi Dene"}
        </button>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="opacity-70 hover:opacity-100"
          title="Kapat"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// --- Update notification banner ---
function UpdateBanner() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(VERSION_KEY);
      if (!stored || stored !== APP_VERSION) {
        setShow(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleDismiss = () => {
    setShow(false);
    try {
      localStorage.setItem(VERSION_KEY, APP_VERSION);
    } catch {
      // ignore
    }
  };

  const handleRefresh = () => {
    try {
      localStorage.setItem(VERSION_KEY, APP_VERSION);
    } catch {
      // ignore
    }
    window.location.reload();
  };

  if (!show) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[99] bg-green-500 text-white px-4 py-2 flex items-center justify-between gap-3 text-sm font-medium shadow-lg"
      data-ocid="update.success_state"
    >
      <span className="flex-1">{t.updateAvailable}</span>
      <div className="flex gap-2 flex-shrink-0">
        <Button
          size="sm"
          variant="secondary"
          onClick={handleRefresh}
          data-ocid="update.primary_button"
          className="h-7 text-xs"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          {t.refreshApp}
        </Button>
        <button
          type="button"
          onClick={handleDismiss}
          data-ocid="update.close_button"
          className="hover:opacity-70 transition-opacity"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// --- Notification prompt ---
function NotificationPrompt() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(NOTIF_DISMISSED_KEY);
      if (dismissed) return;

      if (!("Notification" in window)) return;
      if (Notification.permission === "default") {
        setShow(true);
      } else if (Notification.permission === "granted") {
        // Schedule a reminder notification after 3 days if not already done
        const scheduled = localStorage.getItem(NOTIF_SCHEDULED_KEY);
        if (!scheduled) {
          const delay = 3 * 24 * 60 * 60 * 1000;
          setTimeout(() => {
            try {
              new Notification("SafeLoved", {
                body: "Yeni kayıt ekleyebilirsiniz!",
                icon: "/assets/generated/safeloved-logo-new-transparent.dim_300x100.png",
              });
            } catch {
              // ignore
            }
          }, delay);
          localStorage.setItem(NOTIF_SCHEDULED_KEY, "true");
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAllow = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        localStorage.setItem(NOTIF_GRANTED_KEY, "true");
        // Schedule 3-day reminder
        const delay = 3 * 24 * 60 * 60 * 1000;
        setTimeout(() => {
          try {
            new Notification("SafeLoved", {
              body: "Yeni kayıt ekleyebilirsiniz!",
            });
          } catch {
            // ignore
          }
        }, delay);
        localStorage.setItem(NOTIF_SCHEDULED_KEY, "true");
      }
    } catch {
      // ignore
    }
    setShow(false);
    localStorage.setItem(NOTIF_DISMISSED_KEY, "true");
  };

  const handleDismiss = () => {
    setShow(false);
    localStorage.setItem(NOTIF_DISMISSED_KEY, "true");
  };

  if (!show) return null;

  return (
    <div
      className="fixed bottom-20 left-4 right-4 z-50 max-w-sm mx-auto bg-card border border-border rounded-xl shadow-lg p-4 flex items-start gap-3"
      data-ocid="notification.card"
    >
      <Bell className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm">{t.notificationPrompt}</p>
        <div className="flex gap-2 mt-2">
          <Button
            size="sm"
            onClick={handleAllow}
            data-ocid="notification.primary_button"
            className="h-7 text-xs"
          >
            {t.allowNotifications}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleDismiss}
            data-ocid="notification.close_button"
            className="h-7 text-xs"
          >
            {t.dismissNotification}
          </Button>
        </div>
      </div>
    </div>
  );
}

// --- SafeLoved SVG Logo ---
function SafeLovedLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 100"
      className={className}
      role="img"
      aria-label="SafeLoved"
    >
      <title>SafeLoved</title>
      {/* Shield icon */}
      <path
        d="M28 14 L48 20 L48 42 Q48 58 28 66 Q8 58 8 42 L8 20 Z"
        fill="white"
        fillOpacity="0.95"
      />
      {/* Heart inside shield */}
      <path
        d="M28 52 Q18 44 18 37 Q18 31 24 31 Q26 31 28 34 Q30 31 32 31 Q38 31 38 37 Q38 44 28 52Z"
        fill="#ff6b9d"
      />
      {/* SafeLoved text */}
      <text
        x="60"
        y="62"
        fontFamily="'Segoe UI', Arial, sans-serif"
        fontWeight="700"
        fontSize="38"
        fill="white"
        fillOpacity="0.97"
        letterSpacing="-1"
      >
        SafeLoved
      </text>
    </svg>
  );
}

// --- Splash screen ---
function SplashScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-accent to-secondary">
      <div className="flex flex-col items-center gap-6">
        <div className="animate-pulse">
          <SafeLovedLogo className="h-20 w-auto drop-shadow-2xl" />
        </div>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-white/80 animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 rounded-full bg-white/80 animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 rounded-full bg-white/80 animate-bounce" />
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("main");
  const [userSession, setUserSession] = useState<UserSession | null>(null);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const { showInterstitialAd, showInterstitial, closeInterstitial } =
    useAdManager();

  useEffect(() => {
    const checkSession = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const session = JSON.parse(stored) as UserSession;
          if (session.username && session.userCode) {
            setUserSession(session);
            setCurrentScreen("user-screen");
          }
        }
      } catch (error) {
        console.error("Error loading session:", error);
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  const saveSession = (username: string, userCode: string) => {
    const session: UserSession = { username, userCode };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      setUserSession(session);
    } catch (error) {
      console.error("Error saving session:", error);
    }
  };

  const clearSession = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setUserSession(null);
      setCurrentScreen("main");
      queryClient.clear();
    } catch (error) {
      console.error("Error clearing session:", error);
    }
  };

  const navigateToUserScreen = (username: string, code: string) => {
    saveSession(username, code);
    setCurrentScreen("user-screen");
  };

  const navigateToInquiry = () => setCurrentScreen("inquiry");
  const navigateToMain = () => setCurrentScreen("main");
  const handleLogout = () => clearSession();

  if (isCheckingSession) {
    return <SplashScreen />;
  }

  return (
    <>
      <BackendBanner />
      <UpdateBanner />

      <div className="min-h-screen relative">
        {/* Global controls - Fixed Position */}
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
          <BackendStatusDot />
          <DarkModeToggle />
          <ThemeSelector />
          <LanguageSelector />
        </div>

        {currentScreen === "main" && (
          <MainScreen
            onNavigateToUserScreen={navigateToUserScreen}
            onNavigateToInquiry={navigateToInquiry}
          />
        )}
        {currentScreen === "user-screen" && userSession && (
          <UserScreen
            username={userSession.username}
            userCode={userSession.userCode}
            onNavigateBack={navigateToMain}
            onLogout={handleLogout}
            onShowInterstitial={showInterstitial}
          />
        )}
        {currentScreen === "inquiry" && (
          <InquiryScreen
            onBack={navigateToMain}
            onShowInterstitial={showInterstitial}
          />
        )}
      </div>

      <Toaster />
      <AdMobInterstitial
        isOpen={showInterstitialAd}
        onClose={closeInterstitial}
      />
      <NotificationPrompt />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <DarkModeProvider>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <AppContent />
          </QueryClientProvider>
        </ThemeProvider>
      </DarkModeProvider>
    </LanguageProvider>
  );
}

export default App;
