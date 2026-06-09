import { useMemo } from "react";

import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

import { getCollectionBySlug } from "../data/editorialCollections";
import { getCollectionPageData } from "../data/collectionProducts";
import {
    EASE,
    revealCard,
    revealHeading,
    revealParagraph,
    revealSection,
    staggerContainer,
    viewportLow,
} from "../utils/motion";
import { resolveImageFallback } from "../utils/productImages";

import "./Collection.scss";

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
            <motion.section
                className="collection-hero"
                data-navbar-transparent
                aria-label={`${collection.title} collection hero`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
            >
                <motion.img
                    className="collection-hero__image"
                    src={collection.image}
                    alt={collection.imageAlt}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    initial={{ opacity: 0, scale: 1.04 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{ duration: 1, ease: EASE }}
                />

                <div className="collection-hero__overlay" aria-hidden="true" />

                <motion.h3
                    className="collection-hero__title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.4,
                        ease: EASE,
                    }}
                >
                    {collection.title}
                </motion.h3>
            </motion.section>

            {/* ——— PRODUCT GROUPS ——— */}
            <motion.section
                className="collection-body"
                aria-label={`${collection.title} products`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={revealSection}
            >
                <div className="container">

                    {collection.description && (
                        <motion.p
                            className="collection-body__description"
                            variants={revealParagraph}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
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
            </motion.section>

        </div>
    );
}

// ——————————————————————————————————————————————
// Group sub-component
// ——————————————————————————————————————————————

function CollectionGroup({ group }) {
    return (
        <motion.div
            className="collection-group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            variants={revealSection}
        >

            {/* Group heading */}
            <motion.header
                className="collection-group__header"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={revealHeading}
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
                viewport={viewportLow}
                variants={staggerContainer}
            >
                {group.productFamilies.map((family) => (
                    <motion.article
                        className="collection-card"
                        key={family.slug}
                        variants={revealCard}
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

        </motion.div>
    );
}
