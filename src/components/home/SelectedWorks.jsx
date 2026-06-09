import { useRef } from "react";

import { Link } from "react-router-dom";

import {
    motion,
    useScroll,
    useTransform,
} from "framer-motion";

import {
    EASE,
    revealHeading,
    revealButton,
    staggerContainer,
    viewportLow,
} from "../../utils/motion";

import "./SelectedWorks.scss";

const introText =
    "We design lighting environments that elevate spaces, enhance experiences, and bring architecture to life through light.";

const imageCardReveal = {
    hidden:  { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const projects = [
    {
        category: "Corporate",
        title: "Google Office",
        location: "Gurugram",
        image: "/google-gurugram.jpg",
        alt: "Google office interior illuminated with precision architectural lighting",
    },
    {
        category: "Corporate",
        title: "HSBC",
        location: "Vadodara, Indore, Mumbai, Pune",
        image: "/hsbchome.webp",
        alt: "HSBC banking interior with refined ambient and task lighting design",
    },
    {
        category: "Residential Luxury",
        title: "DLF The Camellias",
        location: "Gurugram",
        image: "/dlfhome.webp",
        alt: "DLF The Camellias luxury residential lobby with bespoke architectural lighting",
    },
];

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
        <motion.section
            className="selected-works"
            aria-labelledby="selected-works-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
        >

            <div className="container">

                <div className="selected-works__intro">
                    <motion.h3
                        className="selected-works__heading"
                        id="selected-works-title"
                        variants={revealHeading}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        Selected Works
                    </motion.h3>

                    <motion.div
                        className="selected-works__statement"
                        ref={statementRef}
                        variants={revealHeading}
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
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportLow}
                >
                    {projects.map((project) => (
                        <article
                            className="selected-works__project"
                            key={project.title}
                        >
                            <Link
                                to="/projects"
                                className="selected-works__card-link"
                                aria-label={`View ${project.title} on the Projects page`}
                            >
                                <motion.div
                                    className="selected-works__image-wrap"
                                    variants={imageCardReveal}
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

                                <h5 className="selected-works__title">
                                    {project.title}
                                </h5>

                                <p className="selected-works__location">
                                    {project.location}
                                </p>
                            </Link>
                        </article>
                    ))}
                </motion.div>

                <motion.div
                    className="selected-works__action"
                    variants={revealButton}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <Link to="/projects" className="btn-secondary">
                        View All Projects
                    </Link>
                </motion.div>

            </div>

        </motion.section>
    );
}
