import AboutClients from "../components/about/AboutClients";
import AboutClosingCta from "../components/about/AboutClosingCta";
import AboutHero from "../components/about/AboutHero";
import AboutPhilosophy from "../components/about/AboutPhilosophy";

import "./About.scss";

export default function About() {
    return (
        <div className="about-page" data-navbar-solid>
            <AboutHero />
            <AboutPhilosophy />
            <AboutClients />
            <AboutClosingCta />
        </div>
    );
}
