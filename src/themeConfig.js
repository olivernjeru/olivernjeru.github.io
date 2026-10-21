// Theme constants shared by the React ThemeProvider (src/theme.js) and the
// pre-paint script that config/sharedHead.js injects into every page.
// Plain JS on purpose: vite.config.js loads this file in Node, so no JSX.

export const THEME_STORAGE_KEY = "hearthTheme";
export const FAVICON_LIGHT = "/brand/favicons/favicon.svg";
export const FAVICON_DARK = "/brand/favicons/favicon-dark.svg";
