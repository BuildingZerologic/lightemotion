import { useTheme } from "../utils/useTheme";

import "./ThemeToggle.scss";

function MoonIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M20 15.4A8.2 8.2 0 0 1 8.6 4a7.8 7.8 0 1 0 11.4 11.4Z" />
        </svg>
    );
}

function SunIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <circle cx="12" cy="12" r="3.8" />
            <path d="M12 2.8v2.1M12 19.1v2.1M4.2 4.2l1.5 1.5M18.3 18.3l1.5 1.5M2.8 12h2.1M19.1 12h2.1M4.2 19.8l1.5-1.5M18.3 5.7l1.5-1.5" />
        </svg>
    );
}

export default function ThemeToggle({ className = "" }) {
    const { isDark, toggleTheme } = useTheme();

    return (
        <button
            className={`theme-toggle${className ? ` ${className}` : ""}`}
            type="button"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            aria-pressed={isDark}
            onClick={toggleTheme}
        >
            {isDark ? <SunIcon /> : <MoonIcon />}
        </button>
    );
}
