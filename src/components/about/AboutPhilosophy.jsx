import { motion } from 'framer-motion';
import './AboutPhilosophy.scss';

export default function AboutPhilosophy() {
    // Premium Awwwards-style ease animation
    const revealUp = {
        hidden: { y: 60, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <div className="about-scroll-scene">

            {/* 🎥 LAYER 1: VIDEO (Sticky Base - Z-Index 1) */}
            <div className="about-video-layer" aria-hidden="true">
                <video
                    className="about-philosophy__video about-philosophy__video--desktop"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                >
                    <source src="/videos/aboutprocess.mp4" type="video/mp4" />
                </video>

                <video
                    className="about-philosophy__video about-philosophy__video--mobile"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                >
                    <source src="/videos/aboutprocess.mp4" type="video/mp4" />
                </video>
            </div>

            {/* 📝 LAYER 2: SECTION 01 · OUR CORE PURPOSE (Curtain Cover - Z-Index 2) */}
            <section
                className="about-philosophy"
                aria-labelledby="about-philosophy-title"
            >
                <div className="container">
                    <div className="about-philosophy__statement">
                        <motion.h2
                            id="about-philosophy-title"
                            className="about-philosophy__heading"
                            variants={revealUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                        >
                            Our core purpose
                        </motion.h2>

                        <motion.p
                            className="about-philosophy__text"
                            variants={revealUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: 0.1 }}
                        >
                            We believe light is not a final addition to a room, but a
                            fundamental material that dictates how a space behaves. Our
                            philosophy centers on the absolute balance between brightness
                            and darkness, recognizing that shadow is just as critical to
                            architecture as illumination itself.
                            <br /><br />
                            We manipulate contrast to create visual depth, guide
                            movement, and introduce an emotional cadence to physical
                            structures. By focusing on sustainable performance, technical
                            concealment, and pure spatial narrative, we ensure that our
                            lighting systems remain virtually invisible while making the
                            environment unforgettable.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* 🪟 THE WINDOW: Gap to let the sticky video show through */}
            <div className="about-video-gap" aria-hidden="true"></div>

            {/* 🏛️ LAYER 3: SECTION 02 · CAPABILITY PILLARS (Overlaps Video - Z-Index 3) */}
            <section
                className="about-capabilities"
                aria-labelledby="about-capabilities-title"
            >
                <div className="container">
                    <div className="about-capabilities__header">
                        <motion.h2
                            id="about-capabilities-title"
                            className="about-capabilities__heading"
                            variants={revealUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.4 }}
                        >
                            Pillars Of Lighting
                        </motion.h2>
                    </div>

                    <div className="about-capabilities__grid">
                        {/* COLUMN 01 */}
                        <motion.article
                            className="about-capabilities__item"
                            variants={revealUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                        >
                            <span className="about-capabilities__number">01</span>
                            <div className="about-capabilities__content">
                                 <h5 className="about-capabilities__title">Bespoke Frameworks</h5>
                                <p className="about-capabilities__text">
                                    Every premium project has unique structural and architectural
                                    demands. We alter fixture optics, engineer custom linear
                                    profiles, and calibrate exact lumen outputs to ensure our
                                    systems blend seamlessly into your specific blueprints.
                                </p>
                            </div>
                        </motion.article>

                        {/* COLUMN 02 */}
                        <motion.article
                            className="about-capabilities__item"
                            variants={revealUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: 0.1 }}
                        >
                            <span className="about-capabilities__number">02</span>
                            <div className="about-capabilities__content">
                                 <h5 className="about-capabilities__title">Smart Automation</h5>
                                <p className="about-capabilities__text">
                                    Modern luxury demands fluid, automated adaptation. Our
                                    fixtures are engineered to integrate flawlessly with global
                                    home automation and building protocols, allowing your light
                                    to transition naturally from dawn to midnight.
                                </p>
                            </div>
                        </motion.article>

                        {/* COLUMN 03 */}
                        <motion.article
                            className="about-capabilities__item"
                            variants={revealUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="about-capabilities__number">03</span>
                            <div className="about-capabilities__content">
                                 <h5 className="about-capabilities__title">Sustainable Performance</h5>
                                <p className="about-capabilities__text">
                                    Built for permanent architectural impact. We combine
                                    advanced thermal management with premium, high-CRI chipsets
                                    to guarantee maximum energy efficiency and pristine color
                                    rendering that stays stable for years.
                                </p>
                            </div>
                        </motion.article>
                    </div>
                </div>
            </section>

        </div>
    );
}