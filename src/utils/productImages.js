const PRODUCT_IMAGES_ROOT = "/images/products";
const FALLBACK_PRODUCT_IMAGE = "/flexiblestrips.jpg";
const FALLBACK_CATEGORY_IMAGE = "/images/catalog/banners/all-products-banner.webp";
const GALLERY_IMAGE_COUNT = 3;

function normalizePublicPath(path = "") {
    if (!path) {
        return "";
    }

    if (path.startsWith("/")) {
        return path;
    }

    return `/${path.replace(/^assets\//, "")}`;
}

function uniqueSources(sources = []) {
    return [...new Set(sources.filter(Boolean).map(normalizePublicPath))];
}

export function resolveImageFallback(event, fallbackSources = []) {
    const image = event.currentTarget;
    const fallbackIndex = Number(image.dataset.fallbackIndex || 0);
    const nextSource = uniqueSources(fallbackSources)[fallbackIndex];

    if (!nextSource) {
        image.removeAttribute("src");
        return;
    }

    image.dataset.fallbackIndex = String(fallbackIndex + 1);
    image.src = nextSource;
}

export function getSubcategoryHeroImage(slug, legacyHeroMedia = "") {
    return {
        src: `${PRODUCT_IMAGES_ROOT}/subcategories/${slug}/hero.webp`,
        fallbackSources: uniqueSources([
            legacyHeroMedia,
            `${PRODUCT_IMAGES_ROOT}/subcategories/${slug}/hero.jpg`,
            `${PRODUCT_IMAGES_ROOT}/subcategories/${slug}/hero.png`,
            FALLBACK_CATEGORY_IMAGE,
        ]),
    };
}

export function getProductFamilyThumbnailImage(family) {
    const familySlug = family.slug;

    return {
        src: `${PRODUCT_IMAGES_ROOT}/families/${familySlug}/thumbnail.webp`,
        fallbackSources: uniqueSources([
            `${PRODUCT_IMAGES_ROOT}/families/${familySlug}/thumbnail.jpg`,
            `${PRODUCT_IMAGES_ROOT}/families/${familySlug}/thumbnail.png`,
            family.legacyThumbnail,
            FALLBACK_PRODUCT_IMAGE,
        ]),
    };
}

export function getProductFamilyHoverImage(family) {
    const familySlug = family.slug;

    return {
        src: `${PRODUCT_IMAGES_ROOT}/families/${familySlug}/hover.webp`,
        fallbackSources: uniqueSources([
            `${PRODUCT_IMAGES_ROOT}/families/${familySlug}/hover.jpg`,
            `${PRODUCT_IMAGES_ROOT}/families/${familySlug}/hover.png`,
            family.legacyHoverThumbnail,
            FALLBACK_PRODUCT_IMAGE,
        ]),
    };
}

export function getProductFamilyGalleryImages(product) {
    const productSlug = product?.slug || "";
    const legacyThumbnail = product?.thumbnail || "";

    return Array.from({ length: GALLERY_IMAGE_COUNT }, (_, index) => {
        const imageNumber = index + 1;

        return {
            src: `${PRODUCT_IMAGES_ROOT}/families/${productSlug}/gallery-${imageNumber}.webp`,
            fallbackSources: uniqueSources([
                `${PRODUCT_IMAGES_ROOT}/families/${productSlug}/gallery-${imageNumber}.jpg`,
                `${PRODUCT_IMAGES_ROOT}/families/${productSlug}/gallery-${imageNumber}.png`,
                legacyThumbnail,
                FALLBACK_PRODUCT_IMAGE,
            ]),
            alt: `${product?.name || "Product"} view ${imageNumber}`,
        };
    });
}
