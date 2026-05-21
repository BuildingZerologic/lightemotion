import { useEffect, useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

import "./ProductDetail.scss";

const product = {
    title: "Flexible Strip 2835 LED",
    images: [
        {
            src: "/flexiblestrips.jpg",
            alt: "Flexible Strip 2835 LED product view one",
        },
        {
             src: "/flexiblestrips.jpg",
             alt: "Flexible Strip 2835 LED product view two",
        },
        {
             src: "/flexiblestrips.jpg",
             alt: "Flexible Strip 2835 LED product detail view",
        },
    ],
    models: [
        {
            id: "le-fl-2835-60",
            name: "LE FL 2835 60",
            specs: [
                { label: "Wattage", value: "4w/MTR" },
                { label: "Voltage", value: "12/24v DC" },
                { label: "LED Qty", value: "60/MTR" },
                { label: "Strip Width", value: "8 MM" },
            ],
            colors: ["Red", "Green", "Blue", "Ice Blue", "Pink", "Yellow", "4000K", "3000K", "2700K"],
            reference: "LE-FL-2835-60-12/24",
            info: "Suitable for architectural coves, shelves, and concealed linear accents.",
        },
        {
            id: "le-fl-2835-120",
            name: "LE FL 2835 120",
            specs: [
                { label: "Wattage", value: "6w/MTR" },
                { label: "Voltage", value: "12/24v DC" },
                { label: "LED Qty", value: "120/MTR" },
                { label: "Strip Width", value: "8 MM" },
            ],
            colors: ["Red", "Green", "Blue", "Ice Blue", "Pink", "Yellow", "4000K", "3000K", "2700K"],
            reference: "LE-FL-2835-120-12/24",
            info: "Balanced output for continuous detail lighting with a compact visible profile.",
        },
        {
            id: "le-fl-2835-180",
            name: "LE FL 2835 180",
            specs: [
                { label: "Wattage", value: "9w/MTR" },
                { label: "Voltage", value: "24v DC" },
                { label: "LED Qty", value: "180/MTR" },
                { label: "Strip Width", value: "10 MM" },
            ],
            colors: ["Red", "Green", "Blue", "Ice Blue", "4000K", "3000K", "2700K"],
            reference: "LE-FL-2835-180-24",
            info: "Higher density option for smoother luminous continuity in close-view applications.",
        },
        {
            id: "le-fl-2835-240",
            name: "LE FL 2835 240",
            specs: [
                { label: "Wattage", value: "12w/MTR" },
                { label: "Voltage", value: "24v DC" },
                { label: "LED Qty", value: "240/MTR" },
                { label: "Strip Width", value: "10 MM" },
            ],
            colors: ["Red", "Green", "Blue", "Ice Blue", "4000K", "3000K", "2700K"],
            reference: "LE-FL-2835-240-24",
            info: "Designed for premium concealed details where evenness and output matter.",
        },
        {
            id: "le-fl-2835-480",
            name: "LE FL 2835 480",
            specs: [
                { label: "Wattage", value: "18w/MTR" },
                { label: "Voltage", value: "24v DC" },
                { label: "LED Qty", value: "480/MTR" },
                { label: "Strip Width", value: "12 MM" },
            ],
            colors: ["4000K", "3000K", "2700K"],
            reference: "LE-FL-2835-480-24",
            info: "High density specification for seamless premium architectural runs.",
        },
    ],
};

const colorSwatches = {
    Red: "#e01818",
    Green: "#48b768",
    Blue: "#1c4ed8",
    "Ice Blue": "#6fd3e8",
    Pink: "#d527b8",
    Yellow: "#f5c400",
    "4000K": "#fff3b2",
    "3000K": "#f4b33f",
    "2700K": "#f3a575",
};

export default function ProductDetail() {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [activeModelId, setActiveModelId] = useState(null);
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const closeButtonRef = useRef(null);

    const activeImage = product.images[activeImageIndex];
    const lightboxImage = lightboxIndex === null ? null : product.images[lightboxIndex];
    const isLightboxOpen = lightboxIndex !== null;

    const showPreviousImage = () => {
        setActiveImageIndex((currentIndex) =>
            (currentIndex + product.images.length - 1) % product.images.length
        );
    };

    const showNextImage = () => {
        setActiveImageIndex((currentIndex) =>
            (currentIndex + 1) % product.images.length
        );
    };

    const showPreviousLightboxImage = () => {
        setLightboxIndex((currentIndex) =>
            (currentIndex + product.images.length - 1) % product.images.length
        );
    };

    const showNextLightboxImage = () => {
        setLightboxIndex((currentIndex) =>
            (currentIndex + 1) % product.images.length
        );
    };

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
    }, [isLightboxOpen]);

    return (
        <div className="product-detail-page" data-navbar-solid>
            <section className="product-detail" aria-labelledby="product-detail-title">
                <div className="container-pdp">
                    <div className="product-detail__layout">
                        <motion.div
                            className="product-detail__gallery"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="product-detail__media">
                                <button
                                    className="product-detail__media-button"
                                    type="button"
                                    onClick={() => openLightbox(activeImageIndex)}
                                    aria-label={`Open image ${activeImageIndex + 1} of ${product.images.length} in lightbox`}
                                >
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={activeImage.src}
                                            src={activeImage.src}
                                            alt={activeImage.alt}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.4 }}
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

                            {/* <div className="product-detail__thumbnails" aria-label="Product gallery">
                                {product.images.map((image, imageIndex) => (
                                    <button
                                        className={
                                            imageIndex === activeImageIndex
                                                ? "product-detail__thumbnail product-detail__thumbnail--active"
                                                : "product-detail__thumbnail"
                                        }
                                        type="button"
                                        key={image.src}
                                        onClick={() => setActiveImageIndex(imageIndex)}
                                        onDoubleClick={() => openLightbox(imageIndex)}
                                        aria-label={`Show product image ${imageIndex + 1}`}
                                        aria-current={imageIndex === activeImageIndex ? "true" : undefined}
                                    >
                                        <img
                                            src={image.src}
                                            alt=""
                                            loading="lazy"
                                            decoding="async"
                                            aria-hidden="true"
                                        />
                                    </button>
                                ))}
                            </div> */}
                        </motion.div>

                        <motion.div
                            className="product-detail__content"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <header className="product-detail__header">
                                <h1 className="product-detail__title" id="product-detail-title">
                                    {product.title}
                                </h1>

                                <p className="product-detail__meta">
                                    {product.models.length} Models Available, click any to see full details
                                </p>
                            </header>

                            <div className="product-detail__accordion">
                                {product.models.map((model) => {
                                    const isOpen = activeModelId === model.id;
                                    const panelId = `${model.id}-panel`;
                                    const buttonId = `${model.id}-button`;

                                    return (
                                        <article className="product-detail__model" key={model.id}>
                                            <h2 className="product-detail__model-heading">
                                                <button
                                                    className="product-detail__model-button"
                                                    type="button"
                                                    id={buttonId}
                                                    aria-expanded={isOpen}
                                                    aria-controls={panelId}
                                                    onClick={() => setActiveModelId(isOpen ? null : model.id)}
                                                >
                                                    <span>{model.name}</span>
                                                    <span className="product-detail__chevron" aria-hidden="true" />
                                                </button>
                                            </h2>

                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        className="product-detail__model-panel"
                                                        id={panelId}
                                                        role="region"
                                                        aria-labelledby={buttonId}
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                                                    >
                                                        <div className="product-detail__model-inner">
                                                            <dl className="product-detail__specs">
                                                                {model.specs.map((spec) => (
                                                                    <div className="product-detail__spec" key={spec.label}>
                                                                        <dt>{spec.label}</dt>
                                                                        <dd>{spec.value}</dd>
                                                                    </div>
                                                                ))}
                                                            </dl>

                                                            <div className="product-detail__colors" aria-label="Available colors">
                                                                <p className="product-detail__detail-label">
                                                                    Available Colors
                                                                </p>

                                                                <ul>
                                                                    {model.colors.map((color) => (
                                                                        <li key={color}>
                                                                            {/* <span
                                                                                className="product-detail__swatch"
                                                                                style={{ "--swatch-color": colorSwatches[color] }}
                                                                                aria-hidden="true"
                                                                            /> */}
                                                                            <span className="">{color}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>

                                                            {/* <dl className="product-detail__additional">
                                                                <div>
                                                                    <dt>Reference</dt>
                                                                    <dd>{model.reference}</dd>
                                                                </div>
                                                                <div>
                                                                    <dt>Additional Info</dt>
                                                                    <dd>{model.info}</dd>
                                                                </div>
                                                            </dl> */}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </article>
                                    );
                                })}
                            </div>

                            <a className="btn-primary product-detail__inquire" href="/#contact">
                                Inquire
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

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
                                Product image preview
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
        </div>
    );
}
