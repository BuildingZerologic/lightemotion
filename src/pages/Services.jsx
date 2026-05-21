import HowWeWork from "../components/services/HowWeWork";
import ServicesCta from "../components/services/ServicesCta";
import ServicesFocus from "../components/services/ServicesFocus";
import ServicesHero from "../components/services/ServicesHero";
import ServicesIndustries from "../components/services/ServicesIndustries";
import ServicesStack from "../components/services/ServicesStack";

import "./Services.scss";

export default function Services() {
    return (
        <div className="services-page">
            <ServicesHero />
            <ServicesFocus />
            <ServicesStack />
            <ServicesIndustries />
            <HowWeWork />
            <ServicesCta />
        </div>
    );
}
