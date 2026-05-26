import { useEffect, useMemo, useState } from "react";

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

function useDesktopHoverMedia() {
    const [canUseHoverMedia, setCanUseHoverMedia] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");

        const updateHoverMedia = () => {
            setCanUseHoverMedia(mediaQuery.matches);
        };

        updateHoverMedia();
        mediaQuery.addEventListener("change", updateHoverMedia);

        return () => {
            mediaQuery.removeEventListener("change", updateHoverMedia);
        };
    }, []);

    return canUseHoverMedia;
}

export default function Subcategory() {
    const { slug, subcategorySlug } = useParams();
    const canUseHoverMedia = useDesktopHoverMedia();
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
            </section>

            <section className="subcategory" aria-labelledby="subcategory-title">
                <div className="container">
                    <motion.header
                        className="subcategory__header"
                        key={`${routeSlug}-header`}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.35 }}
                        variants={imageRevealVariants}
                    >
                        <h1 className="subcategory__title" id="subcategory-title">
                            {pageData.title}
                        </h1>

                        {pageData.description && (
                            <p className="subcategory__description">
                                {pageData.description}
                            </p>
                        )}
                    </motion.header>

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

                                        {canUseHoverMedia && family.hoverImage?.src && (
                                            <img
                                                className="subcategory-card__image subcategory-card__image--hover"
                                                src={family.hoverImage.src}
                                                alt=""
                                                aria-hidden="true"
                                                loading="lazy"
                                                decoding="async"
                                                onError={(event) => {
                                                    resolveImageFallback(event, family.hoverImage.fallbackSources);
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
