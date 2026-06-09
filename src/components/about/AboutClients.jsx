import { motion } from "framer-motion";

import {
    revealEyebrow,
    revealHeading,
    revealSection,
    viewport,
} from "../../utils/motion";

import "./AboutClients.scss";

import gail from "../../assets/clients/gail.svg";
import hsbc from "../../assets/clients/hsbc.svg";
import westin from "../../assets/clients/westin.svg";
import mango from "../../assets/clients/mango.png";
import bikanerwala from "../../assets/clients/bikanerwala.avif";
import asianp from "../../assets/clients/asianpaints.avif";
import alsisar from "../../assets/clients/alsisar.avif";
import sleepwell from "../../assets/clients/sleepwell.svg";
import raphe from "../../assets/clients/raphe.png";
import mamaearth from "../../assets/clients/mamaearth.png";
import kiaasa from "../../assets/clients/kiaasa.webp";
import volks from "../../assets/clients/volkswagen.avif";

/* ----------------------------------------------------------------
   clients list
   - logo : imported image asset  →  renders as <img>
   - logo : null                  →  renders first word of name as text
---------------------------------------------------------------- */
const clients = [
    
    { name: "Westin", logo: westin },
    { name: "Mango", logo: mango },
    { name: "Bikanerwala", logo: bikanerwala },
    { name: "Asianpaints", logo: asianp },
    { name: "HSBC", logo: hsbc },
    { name: "Alsisar", logo: alsisar },
    { name: "Sleepwell", logo: sleepwell },
    { name: "Raphe", logo: raphe },
    { name: "Mamaearth", logo: mamaearth },
    { name: "Kiaasa", logo: kiaasa },
    { name: "Volkswagen", logo: volks },
    { name: "GAIL (India) Limited", logo: gail },

];

/* Duplicate for seamless loop */
const marqueeItems = [...clients, ...clients];

export default function AboutClients() {
    return (
        <motion.section
            className="about-clients"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={revealSection}
        >
            <div className="container">
                <motion.div
                    className="about-clients__header"
                    variants={revealHeading}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                >
                    <motion.span
                        className="about-clients__label"
                        variants={revealEyebrow}
                    >
                        OUR CLIENTS
                    </motion.span>

                    <h5 className="about-clients__heading">
                        The spaces that shape India's future - we light them
                    </h5>
                </motion.div>
            </div>

            {/* Full-bleed marquee */}
            <div className="about-clients__marquee-wrapper" aria-hidden="true">
                <ul className="about-clients__marquee-track">
                    {marqueeItems.map((client, index) => (
                        <li
                            key={`${client.name}-${index}`}
                            className="about-clients__marquee-item"
                        >
                            {client.logo ? (
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    loading="lazy"
                                    className="about-clients__logo"
                                />
                            ) : (
                                <span className="about-clients__name-text">
                                    {client.name.split(" ")[0].toLowerCase()}
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.section>
    );
}
