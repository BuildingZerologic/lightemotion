import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import {
    revealCard,
    revealHeading,
    revealImage,
    staggerContainer,
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
        name: "Entertainment",
        image: "/images/industries/infra.jpg",
    },
    {
        name: "Fitness",
        image: "/images/industries/wellness.jpg",
    },
    {
        name: "Institutional",
        image: "/images/industries/retail.jpg",
    },
    {
        name: "Religious",
        image: "/images/industries/retail.jpg",
    },
];

export default function ServicesIndustries() {
    const featuredIndustry = industries[0];

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
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                        variants={revealImage}
                    >
                        <img
                            src={featuredIndustry.image}
                            alt={`${featuredIndustry.name} lighting environment`}
                            loading="lazy"
                            decoding="async"
                        />
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
                                    <Link
                                        className="services-industries__button"
                                        to={`/projects?category=${encodeURIComponent(industry.name)}`}
                                    >
                                        {industry.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
