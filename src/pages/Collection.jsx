import { useMemo } from "react";

import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

import { getCollectionBySlug } from "../data/editorialCollections";
import { getCollectionPageData } from "../data/collectionProducts";
import { imageRevealVariants } from "../utils/motion";
import { resolveImageFallback } from "../utils/productImages";

import "./Collection.scss";

// ——————————————————————————————————————————————
// Animation variants
// ——————————————————————————————————————————————

const gridReveal = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.06 },
    },
};

const headerReveal = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

// ——————————————————————————————————————————————
// Page
// ——————————————————————————————————————————————

export default function Collection() {
    const { collectionSlug } = useParams();

    const collection = useMemo(
        () => getCollectionBySlug(collectionSlug),
        [collectionSlug]
    );

    const groups = useMemo(() => {
        if (!collection) return [];
        return getCollectionPageData(collection.subcategorySlugs);
    }, [collection]);

    // Guard: unknown collection slug
    if (!collection) {
        return (
            <div className="collection-page collection-page--not-found">
                <div className="container">
                    <h1 className="collection__not-found-title">
                        Collection not found
                    </h1>
                    <Link to="/" className="collection__back-link">
                        ← Back to home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="collection-page" key={collectionSlug}>

            {/* ——— HERO BANNER ——— */}
            <section
                className="collection-hero"
                data-navbar-transparent
                aria-label={`${collection.title} collection hero`}
            >
                <motion.img
                    className="collection-hero__image"
                    src={collection.image}
                    alt={collection.imageAlt}
                    initial={{ opacity: 0, scale: 1.025 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                />

                <div className="collection-hero__overlay" aria-hidden="true" />

                <motion.h1
                    className="collection-hero__title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.9,
                        delay: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {collection.title}
                </motion.h1>
            </section>

            {/* ——— PRODUCT GROUPS ——— */}
            <section
                className="collection-body"
                aria-label={`${collection.title} products`}
            >
                <div className="container">

                    {collection.description && (
                        <motion.p
                            className="collection-body__description"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {collection.description}
                        </motion.p>
                    )}

                    {groups.length === 0 ? (
                        <p className="collection__empty">
                            Products coming soon.
                        </p>
                    ) : (
                        groups.map((group) => (
                            <CollectionGroup
                                key={group.subcategorySlug}
                                group={group}
                            />
                        ))
                    )}

                </div>
            </section>

        </div>
    );
}

// ——————————————————————————————————————————————
// Group sub-component
// ——————————————————————————————————————————————

function CollectionGroup({ group }) {
    return (
        <div className="collection-group">

            {/* Group heading */}
            <motion.header
                className="collection-group__header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={headerReveal}
            >
                <h2 className="collection-group__title">
                    {group.subcategoryTitle}
                </h2>
            </motion.header>

            {/* Product family cards */}
            <motion.div
                className="collection-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={gridReveal}
            >
                {group.productFamilies.map((family) => (
                    <motion.article
                        className="collection-card"
                        key={family.slug}
                        variants={imageRevealVariants}
                    >
                        <Link
                            className="collection-card__link"
                            to={`/products/${family.slug}`}
                            aria-label={`View ${family.name}`}
                        >
                            {/* Image */}
                            <div className="collection-card__media">
                                {family.image?.src && (
                                    <img
                                        className="collection-card__image collection-card__image--default"
                                        src={family.image.src}
                                        alt={`${family.name} product family`}
                                        loading="lazy"
                                        decoding="async"
                                        onError={(e) =>
                                            resolveImageFallback(
                                                e,
                                                family.image.fallbackSources
                                            )
                                        }
                                    />
                                )}


                            </div>

                            {/* Info */}
                            <div className="collection-card__content">
                                <h3 className="collection-card__name">
                                    {family.name}
                                </h3>

                                {family.variantsCount > 0 && (
                                    <p className="collection-card__count">
                                        {family.variantsCount} Variants
                                    </p>
                                )}
                            </div>
                        </Link>
                    </motion.article>
                ))}
            </motion.div>

        </div>
    );
}
