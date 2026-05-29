// collectionProducts.js
// Aggregates product families across multiple subcategory slugs
// for use on the editorial Collection page.

import { productCollections } from "./products";
import { subcategoryContent } from "./subcategoryContent";
import {
    getProductFamilyThumbnailImage,
    getProductFamilyHoverImage,
    getSubcategoryHeroImage,
} from "../utils/productImages";
import { slugify } from "./subcategoryProducts";

// ——— slug aliasing identical to subcategoryProducts.js ———
const subcategoryContentAliases = {
    "narrow-beam-downlights": "narrow-beam-pin-spot-downlights",
    "multi-module-downlights": "twin-multi-module-downlights",
    "decorative-linear-lighting": "decorative-linear-suspended-lighting",
    "decorative-suspended-lighting": "decorative-linear-suspended-lighting",
    "stadium-lighting": "sports-stadium-lighting",
};

const subcategoryDataAliases = {
    "garden-landscape-spotlights": "led-garden-light",
    "facade-tree-uplighting": "led-facade-tree-up-lighter",
    "linear-wall-washers": "led-linear-wallwasher",
    "inground-lights": "led-inground-burial",
    "pathway-foot-lights": "led-foot-light",
    "underwater-fountain-lighting": "led-underwater-light",
    "outdoor-wall-lights": "led-outdoor-wall-light",
    "gate-pillar-lights": "led-gate-light",
    "bollard-planter-lights": "led-bollard-planter",
    "outdoor-pole-lights": "led-outdoor-pole-light",
    "flexible-led-strips": "led-flexible-strip",
    "pixel-dynamic-rgb-lighting": "led-rgb-controllers",
    "lighting-controls-dimming": "led-rgb-controllers",
    "sensors-smart-controls": "sensors",
    "drivers-power-supplies": "led-power-supply",
    "architectural-profiles": "led-aluminum-profiles",
    "neon-flex-lighting": "led-flex-neon",
};

function resolveHoverPath(thumbnail) {
    if (!thumbnail) return "";
    const ext = thumbnail.lastIndexOf(".");
    if (ext === -1) return `${thumbnail}-hover`;
    return `${thumbnail.slice(0, ext)}-hover${thumbnail.slice(ext)}`;
}

function countVariants(item) {
    if (!item || typeof item !== "object") return 0;
    const own = Array.isArray(item.variants) ? item.variants.length : 0;
    const grouped = Array.isArray(item.subGroups)
        ? item.subGroups.reduce((t, g) => t + countVariants(g), 0)
        : 0;
    const nested = Array.isArray(item.products)
        ? item.products.reduce((t, p) => t + countVariants(p), 0)
        : 0;
    return own + grouped + nested;
}

function findSubcategoryBySlug(slug) {
    const lookupSlugs = new Set(
        [slug, subcategoryDataAliases[slug]].filter(Boolean)
    );

    return productCollections
        .flatMap((col) => col.subcategories || [])
        .find((sub) => {
            const itemSlug = sub.slug || slugify(sub.name);
            const itemNameSlug = slugify(sub.name);
            return lookupSlugs.has(itemSlug) || lookupSlugs.has(itemNameSlug);
        });
}

function resolveSubcategoryContent(slug) {
    return (
        subcategoryContent[slug] ||
        subcategoryContent[subcategoryContentAliases[slug]]
    );
}

/**
 * Returns grouped product families for an editorial collection.
 *
 * @param {string[]} subcategorySlugs  — the slugs from editorialCollections.js
 * @returns {{ subcategoryTitle: string, subcategorySlug: string, productFamilies: object[] }[]}
 */
export function getCollectionPageData(subcategorySlugs = []) {
    const seen = new Set(); // prevent duplicate product family slugs across subcategories

    return subcategorySlugs
        .map((slug) => {
            const content = resolveSubcategoryContent(slug);
            const subcategory = findSubcategoryBySlug(slug);

            if (!subcategory) return null;

            const families = (subcategory.productFamilies || [])
                .filter((family) => {
                    const familySlug = family.slug || slugify(family.name);
                    if (seen.has(familySlug)) return false;
                    seen.add(familySlug);
                    return true;
                })
                .map((family) => {
                    const familySlug = family.slug || slugify(family.name);
                    return {
                        name: family.name,
                        slug: familySlug,
                        image: getProductFamilyThumbnailImage({
                            slug: familySlug,
                            legacyThumbnail: family.thumbnail,
                        }),
                        hoverImage: getProductFamilyHoverImage({
                            slug: familySlug,
                            legacyHoverThumbnail: resolveHoverPath(family.thumbnail),
                        }),
                        variantsCount: countVariants(family),
                    };
                });

            if (families.length === 0) return null;

            return {
                subcategoryTitle: content?.title || subcategory.name,
                subcategorySlug: slug,
                heroMedia: getSubcategoryHeroImage(slug, content?.heroMedia),
                productFamilies: families,
            };
        })
        .filter(Boolean);
}
