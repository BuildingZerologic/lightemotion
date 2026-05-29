import { useMemo, useState } from "react";

import { Link } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

import { imageRevealVariants } from "../utils/motion";
import {
    getPublicProductWidth,
    responsiveSizes,
} from "../utils/responsiveMedia";

import allProductsBanner from "../assets/catalog/banners/all-products-banner.webp";
import exteriorBanner from "../assets/catalog/banners/exterior-lighting-banner.webp";
import ceilingBanner from "../assets/catalog/banners/ceiling-lighting-banner.webp";
import officeBanner from "../assets/catalog/banners/office-lighting-banner.webp";
import retailBanner from "../assets/catalog/banners/retail-lighting-banner.webp";
import trackBanner from "../assets/catalog/banners/ceiling-lighting-banner.webp";
import linearBanner from "../assets/catalog/banners/office-lighting-banner.webp";
import panelBanner from "../assets/catalog/banners/retail-lighting-banner.webp";




import "./Catalog.scss";

const categories = [
    {
        label: "All Products",
        value: "all",
        banner: allProductsBanner,
    },
    {
        label: "Outdoor Lighting",
        value: "exterior",
        banner: exteriorBanner,
    },
    {
        label: "Ceiling Lighting",
        value: "ceiling",
        banner: ceilingBanner,
    },
    {
        label: "Decorative Lighting",
        value: "commercial",
        banner: officeBanner,
    },
    {
        label: "Industrial Lighting",
        value: "retail",
        banner: retailBanner,
    },
    {
        label: "Track Lighting",
        value: "track",
        banner: trackBanner,
    },
    {
        label: "Panel Lighting",
        value: "panel",
        banner: panelBanner,
    },
    {
        label: "Linear Lighting",
        value: "linear",
        banner: linearBanner,
    },
];
const products = [
    {
        name: "BOLDA 03",
        category: "Wall Light",
        group: "all",
        image: "/all-products/prod (1).jpeg",
    },
    {
        name: "IPOLI 01",
        category: "Ceiling Light",
        group: "ceiling",
        image: "/all-products/prod (2).jpeg",
    },
    {
        name: "PARC 07",
        category: "Decorative Light",
        group: "all",
        image: "/all-products/prod (3).jpeg",
    },
    {
        name: "SILO PATH",
        category: "Exterior Light",
        group: "exterior",
        image: "/all-products/prod (4).jpeg",
    },
    {
        name: "TRACK 48",
        category: "Commercial Light",
        group: "commercial",
        image: "/all-products/prod (5).jpeg",
    },
    {
        name: "SPOT 02",
        category: "Retail Light",
        group: "retail",
        image: "/all-products/prod (6).jpeg",
    },
    {
        name: "LUNA PORTABLE",
        category: "Portable Light",
        group: "all",
        image: "/all-products/prod (7).jpeg",
    },
    {
        name: "LINEA 1200",
        category: "Architectural Light",
        group: "commercial",
        image: "/all-products/prod (8).jpeg",
    },
    {
        name: "TERRA 18",
        category: "Exterior Light",
        group: "exterior",
        image: "/all-products/prod (9).jpeg",
    },
    {
        name: "ARC PENDANT",
        category: "Ceiling Light",
        group: "ceiling",
        image: "/all-products/prod (10).jpeg",
    },
    {
        name: "AXIS RAIL",
        category: "Commercial Light",
        group: "commercial",
        image: "/all-products/prod (11).jpeg",
    },
    {
        name: "VITRINE 04",
        category: "Retail Light",
        group: "retail",
        image: "/all-products/prod (12).jpeg",
    },
    {
        name: "STONE WASH",
        category: "Exterior Light",
        group: "exterior",
        image: "/all-products/prod (13).jpeg",
    },
    {
        name: "HALO LINE",
        category: "Ceiling Light",
        group: "ceiling",
        image: "/all-products/prod (14).jpeg",
    },
    {
        name: "MUSE SPOT",
        category: "Retail Light",
        group: "retail",
        image: "/all-products/prod (15).jpeg",
    },
    {
        name: "OFFICE BEAM",
        category: "Commercial Light",
        group: "commercial",
        image: "/all-products/prod (16).jpeg",
    },
];

const gridReveal = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const tabsReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

function getCatalogProductSrcSet(image) {
    const productMatch = image.match(/prod \((\d+)\)\.jpeg$/);

    if (!productMatch) {
        return undefined;
    }

    const responsiveImage = `/all-products/responsive/prod-${productMatch[1]}.jpeg`;
    const fullWidth = getPublicProductWidth(image);

    if (fullWidth <= 400) {
        return `${image} ${fullWidth}w`;
    }

    return `${responsiveImage} 400w, ${image} ${fullWidth}w`;
}

export default function Catalog() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [viewMode, setViewMode] = useState("editorial");

    const selectedCategory = categories.find((category) =>
        category.value === activeCategory
    ) || categories[0];

    const visibleProducts = useMemo(() => {
        if (activeCategory === "all") {
            return products.slice(0, 8);
        }

        return products.filter((product) => product.group === activeCategory);
    }, [activeCategory]);

    return (
        <div className="catalog-page">

            <section className="catalog-hero" data-navbar-transparent>
                <AnimatePresence mode="wait">
                    <motion.img
                        key={selectedCategory.banner}
                        src={selectedCategory.banner}
                        alt=""
                        aria-hidden="true"
                        loading="eager"
                        fetchPriority="high"
                        decoding="async"
                        initial={{ opacity: 0, scale: 1.025 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.015 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    />
                </AnimatePresence>
            </section>

            <section className="catalog" aria-labelledby="catalog-title">
                <div className="container">

                    <h1 className="catalog__title" id="catalog-title">
                        Light Emotion Catalog
                    </h1>

                    <motion.div
                        className="catalog__controls"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.35 }}
                        variants={tabsReveal}
                    >
                        <div className="catalog__tabs-wrap">
                            <div className="catalog__tabs" role="tablist" aria-label="Catalog categories">
                                {categories.map((category) => (
                                    <button
                                        className={
                                            activeCategory === category.value
                                                ? "catalog__tab catalog__tab--active"
                                                : "catalog__tab"
                                        }
                                        type="button"
                                        role="tab"
                                        aria-selected={activeCategory === category.value}
                                        key={category.value}
                                        onClick={() => setActiveCategory(category.value)}
                                    >
                                        {category.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="catalog__view-toggle" aria-label="Catalog view options">
                            <button
                                className={
                                    viewMode === "editorial"
                                        ? "catalog__view-button catalog__view-button--active"
                                        : "catalog__view-button"
                                }
                                type="button"
                                aria-label="Show four column editorial view"
                                aria-pressed={viewMode === "editorial"}
                                onClick={() => setViewMode("editorial")}
                            >
                                <span className="catalog__view-icon catalog__view-icon--four">
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                </span>
                            </button>

                            <button
                                className={
                                    viewMode === "dense"
                                        ? "catalog__view-button catalog__view-button--active"
                                        : "catalog__view-button"
                                }
                                type="button"
                                aria-label="Show seven column compact view"
                                aria-pressed={viewMode === "dense"}
                                onClick={() => setViewMode("dense")}
                            >
                                <span className="catalog__view-icon catalog__view-icon--dense">
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                    <span />
                                </span>
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        className={
                            viewMode === "dense"
                                ? "catalog__grid catalog__grid--dense"
                                : "catalog__grid"
                        }
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.12 }}
                        variants={gridReveal}
                        key={`${activeCategory}-${viewMode}`}
                    >
                        {visibleProducts.map((product) => (
                            <motion.article
                                className="catalog__product"
                                key={product.name}
                                variants={imageRevealVariants}
                            >
                                <Link to="/product-detail" style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                <div className="catalog__image-wrap">
                                    <img
                                        className="catalog__image"
                                        src={product.image}
                                        srcSet={getCatalogProductSrcSet(product.image)}
                                        sizes={
                                            viewMode === "dense"
                                                ? responsiveSizes.denseProductGrid
                                                : responsiveSizes.productGrid
                                        }
                                        alt={`${product.name} ${product.category}`}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>

                                <div className="catalog__product-content">
                                    <h2 className="catalog__product-name">
                                        {product.name}
                                    </h2>

                                    <p className="catalog__product-category">
                                        {product.category}
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
