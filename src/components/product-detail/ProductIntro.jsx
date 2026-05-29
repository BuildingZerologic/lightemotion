import { Link } from "react-router-dom";

import { motion } from "framer-motion";

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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
            <header className="product-detail__header">
                <h3 className="product-detail__title" id="product-detail-title">
                    {title}
                </h3>

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
