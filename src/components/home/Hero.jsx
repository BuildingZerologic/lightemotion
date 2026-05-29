import { Link } from "react-router-dom";
import "./Hero.scss";

export default function Hero() {
    return (
        <section className="hero">

            <div className="hero__video-wrapper">

                {/* Desktop Video */}
                <video
                    className="hero__video hero__video--desktop"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                >
                    <source
                        src="/videos/herovideo.mp4"
                        type="video/mp4"
                        media="(min-width: 769px)"
                    />
                </video>

                {/* Mobile Video */}
                <video
                    className="hero__video hero__video--mobile"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                >
                    <source
                        src="/videos/hero-mobile.mp4"
                        type="video/mp4"
                        media="(max-width: 768px)"
                    />
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