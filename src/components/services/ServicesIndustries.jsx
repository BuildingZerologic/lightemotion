import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import {
    EASE,
    revealCard,
    revealHeading,
    revealImage,
    staggerContainer,
    viewport,
} from "../../utils/motion";

import "./ServicesIndustries.scss";

const industries = [
    {
        name: "Residential",
        image: "/images/industries/residential.jpg",
    },
    {
        name: "Hospitality",
        image: "/images/industries/hospitality.jpg",
    },
    {
        name: "Corporate",
        image: "/images/industries/corporate.jpg",
    },
    {
        name: "Infrastructure",
        image: "/images/industries/infra.jpg",
    },
    {
        name: "Wellness",
        image: "/images/industries/wellness.jpg",
    },
    {
        name: "Retail & Food",
        image: "/images/industries/retail.jpg",
    },
];

export default function ServicesIndustries() {
    const [activeIndustry, setActiveIndustry] = useState(industries[0]);

    return (
        <motion.section
            className="services-industries"
            aria-labelledby="services-industries-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            <div className="container">
                <div className="services-industries__grid">
                    <motion.div
                        className="services-industries__image"
                        {...revealImage}
                    >
                        <AnimatePresence mode="sync">
                            <motion.img
                                key={activeIndustry.image}
                                src={activeIndustry.image}
                                alt={`${activeIndustry.name} lighting environment`}
                                loading="lazy"
                                decoding="async"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1}}
                                exit={{ opacity: 0}}
                                transition={{
                                    duration: 0.6,
                                    ease: EASE,
                                }}
                            />
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        className="services-industries__content"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                        variants={staggerContainer}
                    >
                        <motion.h4
                            className="services-industries__label"
                            id="services-industries-title"
                            variants={revealHeading}
                        >
                            Industries We Cover
                        </motion.h4>

                        <motion.ul
                            className="services-industries__list"
                            variants={staggerContainer}
                        >
                            {industries.map((industry) => (
                                <motion.li key={industry.name} variants={revealCard}>
                                    <button
                                        className={
                                            activeIndustry.name === industry.name
                                                ? "services-industries__button services-industries__button--active"
                                                : "services-industries__button"
                                        }
                                        type="button"
                                        onMouseEnter={() => setActiveIndustry(industry)}
                                        onFocus={() => setActiveIndustry(industry)}
                                        onClick={() => setActiveIndustry(industry)}
                                    >
                                        {industry.name}
                                    </button>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
