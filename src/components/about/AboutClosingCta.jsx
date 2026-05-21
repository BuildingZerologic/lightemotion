import "./AboutClosingCta.scss"

export default function AboutClosingCta() {
    return (
        <section className="about-closing-cta">
            <div className="container">
                <div className="about-closing-cta__inner">
                    <div className="about-closing-cta__content">
                        <h3 className="about-closing-cta__heading heading-lg">
                            Have a vision for a space?
                        </h3>

                        <p className="about-closing-cta__text body-lg">
                            Let us bring technical precision and artistic
                            sensitivity to your next project.
                        </p>
                    </div>
                    <div className="about-closing-cta__actions">
                        <a
                            href="/contact"
                            className="btn-primary"
                        >
                            Discuss a Project
                        </a>

                        <a
                            href="/catalog"
                            className="btn-secondary"
                        >
                            Explore Our Collection
                        </a>
                    </div>

                </div>
            </div>
        </section>
    );
}