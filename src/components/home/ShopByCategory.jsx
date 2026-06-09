import { motion } from "framer-motion";

import exteriorLighting from "../../assets/categories/exterior-lighting.jpg";
import pendantLighting from "../../assets/categories/pendant-lighting.jpg";
import hospitalityLighting from "../../assets/categories/hospitality-lighting.jpg";
import commercialLighting from "../../assets/categories/commercial-lighting.jpg";

import {
    revealCard,
    revealHeading,
    staggerContainer,
    viewportLow,
} from "../../utils/motion";

import "./ShopByCategory.scss";

const categories = [
    {
        title: "Exterior Lighting",
        image: exteriorLighting,
        alt: "Modern exterior architecture illuminated with warm wall and landscape lighting",
    },
    {
        title: "Ceiling Lamps",
        image: pendantLighting,
        alt: "Minimal pendant lights suspended over a stone dining table",
    },
    {
        title: "Retail Store Lighting",
        image: hospitalityLighting,
        alt: "Luxury hospitality bar interior with layered architectural lighting",
    },
    {
        title: "Commercial Office Lighting",
        image: commercialLighting,
        alt: "Modern commercial office interior with linear ceiling lighting",
    },
];

// Parked: the current homepage uses EditorialCollections as the active category entry point.
export default function ShopByCategory() {
    return (
        <motion.section
            className="shop-category"
            aria-labelledby="shop-category-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            variants={staggerContainer}
        >

            <div className="container">

                <motion.h3
                    className="shop-category__heading"
                    id="shop-category-title"
                    variants={revealHeading}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }}
                >
                    Shop By Category
                </motion.h3>

                <motion.div
                    className="shop-category__grid"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportLow}
                >
                    {categories.map((category) => (
                        <motion.article
                            className="shop-category__card"
                            key={category.title}
                            variants={revealCard}
                        >
                            <img
                                className="shop-category__image"
                                src={category.image}
                                alt={category.alt}
                                loading="lazy"
                                decoding="async"
                            />

                            <div className="shop-category__content">
                                <h3 className="shop-category__title">
                                    {category.title}
                                </h3>
                            </div>
                        </motion.article>
                    ))}
                </motion.div>

            </div>

        </motion.section>
    );
}
