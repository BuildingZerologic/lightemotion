import { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import { navigation } from "../data/navigation";

import "./MobileNavDrawer.scss";

export default function MobileNavDrawer({
    isOpen,
    logoSrc,
    navLinks,
    onClose,
}) {
    const [isProductsOpen, setIsProductsOpen] = useState(false);

    const productSubcategories = useMemo(
        () => navigation.flatMap((category) => category.subcategories),
        []
    );

    useEffect(() => {
        if (!isOpen) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            return undefined;
        }

        const frame = window.requestAnimationFrame(() => {
            setIsProductsOpen(false);
        });

        return () => window.cancelAnimationFrame(frame);
    }, [isOpen]);

    const handleClose = () => {
        setIsProductsOpen(false);
        onClose();
    };

    return (
        <div
            className={`mobile-nav-drawer${isOpen ? " is-open" : ""}`}
            id="mobile-nav-drawer"
            aria-hidden={!isOpen}
        >
            <div className="mobile-nav-drawer__header">
                <Link
                    className="mobile-nav-drawer__brand"
                    to="/"
                    aria-label="Light Emotion homepage"
                    onClick={handleClose}
                >
                    <img src={logoSrc} alt="Light Emotion" />
                </Link>

                <button
                    className="mobile-nav-drawer__close"
                    type="button"
                    aria-label="Close navigation menu"
                    onClick={handleClose}
                >
                    <span aria-hidden="true" />
                </button>
            </div>

            <nav className="mobile-nav-drawer__nav" aria-label="Mobile navigation">
                <ul className="mobile-nav-drawer__links">
                    {navLinks.map((link) => {
                        if (link.label === "Products") {
                            return (
                                <li className="mobile-nav-drawer__item" key={link.label}>
                                    <button
                                        className="mobile-nav-drawer__link mobile-nav-drawer__products-trigger"
                                        type="button"
                                        aria-expanded={isProductsOpen}
                                        aria-controls="mobile-products-subcategories"
                                        onClick={() => setIsProductsOpen((current) => !current)}
                                    >
                                        <span>{link.label}</span>
                                        <span className="mobile-nav-drawer__indicator" aria-hidden="true" />
                                    </button>

                                    <div
                                        className="mobile-nav-drawer__products"
                                        id="mobile-products-subcategories"
                                        aria-hidden={!isProductsOpen}
                                    >
                                        <div>
                                            <ul>
                                                {productSubcategories.map((subcategory) => (
                                                    <li key={subcategory.slug}>
                                                        <Link to={subcategory.slug} onClick={handleClose}>
                                                            {subcategory.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            );
                        }

                        return (
                            <li className="mobile-nav-drawer__item" key={link.label}>
                                <Link
                                    className="mobile-nav-drawer__link"
                                    to={link.href}
                                    onClick={handleClose}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
}
