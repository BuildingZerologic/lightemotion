import { motion } from "framer-motion";

import hyattRegencyLogo from "../../assets/clients/q1.png";
import rayBanLogo from "../../assets/clients/q2.png";
import anytimeFitnessLogo from "../../assets/clients/q3.png";
import pumaLogo from "../../assets/clients/q4.png";
import { imageRevealVariants } from "../../utils/motion";

import "./OurClients.scss";

const clients = [
    {
        name: "Hyatt Regency",
        logo: hyattRegencyLogo,
        alt: "Hyatt Regency Logo",
    },
    {
        name: "Ray-Ban",
        logo: rayBanLogo,
        alt: "Ray-Ban Logo",
    },
    {
        name: "Anytime Fitness",
        logo: anytimeFitnessLogo,
        alt: "Anytime Fitness Logo",
    },
    {
        name: "Puma",
        logo: pumaLogo,
        alt: "Puma Logo",
    },
];

const reveal = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

const logoReveal = {
    ...imageRevealVariants,
};

const logoGridReveal = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.2,
        },
    },
};

export default function OurClients() {
    return (
        <section className="our-clients" aria-labelledby="our-clients-title">

            <div className="container">

                <div className="our-clients__header">
                    {/* <motion.p
                        className="our-clients__eyebrow"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={reveal}
                    >
                        Our Clients
                    </motion.p> */}

                    <motion.h3
                        className="our-clients__title"
                        id="our-clients-title"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={reveal}
                    >
                        OUR CLIENTS
                    </motion.h3>
                </div>

                <motion.ul
                    className="our-clients__logo-list"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={logoGridReveal}
                    aria-label="Trusted client brands"
                >
                    {clients.map((client) => (
                        <motion.li
                            className="our-clients__logo-item"
                            key={client.name}
                            variants={logoReveal}
                        >
                            <img src={client.logo} alt={client.alt} />
                        </motion.li>
                    ))}
                </motion.ul>

            </div>

        </section>
    );
}
