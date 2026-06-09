// editorialCollections.js
// Maps homepage editorial sections to internal mega menu taxonomy.
// Homepage titles are curated editorial names — NOT technical mega menu names.

import ceilingPresence from "../assets/categories/ceiling-presence.webp";
import linearWall from "../assets/categories/linear-wall.webp";
import outlineWall from "../assets/categories/outline.jpg";
import gardenLighting from "../assets/categories/garden.webp";
import sculpturalLighting from "../assets/categories/sculpture.webp";
import accentDrama from "../assets/categories/accent-drama.jpg";
import watersideLighting from "../assets/categories/waterside.webp";


export const editorialCollections = [
    {
        // — Homepage editorial entry point
        slug: "ceiling-presence",
        title: "Ceiling Lights",
        subtitle: "Recessed and trimless ceiling lighting",
        description:
            "Recessed, trimless, and anti-glare ceiling lights that keep the room calm and visually clean.",

        // — Image: use existing category asset until dedicated editorial images are added
        image: ceilingPresence,
        imageAlt: "Deep recessed downlight casting a precise cone of warm light in a minimal interior",

        // — Internal mega menu subcategory slugs this collection aggregates
        subcategorySlugs: [
            "deep-recessed-antiglare",
            "trimless-downlights",
            "wallwasher-downlights",
            "narrow-beam-downlights",
        ],
    },

    {
        slug: "the-living-wall",
        title: "Wall Lights",
        subtitle: "Wall washing and surface lighting",
        description:
            "Wall-wash and vertical lighting that brings texture, depth, and material surfaces forward.",

        image: linearWall,
        imageAlt: "Warm light uniformly washing a textured stone wall in a luxury hospitality interior",

        subcategorySlugs: [
            "wallwasher-downlights",
            "facade-tree-uplighting",
            "linear-wall-washers",
        ],
    },

    {
        slug: "outline-the-space",
        title: "Strip Lights",
        subtitle: "Linear and cove lighting",
        description:
            "Strip lights, cove lighting, and clean linear systems that trace edges and geometry.",

        image: outlineWall,
        imageAlt: "Continuous cove of warm light running along a ceiling perimeter in a modern interior",

        subcategorySlugs: [
            "flexible-led-strips",
            "cob-dotless-strips",
            "tunable-white-strips",
            "neon-flex-lighting",
            "architectural-profiles",
        ],
    },

    {
        slug: "garden-after-dark",
        title: "Outdoor Lights",
        subtitle: "Garden and exterior lighting",
        description:
            "Garden, facade, pathway, and exterior lights for outdoor spaces after dark.",

        image: gardenLighting,
        imageAlt: "Architectural garden lighting illuminating palm trees and a stone-paved pathway at dusk",

        subcategorySlugs: [
            "garden-landscape-spotlights",
            "facade-tree-uplighting",
            "inground-lights",
            "pathway-foot-lights",
            "outdoor-wall-lights",
        ],
    },

    {
        slug: "sculptural-light",
        title: "Decorative Lights",
        subtitle: "Statement lighting and pendants",
        description:
            "Decorative fixtures, pendants, chandeliers, and lamps chosen for visual presence.",

        image: sculpturalLighting,
        imageAlt: "A sculptural marble pendant light suspended over a stone dining table",

        subcategorySlugs: [
            "chandeliers",
            "pendant-lighting",
            "wall-lights-sconces",
            "table-floor-lamps",
        ],
    },

    {
        slug: "accent-and-drama",
        title: "Spot Lights",
        subtitle: "Focused accent lighting",
        description:
            "Narrow beam and adjustable spots for art, details, displays, and focused highlights.",

        image: accentDrama,
        imageAlt: "A single sharp cone of warm accent light illuminating an artwork in a gallery-like space",

        subcategorySlugs: [
            "narrow-beam-downlights",
            "adjustable-downlights",
            "miniature-niche-lighting",
            "surface-mounted-spotlights",
        ],
    },

    {
        slug: "waterside",
        title: "Pool Lights",
        subtitle: "Water feature lighting",
        description:
            "Underwater, pool, fountain, and waterproof lighting for water features and wet zones.",

        image: watersideLighting,
        imageAlt: "A luxury swimming pool glowing from within at dusk, warm light reflecting on the water surface",

        subcategorySlugs: [
            "underwater-fountain-lighting",
            "waterproof-linear-lighting",
            "inground-lights",
        ],
    },
];

export function getCollectionBySlug(slug) {
    return editorialCollections.find((collection) => collection.slug === slug) || null;
}
