import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

import logo from "../assets/brand/light-emotion-logo.png";
import { navigation } from "../data/navigation";
import MobileNavDrawer from "./MobileNavDrawer";
import ThemeToggle from "./ThemeToggle";

import "./Navbar.scss";

const navLinks = [

    {
        label: "Products",
        href: "/catalog",
    },
    {
        label: "Services",
        href: "/services",
    },
    {
        label: "About",
        href: "/about",
    },
    {
        label: "Contact",
        href: "/contact",
    },
];

export default function Navbar() {
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isNavbarHidden, setIsNavbarHidden] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
    const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
    const productsMenuRef = useRef(null);
    const closeProductsTimerRef = useRef(null);
    const lastScrollYRef = useRef(0);

    const activeCategory = navigation[activeCategoryIndex] || navigation[0];

    const NAVBAR_HEIGHT = 88;
    const NAVBAR_HEIGHT_COMPACT = 74;
    const NAVBAR_HIDE_OFFSET = 120;
    const SCROLL_DIRECTION_THRESHOLD = 8;

    useEffect(() => {
        const handleScrollState = () => {
            const currentScrollY = window.scrollY;
            const scrollDelta = currentScrollY - lastScrollYRef.current;
            const canHideNavbar = !isMenuOpen && !isProductsMenuOpen;

            if (!canHideNavbar || currentScrollY <= NAVBAR_HIDE_OFFSET) {
                setIsNavbarHidden(false);
            } else if (Math.abs(scrollDelta) > SCROLL_DIRECTION_THRESHOLD) {
                setIsNavbarHidden(scrollDelta > 0);
            }

            lastScrollYRef.current = currentScrollY;

            const solidSurface = document.querySelector("[data-navbar-solid]");

            if (solidSurface) {
                setIsScrolled(true);
                document.documentElement.style.setProperty(
                    "--navbar-height",
                    `${NAVBAR_HEIGHT_COMPACT}px`
                );
                return;
            }

            const transparentSurface =
                document.querySelector("[data-navbar-transparent]") ||
                document.querySelector(".hero");

            if (!transparentSurface) {
                const scrolled = window.scrollY > 24;
                setIsScrolled(scrolled);
                document.documentElement.style.setProperty(
                    "--navbar-height",
                    scrolled ? `${NAVBAR_HEIGHT_COMPACT}px` : `${NAVBAR_HEIGHT}px`
                );
                return;
            }

            const surfaceBottom = transparentSurface.getBoundingClientRect().bottom;
            const scrolled = surfaceBottom <= NAVBAR_HEIGHT_COMPACT;
            setIsScrolled(scrolled);
            document.documentElement.style.setProperty(
                "--navbar-height",
                scrolled ? `${NAVBAR_HEIGHT_COMPACT}px` : `${NAVBAR_HEIGHT}px`
            );
        };

        lastScrollYRef.current = window.scrollY;
        handleScrollState();

        window.addEventListener("scroll", handleScrollState, { passive: true });
        window.addEventListener("resize", handleScrollState);

        return () => {
            window.removeEventListener("scroll", handleScrollState);
            window.removeEventListener("resize", handleScrollState);
        };
    }, [isMenuOpen, isProductsMenuOpen, location.pathname]);

    useEffect(() => {
        if (!isMenuOpen && !isProductsMenuOpen) {
            return undefined;
        }

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsMenuOpen(false);
                setIsProductsMenuOpen(false);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => window.removeEventListener("keydown", handleEscape);
    }, [isMenuOpen, isProductsMenuOpen]);

    useEffect(() => {
        if (!isProductsMenuOpen) {
            return undefined;
        }

        const handleOutsideClick = (event) => {
            if (!productsMenuRef.current?.contains(event.target)) {
                setIsProductsMenuOpen(false);
            }
        };

        document.addEventListener("pointerdown", handleOutsideClick);

        return () => document.removeEventListener("pointerdown", handleOutsideClick);
    }, [isProductsMenuOpen]);

    useEffect(() => () => {
        window.clearTimeout(closeProductsTimerRef.current);
    }, []);

    const openProductsMenu = () => {
        window.clearTimeout(closeProductsTimerRef.current);
        setIsProductsMenuOpen(true);
        setActiveCategoryIndex((currentIndex) =>
            navigation[currentIndex] ? currentIndex : 0
        );
    };

    const closeProductsMenuWithDelay = () => {
        window.clearTimeout(closeProductsTimerRef.current);

        closeProductsTimerRef.current = window.setTimeout(() => {
            setIsProductsMenuOpen(false);
        }, 120);
    };

    const closeProductsMenu = () => {
        window.clearTimeout(closeProductsTimerRef.current);
        setIsProductsMenuOpen(false);
    };

    const navbarClassName = [
        "site-navbar",
        isScrolled || isMenuOpen || isProductsMenuOpen ? "site-navbar--scrolled" : "site-navbar--hero",
        isMenuOpen ? "site-navbar--open" : "",
        isProductsMenuOpen ? "site-navbar--products-open" : "",
        isNavbarHidden ? "site-navbar--hidden" : "",
    ].filter(Boolean).join(" ");

    return (
        <motion.header
            className={navbarClassName}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: "easeOut" }}
            ref={productsMenuRef}
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
                        {navLinks.map((link) => {
                            if (link.label === "Products") {
                                return (
                                    <li
                                        className="site-navbar__products-item"
                                        key={link.label}
                                        onMouseEnter={openProductsMenu}
                                        onMouseLeave={closeProductsMenuWithDelay}
                                    >
                                        <button
                                            className="site-navbar__link site-navbar__products-trigger"
                                            type="button"
                                            aria-expanded={isProductsMenuOpen}
                                            aria-controls="products-mega-menu"
                                            onClick={() => {
                                                setIsProductsMenuOpen((current) => !current);
                                                setActiveCategoryIndex((currentIndex) =>
                                                    navigation[currentIndex] ? currentIndex : 0
                                                );
                                            }}
                                        >
                                            {link.label}
                                        </button>
                                    </li>
                                );
                            }

                            return (
                                <li key={link.label}>
                                    <Link className="site-navbar__link" to={link.href}>
                                        {link.label}
                                    </Link>
                                </li>
                            );
                        })}

                        <li>
                            <ThemeToggle className="site-navbar__theme-toggle" />
                        </li>
                    </ul>

                    <div className="site-navbar__actions">
                        <ThemeToggle className="site-navbar__theme-toggle site-navbar__theme-toggle--mobile" />

                        <button
                            className="site-navbar__toggle"
                            type="button"
                            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={isMenuOpen}
                            aria-controls="mobile-nav-drawer"
                            onClick={() => setIsMenuOpen((current) => !current)}
                        >
                            <span />
                            <span />
                        </button>
                    </div>
                </nav>
            </div>

            <div
                className="products-mega-menu"
                id="products-mega-menu"
                aria-hidden={!isProductsMenuOpen}
                onMouseEnter={openProductsMenu}
                onMouseLeave={closeProductsMenuWithDelay}
            >
                <div className="container">
                    <div className="products-mega-menu__inner">
                        <section className="products-mega-menu__column products-mega-menu__column--categories" aria-labelledby="products-mega-menu-categories">
                            <h2 id="products-mega-menu-categories">Categories</h2>

                            <ul className="products-mega-menu__categories">
                                {navigation.map((category, index) => (
                                    <li key={category.slug}>
                                        <button
                                            className={index === activeCategoryIndex ? "is-active" : undefined}
                                            type="button"
                                            onClick={() => setActiveCategoryIndex(index)}
                                            onMouseEnter={() => setActiveCategoryIndex(index)}
                                        >
                                            <span>{category.category}</span>
                                            <span className="products-mega-menu__chevron" aria-hidden="true" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="products-mega-menu__column products-mega-menu__column--subcategories" aria-labelledby="products-mega-menu-subcategories">
                            <h2 id="products-mega-menu-subcategories">Subcategories</h2>

                            <ul className="products-mega-menu__subcategories">
                                {activeCategory?.subcategories.map((subcategory) => (
                                    <li key={subcategory.slug}>
                                        <Link to={subcategory.slug} onClick={closeProductsMenu}>
                                            {subcategory.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="products-mega-menu__column products-mega-menu__column--content" aria-labelledby="products-mega-menu-content">
                            <h2 id="products-mega-menu-content">About This Category</h2>
                            <p>{activeCategory?.category}</p>
                            <span>
                                {activeCategory?.subcategories.length} product families available.
                            </span>
                        </section>
                    </div>
                </div>
            </div>

            <MobileNavDrawer
                isOpen={isMenuOpen}
                logoSrc={logo}
                navLinks={navLinks}
                onClose={() => setIsMenuOpen(false)}
            />
        </motion.header>
    );
}
