/**
 * productImages.js
 *
 * Centralized product image resolution utility.
 *
 * Uses import.meta.glob() with eager: true so Vite resolves all asset
 * URLs synchronously at build time. No async resolution needed.
 *
 * Image resolution priority (per product family slug):
 *   1. Vite-optimized asset from src/assets/products/{slug}/{slug}-1.webp
 *   2. Legacy public URL /images/products/families/{slug}/thumbnail.webp
 *   3. Legacy thumbnail path from product data record
 *   4. Global fallback /flexiblestrips.jpg
 *
 * Naming convention for src/assets/products/{slug}/:
 *   {slug}-1.webp       → main / default card image
 *   {slug}-hover.webp   → hover image (desktop only)
 *   {slug}-2.webp       → gallery image 2
 *   {slug}-3.webp       → gallery image 3
 *   {slug}-N.webp       → additional gallery images
 */

// ─────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────

const LEGACY_FAMILIES_ROOT = "/images/products/families";
const FALLBACK_PRODUCT_IMAGE = "/flexiblestrips.jpg";
const FALLBACK_CATEGORY_IMAGE = "/images/catalog/banners/all-products-banner.webp";

// ─────────────────────────────────────────────────────────────────
// Glob registry — eager: true gives synchronous URL strings
// ─────────────────────────────────────────────────────────────────

/**
 * All .webp files under src/assets/products/, resolved synchronously.
 *
 * With eager: true, each value is the fingerprinted asset URL string
 * (e.g. "/assets/led-skyfall-downlight-1-AbCd1234.webp") — available
 * immediately at module load, no Promise awaiting needed.
 *
 * Example:
 *   key:   "../assets/products/led-skyfall-downlight/led-skyfall-downlight-1.webp"
 *   value: { default: "/assets/led-skyfall-downlight-1-AbCd1234.webp" }
 */
const productImageModules = import.meta.glob(
    "../assets/products/**/*.webp",
    { eager: true }
);

// ─────────────────────────────────────────────────────────────────
// Build structured registry — keyed by slug
// ─────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} SlugImageEntry
 * @property {string|null}                 main    - resolved URL for {slug}-1.webp
 * @property {string|null}                 hover   - resolved URL for {slug}-hover.webp
 * @property {{ url: string, index: number }[]} gallery - sorted gallery images
 */

/**
 * Parses the eager glob map once into a per-slug registry.
 * All URLs are plain strings — synchronous, no async needed.
 *
 * @returns {Record<string, SlugImageEntry>}
 */
function buildProductImageRegistry() {
    /** @type {Record<string, SlugImageEntry>} */
    const registry = {};

    for (const [modulePath, mod] of Object.entries(productImageModules)) {
        // modulePath example:
        // "../assets/products/led-skyfall-downlight/led-skyfall-downlight-1.webp"

        const match = modulePath.match(/products\/([^/]+)\/([^/]+)\.webp$/);

        if (!match) {
            continue;
        }

        const slug = match[1];
        const filename = match[2]; // e.g. "led-skyfall-downlight-1"
        const url = mod?.default || null;

        if (!url) {
            continue;
        }

        if (!registry[slug]) {
            registry[slug] = { main: null, hover: null, gallery: [] };
        }

        if (filename.endsWith("-hover")) {
            registry[slug].hover = url;
        } else if (filename.endsWith("-1")) {
            registry[slug].main = url;
        } else {
            // Numbered suffix beyond -1 → gallery image
            const suffixMatch = filename.match(/-(\d+)$/);
            const index = suffixMatch ? parseInt(suffixMatch[1], 10) : 999;
            registry[slug].gallery.push({ url, index });
        }
    }

    // Sort gallery images by numeric suffix: -2, -3, -4, ...
    for (const slug of Object.keys(registry)) {
        registry[slug].gallery.sort((a, b) => a.index - b.index);
    }

    return registry;
}

/** Singleton — built once at module load, fully synchronous */
const PRODUCT_IMAGE_REGISTRY = buildProductImageRegistry();

// ─────────────────────────────────────────────────────────────────
// Path normalisation helpers (for legacy public/ paths)
// ─────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────
// Public API — Image fallback handler
// ─────────────────────────────────────────────────────────────────

/**
 * Progressive img.onError fallback handler.
 * Cycles through fallbackSources until one loads.
 *
 * @param {React.SyntheticEvent} event
 * @param {string[]} fallbackSources
 */
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

// ─────────────────────────────────────────────────────────────────
// Public API — Subcategory hero (stays in public/)
// ─────────────────────────────────────────────────────────────────

/**
 * Returns src + fallback chain for a subcategory hero image.
 * Heroes remain in public/images/subcategories/ — not Vite-imported.
 *
 * @param {string} slug
 * @param {string} [legacyHeroMedia]
 * @returns {{ src: string, fallbackSources: string[] }}
 */
export function getSubcategoryHeroImage(slug, legacyHeroMedia = "") {
    const root = "/images/subcategories";

    return {
        src: `${root}/${slug}/hero.webp`,
        fallbackSources: uniqueSources([
            legacyHeroMedia,
            `${root}/${slug}/hero.jpg`,
            `${root}/${slug}/hero.png`,
            FALLBACK_CATEGORY_IMAGE,
        ]),
    };
}

// ─────────────────────────────────────────────────────────────────
// Public API — Product family thumbnail (main card image)
// ─────────────────────────────────────────────────────────────────

/**
 * Returns src + fallback chain for a product family's main/thumbnail image.
 *
 * Resolution order:
 *   1. Vite asset URL ({slug}-1.webp) — synchronous, available immediately
 *   2. Legacy public URL (/images/products/families/{slug}/thumbnail.webp)
 *   3. Legacy thumbnail from product data record
 *   4. Global fallback
 *
 * @param {{ slug: string, legacyThumbnail?: string }} family
 * @returns {{ src: string, fallbackSources: string[] }}
 */
export function getProductFamilyThumbnailImage(family) {
    const slug = family?.slug || "";
    const entry = PRODUCT_IMAGE_REGISTRY[slug];
    const viteMain = entry?.main || null;

    const legacyPublicUrl = `${LEGACY_FAMILIES_ROOT}/${slug}/thumbnail.webp`;

    return {
        src: viteMain || legacyPublicUrl,
        fallbackSources: uniqueSources([
            viteMain,
            legacyPublicUrl,
            `${LEGACY_FAMILIES_ROOT}/${slug}/thumbnail.jpg`,
            `${LEGACY_FAMILIES_ROOT}/${slug}/thumbnail.png`,
            family?.legacyThumbnail,
            FALLBACK_PRODUCT_IMAGE,
        ]),
    };
}

// ─────────────────────────────────────────────────────────────────
// Public API — Product family hover image
// ─────────────────────────────────────────────────────────────────

/**
 * Returns src + fallback chain for a product family's hover image.
 *
 * Resolution order:
 *   1. Vite asset URL ({slug}-hover.webp) — synchronous
 *   2. Legacy public hover URL
 *   3. Legacy hover thumbnail from product data record
 *   4. Global fallback
 *
 * @param {{ slug: string, legacyHoverThumbnail?: string }} family
 * @returns {{ src: string, fallbackSources: string[] }}
 */
export function getProductFamilyHoverImage(family) {
    const slug = family?.slug || "";
    const entry = PRODUCT_IMAGE_REGISTRY[slug];
    const viteHover = entry?.hover || null;

    const legacyPublicUrl = `${LEGACY_FAMILIES_ROOT}/${slug}/hover.webp`;

    return {
        src: viteHover || legacyPublicUrl,
        fallbackSources: uniqueSources([
            viteHover,
            legacyPublicUrl,
            `${LEGACY_FAMILIES_ROOT}/${slug}/hover.jpg`,
            `${LEGACY_FAMILIES_ROOT}/${slug}/hover.png`,
            family?.legacyHoverThumbnail,
            FALLBACK_PRODUCT_IMAGE,
        ]),
    };
}

// ─────────────────────────────────────────────────────────────────
// Public API — Product family gallery images (detail page)
// ─────────────────────────────────────────────────────────────────

/**
 * Returns an ordered array of { src, fallbackSources, alt } objects
 * for the product detail page gallery.
 *
 * Slot 1 = main image ({slug}-1.webp).
 * Slots 2+ = gallery images ({slug}-2.webp, {slug}-3.webp, …).
 *
 * Guarantees a minimum of 3 slots so ProductGallery always renders.
 * Missing images degrade gracefully via onError fallback chain.
 *
 * @param {{ slug?: string, name?: string, thumbnail?: string }} product
 * @returns {{ src: string, fallbackSources: string[], alt: string }[]}
 */
export function getProductFamilyGalleryImages(product) {
    const slug = product?.slug || "";
    const name = product?.name || "Product";
    const legacyThumbnail = product?.thumbnail || "";

    const entry = PRODUCT_IMAGE_REGISTRY[slug];

    // gallery[] holds entries for -2, -3, ... (not -1 which is main)
    const galleryEntries = entry?.gallery || [];

    // Total slots = 1 (main) + gallery images, minimum 3
    const totalSlots = Math.max(3, 1 + galleryEntries.length);

    return Array.from({ length: totalSlots }, (_, index) => {
        const imageNumber = index + 1; // 1, 2, 3, ...
        const isMain = imageNumber === 1;

        // Vite asset URL — synchronous, no async needed
        let viteUrl = null;

        if (entry) {
            if (isMain) {
                viteUrl = entry.main;
            } else {
                // gallery is 0-indexed: [0] → image number 2, [1] → image number 3 …
                viteUrl = galleryEntries[index - 1]?.url || null;
            }
        }

        const legacyPublicUrl = `${LEGACY_FAMILIES_ROOT}/${slug}/gallery-${imageNumber}.webp`;

        return {
            src: viteUrl || legacyPublicUrl,
            fallbackSources: uniqueSources([
                viteUrl,
                legacyPublicUrl,
                `${LEGACY_FAMILIES_ROOT}/${slug}/gallery-${imageNumber}.jpg`,
                `${LEGACY_FAMILIES_ROOT}/${slug}/gallery-${imageNumber}.png`,
                legacyThumbnail,
                FALLBACK_PRODUCT_IMAGE,
            ]),
            alt: `${name} — view ${imageNumber}`,
        };
    });
}

// ─────────────────────────────────────────────────────────────────
// Public API — Convenience helper: full image set for a slug
// ─────────────────────────────────────────────────────────────────

/**
 * Returns the complete image set for a product family in one call.
 *
 * @param {{ slug: string, name?: string, thumbnail?: string, legacyHoverThumbnail?: string }} family
 * @returns {{
 *   slug: string,
 *   name: string,
 *   images: {
 *     main: { src: string, fallbackSources: string[] },
 *     hover: { src: string, fallbackSources: string[] },
 *     gallery: { src: string, fallbackSources: string[], alt: string }[]
 *   }
 * }}
 */
export function getProductImageSet(family) {
    const slug = family?.slug || "";

    return {
        slug,
        name: family?.name || "",
        images: {
            main: getProductFamilyThumbnailImage(family),
            hover: getProductFamilyHoverImage(family),
            gallery: getProductFamilyGalleryImages(family),
        },
    };
}
