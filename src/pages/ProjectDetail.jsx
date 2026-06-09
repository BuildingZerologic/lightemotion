import { useMemo } from "react";
import { useParams } from "react-router-dom";

import ProjectConcept from "../components/project-detail/ProjectConcept";
import ProjectGallery from "../components/project-detail/ProjectGallery";
import ProjectHero from "../components/project-detail/ProjectHero";
import ProjectOutcome from "../components/project-detail/ProjectOutcome";
import ProjectOverview from "../components/project-detail/ProjectOverview";
import ProjectTechnical from "../components/project-detail/ProjectTechnical";
import ErrorPage from "./ErrorPage";
import { getProjectBySlug } from "../data/projects";

import "./ProjectDetail.scss";

export default function ProjectDetail() {
    const { slug } = useParams();
    const project = useMemo(() => getProjectBySlug(slug), [slug]);

    if (!project) {
        return (
            <ErrorPage
                title="Project not found"
                message="This project detail page is not available yet."
            />
        );
    }

    return (
        <main className="project-detail-page">
            <ProjectHero
                featuredImage={project.images.featured}
                title={project.title}
            />

            <ProjectOverview overview={project.content.overview} />

            <ProjectConcept concept={project.content.concept} />

            <ProjectGallery
                images={project.images.gallery}
                title={project.title}
            />

            <ProjectTechnical technical={project.content.technical} />

            <ProjectOutcome outcome={project.content.outcome} />
        </main>
    );
}
