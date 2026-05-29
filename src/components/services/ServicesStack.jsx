import { motion } from "framer-motion";

import { imageReveal } from "../../utils/motion";
import { reveal, staggerReveal } from "./servicesAnimations";

import "./ServicesStack.scss";

const services = [
    {
        number: "01",
        title: "Architectural Lighting Design",
        description:
            "Design-led lighting systems crafted to enhance spatial atmosphere, material expression, and visual harmony across residential, hospitality, and commercial environments.",
        image: "/images/services/service1.jpg",
    },
    {
        number: "02",
        title: "Interior Lighting Solutions",
        description:
            "Layered lighting compositions balancing ambient, accent, and functional illumination to create refined and emotionally engaging interiors.",
        image: "/images/services/service2.webp",
    },
    {
        number: "03",
        title: "Exterior & Landscape Lighting",
        description:
            "Outdoor lighting solutions designed to shape facades, pathways, landscapes, and architectural experiences with depth, contrast, and precision.",
        image: "/images/services/service3.jpg",
    },
    {
        number: "04",
        title: "Linear & Profile Lighting Systems",
        description:
            "Advanced linear lighting integrations for ceilings, walls, coves, shelving, and architectural detailing with seamless modern aesthetics.",
        image: "/images/services/service4.webp",
    },
    {
        number: "05",
        title: "Decorative & Custom Fixtures",
        description:
            "Curated decorative lighting and custom hanging installations combining technical performance with sculptural visual impact.",
        image: "/images/services/service5.webp",
    },
    {
        number: "06",
        title: "Smart Lighting & Controls",
        description:
            "Integrated dimming, automation, RGB, tunable white, and intelligent control systems engineered for flexibility, efficiency, and user comfort.",
        image: "/images/services/service6.jpg",
    },
];

export default function ServicesStack() {
    return (
        <section className="services-stack" aria-labelledby="services-stack-title">
            <div className="container">
                <motion.h2
                    className="services-stack__title"
                    id="services-stack-title"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={reveal}
                >
                    Services We Offer
                </motion.h2>

                <motion.div
                    className="services-stack__list"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.12 }}
                    variants={staggerReveal}
                >
                    {services.map((service) => (
                        <motion.article
                            className="services-stack__item"
                            key={service.number}
                            variants={reveal}
                        >
                            <p className="services-stack__number">
                                [{service.number}]
                            </p>

                            <h3 className="services-stack__heading">
                                {service.title}
                            </h3>

                            <p className="services-stack__description">
                                {service.description}
                            </p>

                            <motion.div
                                className="services-stack__image-wrap"
                                {...imageReveal}
                            >
                                <img
                                    src={service.image}
                                    alt={`${service.title} project lighting`}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </motion.div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
