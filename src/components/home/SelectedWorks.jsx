import { useRef } from "react";

import { Link } from "react-router-dom";

import {
    motion,
    useScroll,
    useTransform,
} from "framer-motion";

import azureBayResort from "../../assets/selected-works/azure-bay-resort.jpg";
import mysaCocktailBar from "../../assets/selected-works/mysa-cocktail-bar.jpg";
import theUpperHouse from "../../assets/selected-works/the-upper-house.jpg";

import { imageReveal } from "../../utils/motion";

import "./SelectedWorks.scss";

const introText =
    "We design lighting environments that elevate spaces, enhance experiences, and bring architecture to life through light.";

const projects = [
    {
        category: "Hospitality",
        title: "Azure Bay Resort",
        image: azureBayResort,
        alt: "Coastal resort lounge illuminated with warm architectural lighting and woven pendants",
    },
    {
        category: "Hospitality",
        title: "Mysa Cocktail Bar",
        image: mysaCocktailBar,
        alt: "Moody cocktail bar interior with pendant lights and backlit bottle shelving",
    },
    {
        category: "Hospitality",
        title: "The Upper House",
        image: theUpperHouse,
        alt: "Luxury resort exterior at blue hour with poolside architectural lighting",
    },
];

const reveal = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8 },
    },
};

const gridReveal = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.14,
        },
    },
};

export default function SelectedWorks() {
    const statementRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: statementRef,
         offset: ["start 95%", "end 80%"],
    });

    const revealClipPath = useTransform(
        scrollYProgress,
        [0, 1],
        ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
    );

    return (
        <section className="selected-works" aria-labelledby="selected-works-title">

            <div className="container">

                <div className="selected-works__intro">
                    <motion.h2
                        className="selected-works__heading"
                        id="selected-works-title"
                        variants={reveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        Selected Works
                    </motion.h2>

                    <motion.div
                        className="selected-works__statement"
                        ref={statementRef}
                        variants={reveal}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.35 }}
                    >
                        <p className="selected-works__statement-base">
                            {introText}
                        </p>

                        <motion.p
                            className="selected-works__statement-fill"
                            aria-hidden="true"
                            style={{
                                clipPath: revealClipPath,
                                WebkitClipPath: revealClipPath,
                            }}
                        >
                            {introText}
                        </motion.p>
                    </motion.div>
                </div>

                <motion.div
                    className="selected-works__grid"
                    variants={gridReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.16 }}
                >
                    {projects.map((project) => (
                        <article
                            className="selected-works__project"
                            key={project.title}
                        >
                            <motion.div
                                className="selected-works__image-wrap"
                                {...imageReveal}
                            >
                                <img
                                    className="selected-works__image"
                                    src={project.image}
                                    alt={project.alt}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </motion.div>

                            <p className="selected-works__category">
                                {project.category}
                            </p>

                            <h3 className="selected-works__title">
                                {project.title}
                            </h3>
                        </article>
                    ))}
                </motion.div>

                <motion.div
                    className="selected-works__action"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8 }}
                >
                    <Link to="/services" className="btn-secondary">
                        Discover More
                    </Link>
                </motion.div>

            </div>

        </section>
    );
}
