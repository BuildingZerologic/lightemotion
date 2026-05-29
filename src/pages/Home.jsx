import AboutSection from "../components/home/AboutSection";
import EditorialCollections from "../components/home/EditorialCollections";
import Hero from "../components/home/Hero";
import SelectedWorks from "../components/home/SelectedWorks";

export default function Home() {
    return (
        <>
            <Hero />
            <AboutSection />
            <EditorialCollections />
            <SelectedWorks />
        </>
    );
}
