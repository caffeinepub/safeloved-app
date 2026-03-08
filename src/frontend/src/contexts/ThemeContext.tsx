import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

const THEME_KEY = "safeloved_theme";

export type ThemeName = "purple" | "green" | "orange" | "red" | "blue";

export interface ThemeConfig {
  primary: string;
  secondary: string;
  accent: string;
  ring: string;
  primaryDark: string;
  secondaryDark: string;
  accentDark: string;
  ringDark: string;
}

export const themes: Record<ThemeName, ThemeConfig> = {
  purple: {
    primary: "0.55 0.25 290",
    secondary: "0.65 0.20 200",
    accent: "0.60 0.25 340",
    ring: "0.55 0.25 290",
    primaryDark: "0.65 0.25 290",
    secondaryDark: "0.70 0.20 200",
    accentDark: "0.68 0.25 340",
    ringDark: "0.65 0.25 290",
  },
  green: {
    primary: "0.55 0.20 150",
    secondary: "0.65 0.15 180",
    accent: "0.60 0.22 120",
    ring: "0.55 0.20 150",
    primaryDark: "0.65 0.20 150",
    secondaryDark: "0.70 0.15 180",
    accentDark: "0.68 0.22 120",
    ringDark: "0.65 0.20 150",
  },
  orange: {
    primary: "0.60 0.22 50",
    secondary: "0.65 0.20 30",
    accent: "0.62 0.24 70",
    ring: "0.60 0.22 50",
    primaryDark: "0.68 0.22 50",
    secondaryDark: "0.70 0.20 30",
    accentDark: "0.70 0.24 70",
    ringDark: "0.68 0.22 50",
  },
  red: {
    primary: "0.55 0.25 20",
    secondary: "0.60 0.20 350",
    accent: "0.60 0.22 40",
    ring: "0.55 0.25 20",
    primaryDark: "0.65 0.25 20",
    secondaryDark: "0.68 0.20 350",
    accentDark: "0.68 0.22 40",
    ringDark: "0.65 0.25 20",
  },
  blue: {
    primary: "0.50 0.22 240",
    secondary: "0.60 0.18 210",
    accent: "0.58 0.20 260",
    ring: "0.50 0.22 240",
    primaryDark: "0.62 0.22 240",
    secondaryDark: "0.68 0.18 210",
    accentDark: "0.66 0.20 260",
    ringDark: "0.62 0.22 240",
  },
};

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (t: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function applyTheme(name: ThemeName, isDark: boolean) {
  const config = themes[name];
  const root = document.documentElement;
  root.style.setProperty(
    "--primary",
    isDark ? config.primaryDark : config.primary,
  );
  root.style.setProperty(
    "--secondary",
    isDark ? config.secondaryDark : config.secondary,
  );
  root.style.setProperty(
    "--accent",
    isDark ? config.accentDark : config.accent,
  );
  root.style.setProperty("--ring", isDark ? config.ringDark : config.ring);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    try {
      return (localStorage.getItem(THEME_KEY) as ThemeName) || "purple";
    } catch {
      return "purple";
    }
  });

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    applyTheme(theme, isDark);
  }, [theme]);

  // Re-apply theme when dark mode changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains("dark");
      applyTheme(theme, isDark);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, [theme]);

  const setTheme = (t: ThemeName) => {
    setThemeState(t);
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch {
      // ignore
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
