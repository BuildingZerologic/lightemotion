import { motion, useReducedMotion } from "framer-motion";

import "./HowWeWork.scss";

const processItems = [
    {
        number: "01",
        title: "We study your space.",
        description:
            "Every luxury home or commercial space has a story. We start by analyzing your architectural drawings, measuring spatial volumes, and mapping out the natural daylight. We define exactly where the light should fall and where the shadows should sit to create the perfect mood.",
    },
    {
        number: "02",
        title: "We engineer the details.",
        description:
            "Pure artistry requires technical discipline. Our team calculates the exact beam angles, light intensity, and color accuracy needed for every corner. We then specify precise architectural fixtures and custom linear profiles to match your space perfectly.",
    },
    {
        number: "03",
        title: "We automate the mood.",
        description:
            "Light should adapt to your day. We design smart systems that control your entire lighting ecosystem, from soft morning glows to dramatic evening settings, with intuitive scenes that transition seamlessly at the touch of a button or voice command.",
    },
    {
        number: "04",
        title: "We guide the execution.",
        description:
            "A premium design is nothing without flawless execution. We deliver detailed technical layouts, wiring diagrams, and fixture schedules directly to your site team, staying aligned with contractors and engineers until the final setup matches the vision down to the millimeter.",
    },
];

const ease = [0.22, 1, 0.36, 1];

export default function HowWeWork() {
    const shouldReduceMotion = useReducedMotion();

    const introReveal = {
        hidden: {
            opacity: 0,
            y: shouldReduceMotion ? 0 : 28,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: shouldReduceMotion ? 0.01 : 0.8,
                ease,
            },
        },
    };

    const processReveal = {
        hidden: {},
        visible: {
            transition: {
                delayChildren: shouldReduceMotion ? 0 : 0.85,
                staggerChildren: shouldReduceMotion ? 0 : 0.18,
            },
        },
    };

    const itemReveal = {
        hidden: {
            opacity: 0,
            y: shouldReduceMotion ? 0 : 24,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: shouldReduceMotion ? 0.01 : 0.68,
                ease,
            },
        },
    };

    return (
        <section className="how-work" aria-labelledby="how-work-title">
            <div className="container">
                <motion.div
                    className="how-work__grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <motion.div
                        className="how-work__intro"
                        variants={introReveal}
                    >
                        <p className="how-work__eyebrow">How We Work</p>

                        <h2
                            className="how-work__heading"
                            id="how-work-title"
                        >
                            From blueprint
                            <br />
                            to beautiful reality.
                        </h2>
                    </motion.div>

                    <motion.div
                        className="how-work__process"
                        variants={processReveal}
                    >
                        {processItems.map((item) => (
                            <motion.article
                                className="how-work__item"
                                key={item.number}
                                variants={itemReveal}
                            >
                                <p
                                    className="how-work__number"
                                    aria-hidden="true"
                                >
                                    {item.number}
                                </p>

                                <div className="how-work__content">
                                    <h3
                                        className="how-work__item-title"
                                    >
                                        {item.title}
                                    </h3>

                                    <p className="how-work__description">
                                        {item.description}
                                    </p>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
