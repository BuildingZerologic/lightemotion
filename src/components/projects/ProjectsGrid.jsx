import { Link, useSearchParams } from "react-router-dom";

import { motion } from "framer-motion";

import { projectCategories, projects } from "../../data/projects";
import {
    revealCard,
    revealSection,
    staggerContainer,
    viewportLow,
} from "../../utils/motion";

import "./ProjectsGrid.scss";

export default function ProjectsGrid() {
    const [searchParams, setSearchParams] = useSearchParams();
    const requestedCategory = searchParams.get("category");
    const activeFilter = projectCategories.includes(requestedCategory)
        ? requestedCategory
        : "All";

    const handleFilterChange = (category) => {
        if (category === "All") {
            setSearchParams({});
            return;
        }

        setSearchParams({ category });
    };

    const filteredProjects =
        activeFilter === "All"
            ? projects
            : projects.filter((project) => project.category === activeFilter);

    return (
        <motion.section
            className="projects-grid-section"
            aria-label="Projects portfolio"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={revealSection}
        >
            <div className="container">
                <nav
                    className="projects-filters"
                    aria-label="Filter projects by category"
                >
                    <ul className="projects-filters__list" role="list">
                        {projectCategories.map((category) => (
                            <li key={category}>
                                <button
                                    type="button"
                                    className={`projects-filters__btn${activeFilter === category ? " is-active" : ""}`}
                                    onClick={() => handleFilterChange(category)}
                                    aria-pressed={activeFilter === category}
                                >
                                    {category}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <motion.div
                    className="projects-grid"
                    key={activeFilter}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredProjects.map((project) => (
                        <motion.article
                            className="project-card"
                            key={project.id}
                            variants={revealCard}
                        >
                            <Link
                                to={`/projects/${project.slug}`}
                                className="project-card__link"
                                aria-label={`View ${project.title} project`}
                            >
                                <div className="project-card__image-wrap" aria-hidden="true">
                                    <img
                                        className="project-card__image"
                                        src={project.images.listing}
                                        alt={project.title}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>

                                <div className="project-card__content">
                                    <p className="project-card__category">
                                        {project.category}
                                    </p>

                                    <h2 className="project-card__name">
                                        {project.title}
                                    </h2>

                                    <p className="project-card__location">
                                        {project.location}
                                    </p>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </motion.div>

                {filteredProjects.length === 0 && (
                    <p className="projects-grid__empty">
                        No projects found in this category.
                    </p>
                )}
            </div>
        </motion.section>
    );
}
