import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import logo from "../assets/brand/light-emotion-logo.png";
import { imageReveal } from "../utils/motion";

import "./Footer.scss";

const footerColumns = [
    {
        title: "Products",
        links: [
            { label: "Industrial Lighting", href: "/" },
            { label: "Ceiling Lighting",    href: "/" },
            { label: "Decorative Lighting", href: "/" },
            { label: "Outdoor Lighting",    href: "/" },
            { label: "Track Lighting",      href: "/" },
            { label: "Linear Lighting",     href: "/" },
            { label: "Panel Lighting",      href: "/" },
        ],
    },
    {
        title: "Information",
        links: [
            { label: "Home",               to: "/" },
            { label: "Services",           to: "/services" },
            { label: "About",              to: "/about" },
            { label: "Privacy Policy",     href: "#" },
            { label: "Terms & Conditions", href: "#" },
        ],
    },
    {
        title: "Social Media",
        links: [
            { label: "Facebook",  href: "#" },
            { label: "Instagram", href: "#" },
            { label: "Pinterest", href: "#" },
            { label: "LinkedIn",  href: "#" },
        ],
    },
];

const offices = [
    {
        country: "India",
        lines: [
            "E-3/14, Basement, Bodhi Marg,",
            "DLF Phase-1, Gurugram - 122002",
            "+91 888 888 8888",
        ],
    },
];

const containerReveal = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const itemReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
    },
};

export default function Footer() {
    return (
        <motion.footer
            className="site-footer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={containerReveal}
        >
            <div className="container">

                <div className="site-footer__top">
                    <motion.p className="site-footer__intro" variants={itemReveal}>
                        We craft architectural lighting experiences that enhance spaces, shape atmosphere, and elevate the way people live, work, and connect. Thoughtfully designed for hospitality, retail, commercial, and luxury residential environments.
                    </motion.p>

                    <motion.div
                        className="site-footer__nav-grid"
                        variants={containerReveal}
                    >
                        {footerColumns.map((column) => (
                            <motion.nav
                                className="site-footer__nav"
                                aria-label={column.title}
                                key={column.title}
                                variants={itemReveal}
                            >
                                <h2 className="site-footer__nav-title">
                                    {column.title}
                                </h2>

                                <ul className="site-footer__link-list">
                                    {column.links.map((link) => (
                                        <li key={link.label}>
                                            {link.to ? (
                                                <Link className="site-footer__link" to={link.to}>
                                                    {link.label}
                                                </Link>
                                            ) : (
                                                <a className="site-footer__link" href={link.href}>
                                                    {link.label}
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </motion.nav>
                        ))}
                    </motion.div>
                </div>

                <div className="site-footer__middle">

                    <motion.a
                        className="site-footer__brand"
                        href="/"
                        aria-label="Light Emotion homepage"
                        {...imageReveal}
                    >
                        <img src={logo} alt="Light Emotion" loading="lazy" decoding="async" />
                    </motion.a>

                    <motion.div
                        className="site-footer__right"
                        variants={containerReveal}
                    >

                        <motion.div
                            className="site-footer__offices"
                            variants={containerReveal}
                        >
                            {offices.map((office) => (
                                <motion.address
                                    className="site-footer__office"
                                    key={office.country}
                                    variants={itemReveal}
                                >
                                     

                                    {office.lines.map((line) => (
                                        <p key={line}>
                                            {line}
                                        </p>
                                    ))}
                                </motion.address>
                            ))}
                        </motion.div>

                        <motion.div variants={itemReveal}>
                            <Link to="/contact" className="btn-secondary">
                                Let's Connect
                            </Link>
                        </motion.div>

                    </motion.div>

                </div>

                <motion.div className="site-footer__legal" variants={itemReveal}>
                    <p>
                        &copy; Light Emotion 2026. All rights reserved.
                    </p>

                    {/* <div className="site-footer__legal-links">
                        <a href="/">
                            Privacy Policy
                        </a>

                        <a href="/">
                            Terms & Conditions
                        </a>
                    </div> */}
                </motion.div>

            </div>
        </motion.footer>
    );
}
