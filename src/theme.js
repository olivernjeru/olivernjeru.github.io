import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FAVICON_DARK, FAVICON_LIGHT, THEME_STORAGE_KEY as STORAGE_KEY } from "./themeConfig.js";

export const ThemeContext = createContext({
  mode: "dark",
  toggle: () => { },
});

const readInitial = () => {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {
    /* ignore */
  }
  return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

const updateFavicon = (mode) => {
  if (typeof document === "undefined") return;
  const link = document.querySelector('link[rel="icon"][type="image/svg+xml"]');
  if (link) {
    link.href = mode === "dark" ? FAVICON_DARK : FAVICON_LIGHT;
  }
};

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(readInitial);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", mode);
    updateFavicon(mode);
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore */
    }
  }, [mode]);

  // Keeps open tabs in sync: the browser fires "storage" in every other tab of
  // this origin when one tab saves a new theme.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY && (e.newValue === "light" || e.newValue === "dark")) {
        setMode(e.newValue);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback(() => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  const value = useMemo(() => ({ mode, toggle }), [mode, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => useContext(ThemeContext);
