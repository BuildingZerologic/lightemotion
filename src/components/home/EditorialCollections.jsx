import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { editorialCollections } from "../../data/editorialCollections";
import { imageRevealVariants } from "../../utils/motion";

import "./EditorialCollections.scss";

// ——————————————————————————————————————————————
// Layout position map
// Drives data-layout attributes for CSS grid placement.
// Cards: 7 total — positions are intentionally asymmetric.
// ——————————————————————————————————————————————

const LAYOUT_POSITIONS = [
    "feature",      // 0 — large landscape, spans left 8 cols × 2 rows
    "side-top",     // 1 — portrait, right column top
    "side-bottom",  // 2 — portrait, right column bottom
    "wide",         // 3 — landscape left, row 3
    "mid-right",    // 4 — portrait, row 3 center-right
    "end-right",    // 5 — portrait, row 3 far right
    "last",         // 6 — full-width landscape cinematic closer
];

// ——————————————————————————————————————————————
// Animation variants
// ——————————————————————————————————————————————

const sectionReveal = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08 },
    },
};

const headerReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
};

// ——————————————————————————————————————————————
// Component
// ——————————————————————————————————————————————

export default function EditorialCollections() {
    return (
        <section
            className="editorial-collections"
            aria-labelledby="editorial-collections-title"
        >
            <div className="container">

                <motion.header
                    className="editorial-collections__header"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                    variants={headerReveal}
                >
                     
                    <h2
                        className="editorial-collections__heading"
                        id="editorial-collections-title"
                    >
                        Light for Every Space
                    </h2>
                </motion.header>

                <motion.div
                    className="editorial-collections__grid"
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.06 }}
                >
                    {editorialCollections.map((collection, index) => (
                        <EditorialCard
                            key={collection.slug}
                            collection={collection}
                            layout={LAYOUT_POSITIONS[index] ?? "standard"}
                        />
                    ))}
                </motion.div>

            </div>
        </section>
    );
}

// ——————————————————————————————————————————————
// Card sub-component
// ——————————————————————————————————————————————

function EditorialCard({ collection, layout }) {
    return (
        <motion.article
            className="editorial-card"
            data-layout={layout}
            variants={imageRevealVariants}
        >
            <Link
                className="editorial-card__link"
                to={`/collections/${collection.slug}`}
                aria-label={`Explore ${collection.title}`}
            >
                <div className="editorial-card__media">
                    <img
                        className="editorial-card__image"
                        src={collection.image}
                        alt={collection.imageAlt}
                        loading="lazy"
                        decoding="async"
                    />

                    <div className="editorial-card__overlay" aria-hidden="true" />
                </div>

                <div className="editorial-card__content">
                    <div className="editorial-card__text">
                        <h3 className="editorial-card__title">
                            {collection.title}
                        </h3>

                        {/* <p className="editorial-card__subtitle">
                            {collection.subtitle}
                        </p> */}
                    </div>

                    <span className="editorial-card__cta" aria-hidden="true">
                        Explore
                        <svg
                            className="editorial-card__arrow"
                            width="14"
                            height="14"
                            viewBox="0 0 16 16"
                            fill="none"
                            aria-hidden="true"
                        >
                            <path
                                d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                </div>
            </Link>
        </motion.article>
    );
}
