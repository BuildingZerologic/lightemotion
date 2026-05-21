import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

import logo from "../assets/brand/light-emotion-logo.png";

import "./Navbar.scss";

const navLinks = [
    {
        label: "Home",
        href: "/",
    },
    {
        label: "About",
        href: "/about",
    },
    {
        label: "Catalog",
        href: "/catalog",
    },
    {
        label: "Services",
        href: "/services",
    },
    {
        label: "Contact",
        href: "/",
    },
];

export default function Navbar() {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScrollState = () => {
            const solidSurface = document.querySelector("[data-navbar-solid]");

            if (solidSurface) {
                setIsScrolled(true);

                return;
            }

            const transparentSurface =
                document.querySelector("[data-navbar-transparent]") ||
                document.querySelector(".hero");

            if (!transparentSurface) {
                setIsScrolled(window.scrollY > 24);

                return;
            }

            const surfaceBottom = transparentSurface.getBoundingClientRect().bottom;

            setIsScrolled(surfaceBottom <= 74);
        };

        handleScrollState();

        window.addEventListener("scroll", handleScrollState, { passive: true });
        window.addEventListener("resize", handleScrollState);

        return () => {
            window.removeEventListener("scroll", handleScrollState);
            window.removeEventListener("resize", handleScrollState);
        };
    }, [location.pathname]);

    useEffect(() => {
        if (!isMenuOpen) {
            return undefined;
        }

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => window.removeEventListener("keydown", handleEscape);
    }, [isMenuOpen]);

    const navbarClassName = [
        "site-navbar",
        isScrolled || isMenuOpen ? "site-navbar--scrolled" : "site-navbar--hero",
        isMenuOpen ? "site-navbar--open" : "",
    ].filter(Boolean).join(" ");

    return (
        <motion.header
            className={navbarClassName}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <div className="container">
                <nav className="site-navbar__nav" aria-label="Primary navigation">
                    <Link
                        className="site-navbar__brand"
                        to="/"
                        aria-label="Light Emotion homepage"
                    >
                        <img src={logo} alt="Light Emotion" />
                    </Link>

                    <ul className="site-navbar__links">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <Link to={link.href}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <button
                        className="site-navbar__toggle"
                        type="button"
                        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={isMenuOpen}
                        aria-controls="site-navbar-menu"
                        onClick={() => setIsMenuOpen((current) => !current)}
                    >
                        <span />
                        <span />
                    </button>
                </nav>
            </div>

            <div className="site-navbar__mobile-menu" id="site-navbar-menu">
                <div className="container">
                    <ul>
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <Link to={link.href} onClick={() => setIsMenuOpen(false)}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.header>
    );
}
