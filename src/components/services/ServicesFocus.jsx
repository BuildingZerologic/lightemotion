import { motion } from "framer-motion";

import {
    revealHeading,
    revealParagraph,
    revealSection,
    staggerFast,
    viewport,
} from "../../utils/motion";

import "./ServicesFocus.scss";

export default function ServicesFocus() {
    return (
        <motion.section
            className="services-focus"
            aria-labelledby="services-page-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container">
                <h1 className="services-page__title" id="services-page-title">
                    Light Emotion Services
                </h1>

                <div className="services-focus__grid">
                    <motion.h3
                        className="services-focus__label"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={revealHeading}
                    >
                        Our Focus
                    </motion.h3>

                    <motion.div
                        className="services-focus__content"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.24 }}
                        variants={staggerFast}
                    >
                        <motion.p
                            className="services-focus__statement"
                            variants={revealParagraph}
                        >
                            We blend creativity, technical expertise, and thoughtful design to
                            craft lighting environments that enhance the way spaces look, feel,
                            and function.<br></br>
                            Our approach combines architectural understanding, precision, and
                            innovation to deliver lighting solutions that are both beautiful
                            and purposeful. From concept development to implementation, we
                            collaborate closely with our clients to bring clarity,
                            atmosphere, and vision to every space.
                        </motion.p>

                        <div className="services-focus__support">
                            <motion.p variants={revealParagraph}>

                            </motion.p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
