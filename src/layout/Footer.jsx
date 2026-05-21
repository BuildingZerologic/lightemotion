import { motion } from "framer-motion";

import logo from "../assets/brand/light-emotion-logo.png";
import { imageReveal } from "../utils/motion";

import "./Footer.scss";

const footerColumns = [
    {
        title: "Products",
        links: [
            "Industrial Lighting",
            "Ceiling Lighting",
            "Decorative Lighting",
            "Outdoor Lighting",
            "Track Lighting",
            "Linear Lighting",
            "Panel Lighting"
         ],
    },
    {
        title: "Information",
        links: [
            "Homepage",
            "Catalog",
            "Services",
            "About",
            "Privacy Policy",
            "Terms & Conditions",
        ],
    },
    {
        title: "Social Media",
        links: [
            "Facebook",
            "Instagram",
            "Pinterest",
            "LinkedIn",
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
                                        <li key={link}>
                                            <a className="site-footer__link" href="/">
                                                {link}
                                            </a>
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

                        <motion.button
                            className="btn-secondary"
                            type="button"
                            variants={itemReveal}
                        >
                            Let's Connect
                        </motion.button>

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
