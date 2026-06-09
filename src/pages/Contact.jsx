import { useState } from "react";

import { motion } from "framer-motion";

import {
    revealHeading,
    revealSection,
    staggerFast,
    viewport,
} from "../utils/motion";

import "./Contact.scss";

const MAP_QUERY = "E-3/14+Basement+Bodhi+Marg+DLF+Phase-1+Gurugram+122002";
const MAP_EMBED_SRC = `https://maps.google.com/maps?q=${MAP_QUERY}&output=embed&z=16`;
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

export default function Contact() {
    const [submitNotice, setSubmitNotice] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        setSubmitNotice(
            "This frontend-only form is not connected to message delivery yet. No message was sent."
        );
    };

    return (
        <div className="contact-page" data-navbar-solid>
            <motion.section
                className="contact"
                aria-labelledby="contact-title"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={staggerFast}
            >
                <motion.div 
                    className="contact__container"
                    variants={staggerFast}
                >
                    <motion.header className="contact__header" variants={revealHeading}>
                        <h3 className="contact__title" id="contact-title">
                            Let's Connect
                        </h3>
                        <p className="contact__description">
                            Have a question, project in mind, or need more information?
                            Fill out the form and our team will get back to you 
                            as soon as possible.
                        </p>
                    </motion.header>

                    <div className="contact__layout">
                        <motion.section className="contact__map-panel" variants={revealSection}>
                            <a
                                href={MAP_LINK}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact__map-link"
                                aria-label="Open office location in Google Maps"
                            >
                                <iframe
                                    className="contact__map"
                                    src={MAP_EMBED_SRC}
                                    title="Light Emotion office location"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    allowFullScreen
                                />
                            </a>

                            <address className="contact__details">
                                <p className="contact__contact-phones">
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
                            </address>
                        </motion.section>

                        <motion.form
                            className="contact__form"
                            variants={revealSection}
                            onSubmit={handleSubmit}
                            aria-describedby={submitNotice ? "contact-submit-note" : undefined}
                        >
                            <h5 className="contact__section-title contact__section-title--form">
                                Contact Form
                            </h5>

                            <div className="contact__field">
                                <label htmlFor="name" className="contact__label">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="contact__input"
                                    placeholder="Your full name"
                                    required
                                />
                            </div>

                            <div className="contact__field">
                                <label htmlFor="email" className="contact__label">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="contact__input"
                                    placeholder="Your email address"
                                    required
                                />
                            </div>

                            <div className="contact__field">
                                <label htmlFor="phone" className="contact__label">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    className="contact__input"
                                    placeholder="Your phone number"
                                />
                            </div>

                            <div className="contact__field">
                                <label htmlFor="message" className="contact__label">Message</label>
                                <textarea
                                    id="message"
                                    className="contact__input contact__textarea"
                                    placeholder="How can we help you?"
                                    rows="6"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn-primary">
                                Submit
                            </button>

                            {submitNotice && (
                                <p
                                    className="contact__submit-note"
                                    id="contact-submit-note"
                                    role="status"
                                >
                                    {submitNotice}
                                </p>
                            )}
                        </motion.form>
                    </div>
                </motion.div>
            </motion.section>
        </div>
    );
}
