import { useCallback, useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import { EASE, revealSection } from "../../utils/motion";
import { resolveImageFallback } from "../../utils/productImages";

export default function ProductGallery({ images = [], title = "Product" }) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const closeButtonRef = useRef(null);

    const activeImage = images[activeImageIndex];
    const lightboxImage = lightboxIndex === null ? null : images[lightboxIndex];
    const isLightboxOpen = lightboxIndex !== null;

    const showPreviousImage = () => {
        setActiveImageIndex((currentIndex) =>
            (currentIndex + images.length - 1) % images.length
        );
    };

    const showNextImage = () => {
        setActiveImageIndex((currentIndex) =>
            (currentIndex + 1) % images.length
        );
    };

    const showPreviousLightboxImage = useCallback(() => {
        setLightboxIndex((currentIndex) =>
            (currentIndex + images.length - 1) % images.length
        );
    }, [images.length]);

    const showNextLightboxImage = useCallback(() => {
        setLightboxIndex((currentIndex) =>
            (currentIndex + 1) % images.length
        );
    }, [images.length]);

    const openLightbox = (imageIndex) => {
        setActiveImageIndex(imageIndex);
        setLightboxIndex(imageIndex);
    };

    const closeLightbox = () => {
        setLightboxIndex(null);
    };

    useEffect(() => {
        if (!isLightboxOpen) {
            return undefined;
        }

        const previousOverflow = document.body.style.overflow;

        document.body.style.overflow = "hidden";
        closeButtonRef.current?.focus();

        const handleLightboxKeydown = (event) => {
            if (event.key === "Escape") {
                closeLightbox();
            }

            if (event.key === "ArrowLeft") {
                showPreviousLightboxImage();
            }

            if (event.key === "ArrowRight") {
                showNextLightboxImage();
            }
        };

        window.addEventListener("keydown", handleLightboxKeydown);

        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", handleLightboxKeydown);
        };
    }, [isLightboxOpen, showNextLightboxImage, showPreviousLightboxImage]);

    if (!activeImage) {
        return null;
    }

    return (
        <>
            <motion.div
                className="product-detail__gallery"
                variants={revealSection}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
            >
                <div className="product-detail__media">
                    <button
                        className="product-detail__media-button"
                        type="button"
                        onClick={() => openLightbox(activeImageIndex)}
                        aria-label={`Open image ${activeImageIndex + 1} of ${images.length} in lightbox`}
                    >
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeImage.src}
                                src={activeImage.src}
                                alt={activeImage.alt}
                                onError={(event) => {
                                    resolveImageFallback(event, activeImage.fallbackSources);
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.4, ease: EASE }}
                                loading="eager"
                                decoding="async"
                            />
                        </AnimatePresence>
                    </button>

                    <button
                        className="product-detail__gallery-control product-detail__gallery-control--previous"
                        type="button"
                        onClick={showPreviousImage}
                        aria-label="Show previous product image"
                    >
                        <span aria-hidden="true" />
                    </button>

                    <button
                        className="product-detail__gallery-control product-detail__gallery-control--next"
                        type="button"
                        onClick={showNextImage}
                        aria-label="Show next product image"
                    >
                        <span aria-hidden="true" />
                    </button>
                </div>
            </motion.div>

            <AnimatePresence>
                {isLightboxOpen && lightboxImage && (
                    <motion.div
                        className="product-detail__lightbox"
                        role="presentation"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) {
                                closeLightbox();
                            }
                        }}
                    >
                        <div
                            className="product-detail__lightbox-dialog"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="product-detail-lightbox-title"
                        >
                            <h2 id="product-detail-lightbox-title">
                                {title} image preview
                            </h2>

                            <button
                                className="product-detail__lightbox-close"
                                type="button"
                                ref={closeButtonRef}
                                onClick={closeLightbox}
                                aria-label="Close product image lightbox"
                            >
                                <span aria-hidden="true" />
                            </button>

                            <button
                                className="product-detail__lightbox-control product-detail__lightbox-control--previous"
                                type="button"
                                onClick={showPreviousLightboxImage}
                                aria-label="Show previous product image"
                            >
                                <span aria-hidden="true" />
                            </button>

                            <img
                                className="product-detail__lightbox-image"
                                src={lightboxImage.src}
                                alt={lightboxImage.alt}
                                onError={(event) => {
                                    resolveImageFallback(event, lightboxImage.fallbackSources);
                                }}
                            />

                            <button
                                className="product-detail__lightbox-control product-detail__lightbox-control--next"
                                type="button"
                                onClick={showNextLightboxImage}
                                aria-label="Show next product image"
                            >
                                <span aria-hidden="true" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
