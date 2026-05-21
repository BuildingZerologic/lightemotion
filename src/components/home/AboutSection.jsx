import "./AboutSection.scss";
import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <section className="about-section">
            <div className="container">
                <div className="about-section__content">

                    <motion.span
                        className="about-section__eyebrow"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.8 }}
                    >
                        Who We Are
                    </motion.span>

                    <motion.p
                        className="about-section__description"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                    >
                        We create architectural lighting environments that bring atmosphere, materiality, and emotion into harmony.
                        Each lighting solution is thoughtfully designed to complement modern architecture with clarity, precision, and purpose.
                        Designed with intention, built to elevate how spaces are experienced and remembered.
                    </motion.p>

                </div>
            </div>
        </section>
    );
}