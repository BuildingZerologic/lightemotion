import { Link } from "react-router-dom";

import { motion } from "framer-motion";

import { revealSection, viewport } from "../../utils/motion";

export default function ProductIntro({
    description,
    onVariantsClick,
    title,
    variantsCount = 0,
}) {
    const variantsLabel = `Explore ${variantsCount} ${variantsCount === 1 ? "Variant" : "Variants"}`;

    return (
        <motion.div
            className="product-detail__content"
            variants={revealSection}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            <header className="product-detail__header">
                <h4 className="product-detail__title" id="product-detail-title">
                    {title}
                </h4>

                {description && (
                    <p className="product-detail__description">
                        {description}
                    </p>
                )}

                <button
                    className="product-detail__variants-link"
                    type="button"
                    onClick={onVariantsClick}
                    aria-label={`View ${variantsLabel.toLowerCase()} table`}
                >
                    {variantsLabel}
                </button>
            </header>

            <Link className="btn-primary product-detail__inquire" to="/contact">
                Enquire
            </Link>
        </motion.div>
    );
}
