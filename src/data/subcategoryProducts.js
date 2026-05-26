import { navigation } from "./navigation";
import { productCollections } from "./products";
import { subcategoryContent } from "./subcategoryContent";
import {
    getProductFamilyHoverImage,
    getProductFamilyThumbnailImage,
    getSubcategoryHeroImage,
} from "../utils/productImages";

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

export function slugify(value = "") {
    return value
        .toString()
        .trim()
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/\+/g, "plus")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function resolveContent(slug) {
    return subcategoryContent[slug] ||
        subcategoryContent[subcategoryContentAliases[slug]];
}

function findNavigationItem(slug) {
    return navigation
        .flatMap((category) => category.subcategories)
        .find((subcategory) => subcategory.slug.split("/").pop() === slug);
}

function countVariants(item) {
    if (!item || typeof item !== "object") {
        return 0;
    }

    const ownVariants = Array.isArray(item.variants) ? item.variants.length : 0;
    const groupedVariants = Array.isArray(item.subGroups)
        ? item.subGroups.reduce((total, group) => total + countVariants(group), 0)
        : 0;
    const nestedProducts = Array.isArray(item.products)
        ? item.products.reduce((total, product) => total + countVariants(product), 0)
        : 0;

    return ownVariants + groupedVariants + nestedProducts;
}

function resolveHoverImage(thumbnail) {
    if (!thumbnail) {
        return "";
    }

    const extensionIndex = thumbnail.lastIndexOf(".");

    if (extensionIndex === -1) {
        return `${thumbnail}-hover`;
    }

    return `${thumbnail.slice(0, extensionIndex)}-hover${thumbnail.slice(extensionIndex)}`;
}

export function getSubcategoryPageData(slug) {
    const navigationItem = findNavigationItem(slug);
    const content = resolveContent(slug);
    const lookupSlugs = new Set([
        slug,
        subcategoryDataAliases[slug],
        navigationItem ? slugify(navigationItem.name) : "",
    ].filter(Boolean));

    const subcategory = productCollections
        .flatMap((collection) => collection.subcategories || [])
        .find((item) => {
            const itemSlug = item.slug || slugify(item.name);
            const itemNameSlug = slugify(item.name);

            return lookupSlugs.has(itemSlug) || lookupSlugs.has(itemNameSlug);
        });

    const title = content?.title || navigationItem?.name || subcategory?.name || "";
    const description = content?.description || "";
    const heroMedia = getSubcategoryHeroImage(slug, content?.heroMedia);

    return {
        title,
        description,
        heroMedia,
        productFamilies: (subcategory?.productFamilies || []).map((family) => ({
            name: family.name,
            slug: family.slug || slugify(family.name),
            image: getProductFamilyThumbnailImage({
                slug: family.slug || slugify(family.name),
                legacyThumbnail: family.thumbnail,
            }),
            hoverImage: getProductFamilyHoverImage({
                slug: family.slug || slugify(family.name),
                legacyHoverThumbnail: resolveHoverImage(family.thumbnail),
            }),
            variantsCount: countVariants(family),
        })),
    };
}
