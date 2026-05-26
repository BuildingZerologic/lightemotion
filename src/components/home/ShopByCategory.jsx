import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import exteriorLighting from "../../assets/categories/exterior-lighting.jpg";
import pendantLighting from "../../assets/categories/pendant-lighting.jpg";
import hospitalityLighting from "../../assets/categories/hospitality-lighting.jpg";
import commercialLighting from "../../assets/categories/commercial-lighting.jpg";

import { imageRevealVariants } from "../../utils/motion";

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

const sectionReveal = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
        },
    },
};

const itemReveal = {
    ...imageRevealVariants,
};

export default function ShopByCategory() {
    return (
        <section className="shop-category" aria-labelledby="shop-category-title">

            <div className="container">

                <motion.h3
                    className="shop-category__heading"
                    id="shop-category-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8 }}
                >
                    Shop By Category
                </motion.h3>

                <motion.div
                    className="shop-category__grid"
                    variants={sectionReveal}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.18 }}
                >
                    {categories.map((category) => (
                        <motion.article
                            className="shop-category__card"
                            key={category.title}
                            variants={itemReveal}
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

        </section>
    );
}
