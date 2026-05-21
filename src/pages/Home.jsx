import AboutSection from "../components/home/AboutSection";
import Hero from "../components/home/Hero";
import OurClients from "../components/home/OurClients";
import SelectedWorks from "../components/home/SelectedWorks";
import ShopByCategory from "../components/home/ShopByCategory";

export default function Home() {
    return (
        <>
            <Hero />
            <AboutSection />
            <ShopByCategory />
            <SelectedWorks />
            <OurClients />
        </>
    );
}
