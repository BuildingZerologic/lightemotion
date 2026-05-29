import { useMemo } from "react";

import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

import { getSubcategoryPageData } from "../data/subcategoryProducts";
import { imageRevealVariants } from "../utils/motion";
import { resolveImageFallback } from "../utils/productImages";

import "./Subcategory.scss";

const gridReveal = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.06,
        },
    },
};

export default function Subcategory() {
    const { slug, subcategorySlug } = useParams();
    const routeSlug = subcategorySlug || slug || "";
    const pageData = useMemo(
        () => getSubcategoryPageData(routeSlug),
        [routeSlug]
    );

    return (
        <div className="subcategory-page" key={routeSlug}>
            <section className="subcategory-hero" data-navbar-transparent aria-label={`${pageData.title} hero`}>
                {pageData.heroMedia?.src && (
                    <motion.img
                        key={pageData.heroMedia.src}
                        src={pageData.heroMedia.src}
                        alt=""
                        aria-hidden="true"
                        onError={(event) => {
                            resolveImageFallback(event, pageData.heroMedia.fallbackSources);
                        }}
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.9,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    />
                )}

                <div className="subcategory-hero__overlay" aria-hidden="true" />

                <motion.h2
                    className="subcategory-hero__heading"
                    id="subcategory-title"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.9,
                        delay: 0.4,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {pageData.title}
                </motion.h2>
            </section>

            <section className="subcategory" aria-labelledby="subcategory-title">
                <div className="container">
                    {pageData.description && (
                        <motion.p
                            className="subcategory__description"
                            key={`${routeSlug}-desc`}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        >
                            {pageData.description}
                        </motion.p>
                    )}

                    <motion.div
                        className="subcategory__grid"
                        key={`${routeSlug}-grid`}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.12 }}
                        variants={gridReveal}
                    >
                        {pageData.productFamilies.map((family) => (
                            <motion.article
                                className="subcategory-card"
                                key={`${routeSlug}-${family.slug}`}
                                variants={imageRevealVariants}
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
                </div>
            </section>
        </div>
    );
}
