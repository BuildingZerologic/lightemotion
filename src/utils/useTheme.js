import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "lightemotion-theme";
const THEME_EVENT = "lightemotion-theme-change";

function getStoredTheme() {
    if (typeof document === "undefined") {
        return "light";
    }

    return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function notifyThemeChange() {
    window.dispatchEvent(new Event(THEME_EVENT));
}

export function setThemePreference(theme) {
    const nextTheme = theme === "dark" ? "dark" : "light";

    if (nextTheme === "dark") {
        document.documentElement.dataset.theme = "dark";
    } else {
        document.documentElement.removeAttribute("data-theme");
    }

    try {
        window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
        // Theme still updates for the current session if storage is blocked.
    }

    notifyThemeChange();
}

export function useTheme() {
    const theme = useSyncExternalStore(
        (callback) => {
            window.addEventListener(THEME_EVENT, callback);
            window.addEventListener("storage", callback);

            return () => {
                window.removeEventListener(THEME_EVENT, callback);
                window.removeEventListener("storage", callback);
            };
        },
        getStoredTheme,
        () => "light"
    );

    const setTheme = useCallback((nextTheme) => {
        setThemePreference(nextTheme);
    }, []);

    const toggleTheme = useCallback(() => {
        setThemePreference(getStoredTheme() === "dark" ? "light" : "dark");
    }, []);

    return {
        theme,
        isDark: theme === "dark",
        setTheme,
        toggleTheme,
    };
}
