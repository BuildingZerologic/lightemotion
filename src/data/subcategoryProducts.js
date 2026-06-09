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
    "stadium-lighting": "sports-stadium-lighting",
};

const subcategoryDataAliases = {
    "garden-landscape-spotlights": "led-garden-light",
    "facade-tree-uplighting": "led-facade-and-tree-up-lighter",
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

    const allFamilies = productCollections
        .flatMap((collection) => collection.subcategories || [])
        .flatMap((sub) => sub.productFamilies || []);

    // First try to perfectly match product families by their own `subcategory` field
    let matchedFamilies = allFamilies.filter((family) => {
        if (family.subcategory) {
            return lookupSlugs.has(slugify(family.subcategory));
        }
        return false;
    });

    let subcategoryObj = null;

    // If no families have this exact subcategory field, fallback to matching the parent subcategory
    if (matchedFamilies.length === 0) {
        subcategoryObj = productCollections
            .flatMap((collection) => collection.subcategories || [])
            .find((item) => {
                const itemSlug = item.slug || slugify(item.name);
                const itemNameSlug = slugify(item.name);

                return lookupSlugs.has(itemSlug) || lookupSlugs.has(itemNameSlug);
            });

        if (subcategoryObj) {
            matchedFamilies = subcategoryObj.productFamilies || [];
        }
    }

    // Always resolve subcategoryObj so we can read metadata flags (e.g. isDecorativeListing)
    if (!subcategoryObj) {
        subcategoryObj = productCollections
            .flatMap((collection) => collection.subcategories || [])
            .find((item) => {
                const itemSlug = item.slug || slugify(item.name);
                const itemNameSlug = slugify(item.name);

                return lookupSlugs.has(itemSlug) || lookupSlugs.has(itemNameSlug);
            });
    }

    const title = content?.title || navigationItem?.name || subcategoryObj?.name || "";
    const description = content?.description || "";
    const heroMedia = getSubcategoryHeroImage(slug, content?.heroMedia);
    const isValid = Boolean(navigationItem || content || subcategoryObj || matchedFamilies.length > 0);

    // Build decorative product grid when subcategory is flagged as a curated listing.
    // Returns a flat array of up to 12 items — { name, slug, image } — for the image card grid.
    const isDecorativeListing = Boolean(subcategoryObj?.isDecorativeListing);
    let decorativeProducts = null;

    if (isDecorativeListing) {
        // Primary: extract individual named models from subGroups → variants OR family → variants
        const allModels = matchedFamilies.flatMap((family) => {
            const subGroupVariants = (family.subGroups || []).flatMap((group) =>
                (group.variants || []).map((v) => ({
                    name: v.model,
                    slug: `${slug}/${slugify(v.model)}`,
                }))
            );

            const directVariants = (family.variants || []).map((v) => ({
                name: v.model,
                slug: `${slug}/${slugify(v.model)}`,
            }));

            return [...subGroupVariants, ...directVariants];
        });

        if (allModels.length > 0) {
            // Subcategory has individual models (Chandeliers, Pendants, etc.)
            decorativeProducts = allModels.map((item) => ({
                name: item.name,
                slug: item.slug,
                image: getProductFamilyThumbnailImage({ slug: item.slug }),
            }));

        } else {
            // Fallback: no model-level data — show the product families themselves as cards
            // (e.g. Decorative Linear Shapes with family-level entries only)
            decorativeProducts = matchedFamilies.map((family) => ({
                name: family.name,
                slug: family.slug || slugify(family.name),
                image: getProductFamilyThumbnailImage({
                    slug: family.slug || slugify(family.name),
                    legacyThumbnail: family.thumbnail,
                }),
            }));
        }
    }

    return {
        isValid,
        title,
        description,
        heroMedia,
        decorativeProducts,
        productFamilies: matchedFamilies.map((family) => ({
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
