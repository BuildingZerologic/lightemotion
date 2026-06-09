import { useMemo } from "react";

import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

import { getSubcategoryPageData } from "../data/subcategoryProducts";
import {
    EASE,
    revealCard,
    revealParagraph,
    revealSection,
    staggerContainer,
    viewportLow,
} from "../utils/motion";
import { resolveImageFallback } from "../utils/productImages";

import ErrorPage from "./ErrorPage";

import "./Subcategory.scss";

export default function Subcategory() {
    const { slug, subcategorySlug } = useParams();
    const routeSlug = subcategorySlug || slug || "";
    const pageData = useMemo(
        () => getSubcategoryPageData(routeSlug),
        [routeSlug]
    );

    if (!pageData.isValid) {
        return (
            <ErrorPage
                title="Product category not found"
                message="This product category is unavailable or may have been renamed."
            />
        );
    }

    return (
        <div className="subcategory-page" key={routeSlug}>
            <motion.section
                className="subcategory-hero"
                data-navbar-transparent
                aria-label={`${pageData.title} hero`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
            >
                {pageData.heroMedia?.src && (
                    <motion.img
                        key={pageData.heroMedia.src}
                        src={pageData.heroMedia.src}
                        alt=""
                        aria-hidden="true"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        onError={(event) => {
                            resolveImageFallback(event, pageData.heroMedia.fallbackSources);
                        }}
                        initial={{ opacity: 0, scale: 1.04 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.12 }}
                        transition={{
                            duration: 0.9,
                            ease: EASE,
                        }}
                    />
                )}

                <div className="subcategory-hero__overlay" aria-hidden="true" />

                <motion.h3
                    className="subcategory-hero__heading"
                    id="subcategory-title"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.12 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.4,
                        ease: EASE,
                    }}
                >
                    {pageData.title}
                </motion.h3>
            </motion.section>

            <motion.section
                className="subcategory"
                aria-labelledby="subcategory-title"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={revealSection}
            >
                <div className="container">
                    {pageData.description && (
                        <motion.p
                            className="subcategory__description"
                            key={`${routeSlug}-desc`}
                            variants={revealParagraph}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            {pageData.description}
                        </motion.p>
                    )}

                    {pageData.decorativeProducts !== null ? (
                        /* ── Decorative image-card grid ── */
                        pageData.decorativeProducts.length === 0 ? (
                            <motion.p
                                className="subcategory__coming-soon"
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.5 }}
                                transition={{ duration: 0.7, ease: EASE }}
                            >
                                Products coming soon.
                            </motion.p>
                        ) : (
                            <motion.div
                                className="subcategory__grid"
                                key={`${routeSlug}-decorative-grid`}
                                initial="hidden"
                                whileInView="visible"
                                viewport={viewportLow}
                                variants={staggerContainer}
                            >
                                {pageData.decorativeProducts.map((product) => (
                                    <motion.article
                                        className="subcategory-card subcategory-card--decorative"
                                        key={product.slug}
                                        variants={revealCard}
                                    >
                                        <div className="subcategory-card__media">
                                            <img
                                                className="subcategory-card__image subcategory-card__image--default"
                                                src={product.image.src}
                                                alt={product.name}
                                                loading="lazy"
                                                decoding="async"
                                                onError={(event) => {
                                                    resolveImageFallback(event, product.image.fallbackSources);
                                                }}
                                            />
                                        </div>

                                        <div className="subcategory-card__content">
                                            <h2 className="subcategory-card__name">
                                                {product.name}
                                            </h2>
                                        </div>
                                    </motion.article>
                                ))}
                            </motion.div>
                        )
                    ) : (
                        /* ── Standard product-family card grid ── */
                        <motion.div
                            className="subcategory__grid"
                            key={`${routeSlug}-grid`}
                            initial="hidden"
                            whileInView="visible"
                            viewport={viewportLow}
                            variants={staggerContainer}
                        >
                            {pageData.productFamilies.map((family) => (
                                <motion.article
                                    className="subcategory-card"
                                    key={`${routeSlug}-${family.slug}`}
                                    variants={revealCard}
                                >
                                    <Link
                                        className="subcategory-card__link"
                                        to={`/products/${family.slug}`}
                                        aria-label={`View ${family.name}`}
                                    >
                                        <div className="subcategory-card__media">
                                            {family.image?.src && (
                                                <img
                                                    className="subcategory-card__image subcategory-card__image--default"
                                                    src={family.image.src}
                                                    alt={`${family.name} product family`}
                                                    loading="lazy"
                                                    decoding="async"
                                                    onError={(event) => {
                                                        resolveImageFallback(event, family.image.fallbackSources);
                                                    }}
                                                />
                                            )}

                                        </div>

                                        <div className="subcategory-card__content">
                                            <h2 className="subcategory-card__name">
                                                {family.name}
                                            </h2>

                                            <p className="subcategory-card__count">
                                                {family.variantsCount} Variants
                                            </p>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </motion.div>
                    )}
                </div>
            </motion.section>
        </div>
    );
}
