import ProjectsHero from "../components/projects/ProjectsHero";
import ProjectsGrid from "../components/projects/ProjectsGrid";

import "./Projects.scss";

export default function Projects() {
    return (
        <main className="projects-page" data-navbar-solid>
            <ProjectsHero />
            <ProjectsGrid />
        </main>
    );
}
