import { useMemo, useRef } from "react";

import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

import ProductGallery from "../components/product-detail/ProductGallery";
import ProductIntro from "../components/product-detail/ProductIntro";
import ProductVariantsTable from "../components/product-detail/ProductVariantsTable";
import { getProductFamilyBySlug } from "../data/productFamilies";
import { getProductFamilyGalleryImages } from "../utils/productImages";

import "./ProductDetail.scss";

const DEFAULT_PRODUCT_SLUG = "flexible-strip-2835-led";
const VARIANTS_TABLE_ID = "product-variants";

export default function ProductDetail() {
    const { productSlug, slug } = useParams();
    const variantsSectionRef = useRef(null);
    const routeSlug = productSlug || slug || DEFAULT_PRODUCT_SLUG;
    const product = useMemo(
        () => getProductFamilyBySlug(routeSlug),
        [routeSlug]
    );
    const galleryImages = useMemo(
        () => getProductFamilyGalleryImages(product),
        [product]
    );
    const variants = product?.variants || [];

    const scrollToVariants = () => {
        variantsSectionRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <div className="product-detail-page" data-navbar-solid>
            <motion.section
                className="product-detail"
                aria-labelledby="product-detail-title"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.12 }}
                variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                    },
                }}
            >

                <div className="product-detail__layout">
                    <ProductGallery
                        images={galleryImages}
                        title={product?.name}
                    />

                    <div className="container-pdp">
                        <ProductIntro
                            title={product?.name}
                            description={product?.shortDescription}
                            variantsCount={variants.length}
                            onVariantsClick={scrollToVariants}
                        />
                    </div>
                </div>
            </motion.section>

            <div ref={variantsSectionRef}>
                <ProductVariantsTable
                    tableId={VARIANTS_TABLE_ID}
                    variants={variants}
                />
            </div>
        </div>
    );
}
