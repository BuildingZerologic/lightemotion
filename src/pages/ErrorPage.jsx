import { Link, useRouteError } from "react-router-dom";
import { motion } from "framer-motion";

import { revealSection, viewport } from "../utils/motion";

import "./ErrorPage.scss";

export default function ErrorPage({
    title = "Page not found",
    message = "The page you are looking for is unavailable or may have moved.",
}) {
    const routeError = useRouteError();
    const status = routeError?.status;

    return (
        <motion.section
            className="error-page"
            data-navbar-solid
            aria-labelledby="error-page-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            variants={revealSection}
        >
            <div className="container">
                <div className="error-page__content">
                    {status && (
                        <p className="error-page__status">
                            Error {status}
                        </p>
                    )}

                    <h1 className="error-page__title" id="error-page-title">
                        {title}
                    </h1>

                    <p className="error-page__message">
                        {message}
                    </p>

                    <div className="error-page__actions" aria-label="Helpful links">
                        <Link to="/" className="btn-primary">
                            Home
                        </Link>

                        <Link to="/collections/ceiling-presence" className="btn-secondary">
                            Explore Collections
                        </Link>

                        <Link to="/contact" className="btn-secondary">
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
