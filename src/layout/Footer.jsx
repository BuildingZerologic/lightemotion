import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import logo from "../assets/brand/light-emotion-logo.png";
import { editorialCollections } from "../data/editorialCollections";

import {
    revealFooterLogo,
    revealSection,
    staggerContainer,
    staggerFast,
    viewport,
} from "../utils/motion";

import "./Footer.scss";

const footerColumns = [
    {
        title: "Products",
        links: editorialCollections.map((collection) => ({
            label: collection.title,
            to: `/collections/${collection.slug}`,
        })),
    },
    {
        title: "Information",
        links: [
            { label: "Home", to: "/" },
            { label: "Services", to: "/services" },
            {label: "Projects", to: "/projects"},
            { label: "About", to: "/about" },
            { label: "Contact", to: "/contact" },
        ],
    },

    {
        title: "Social Media",
        links: [
            { label: "Instagram", to: "https://www.instagram.com/lightemotion.in" },
            { label: "Linkedin", to: "https://www.linkedin.com/company/light-emotion/" },
            { label: "Facebook", to: "https://www.facebook.com/share/1BJ1DANrvE/" },
        ],
    },
];

export default function Footer() {
    return (
        <motion.footer
            className="site-footer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={staggerContainer}
        >
            <div className="container">

                <div className="site-footer__top">
                    <div>
                        <motion.p className="site-footer__intro" variants={revealSection}>
                            We craft architectural lighting experiences that enhance spaces, shape atmosphere, and elevate the way people live, work, and connect. Thoughtfully designed for hospitality, retail, commercial, and luxury residential environments.
                        </motion.p>

                        <motion.div className="footer-contact" variants={revealSection}>
                            <Link to="/contact" className="btn-secondary">
                                Let's Connect
                            </Link>
                        </motion.div>
                    </div>

                    <motion.div
                        className="site-footer__nav-grid"
                        variants={staggerFast}
                    >
                        {footerColumns.map((column) => (
                            <motion.nav
                                className="site-footer__nav"
                                aria-label={column.title}
                                key={column.title}
                                variants={revealSection}
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
                    <motion.div
                        className="site-footer__contact-wrap"
                        variants={revealSection}
                    >
                        <address className="site-footer__contact">
                            <p className="site-footer__contact-phones">
                                <span>Ph.No.:</span>{" "}
                                <a href="tel:+919999848200">9999848200</a>{" | "}
                                <a href="tel:+919891233340">9891233340</a>{" | "}
                                <a href="tel:+919899616500">9899616500</a>{" | "}
                                <a href="tel:+919811039947">9811039947</a>
                            </p>
                            <p>
                                <span>Email:</span>{" "}
                                <a href="mailto:info@lightemotion.in">info@lightemotion.in</a>
                            </p>
                            <p>
                                <span>Address:</span>{" "}
                                E-3/14, Basement, Bodhi Marg, DLF Phase-1, Gurugram - 122002, INDIA
                            </p>
                        </address>
                    </motion.div>

                    <motion.a
                        className="site-footer__brand"
                        href="/"
                        aria-label="Light Emotion homepage"
                        variants={revealFooterLogo}
                    >
                        <img
                            src={logo}
                            alt="Light Emotion"
                            width="4228"
                            height="833"
                            loading="lazy"
                            decoding="async"
                        />
                    </motion.a>

                </div>

                <motion.div className="site-footer__legal" variants={revealSection}>

                    <p>
                        &copy; LightEmotion 2026. All rights reserved.
                    </p>

                </motion.div>

            </div>
        </motion.footer>
    );
}
