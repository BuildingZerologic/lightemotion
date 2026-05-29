import { useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import "./Hero.scss";

export default function Hero() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section className="hero">

            <div className="hero__video-wrapper">

                <video
                    className="hero__video"
                    autoPlay={!shouldReduceMotion}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    poster="/images/hero-poster.webp"
                    aria-hidden="true"
                >
                    <source src="/videos/herovideo.mp4" type="video/mp4" />
                </video>

            </div>

            <div className="hero__overlay"></div>

            <div className="container">

                <div className="hero__content">

                    <h2 className="hero__title">
                        Lighting Solutions For Business
                    </h2>

                    <div className="hero__actions">

                        <Link to="/contact" className="btn-light">
                            START COLLABORATION
                        </Link>

                    </div>

                </div>

            </div>

        </section>
    );
}
