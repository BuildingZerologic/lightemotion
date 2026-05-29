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
        title: "Ceiling Presence",
        subtitle: "Anti-glare downlights and invisible light sources",
        description:
            "Architecture refined to its most essential expression — light that emerges without a source. Precision-engineered recessed systems and seamless trimless solutions that dissolve into the ceiling plane, leaving only calm, directed illumination.",

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
        title: "The Living Wall",
        subtitle: "Wall washing, grazing, and vertical surface illumination",
        description:
            "Light that reveals texture, materiality, and depth. Asymmetric optical systems that wash vertical surfaces with homogeneous luminance — transforming stone, concrete, timber, and plaster into architectural statements.",

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
        title: "Outline the Space",
        subtitle: "Cove lighting, linear profiles, and continuous light lines",
        description:
            "Continuous ribbons of light that trace the geometry of a room. Seamless cove illumination, dotless COB strips, and precision aluminum profiles that define architectural edges with calm, unbroken luminance.",

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
        title: "Garden After Dark",
        subtitle: "Landscape, tree, and facade lighting for the exterior world",
        description:
            "The garden transformed by nightfall. Precision exterior luminaires that uplift tree canopies, wash facade surfaces, and guide pathways — creating immersive outdoor environments at dusk and beyond.",

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
        title: "Sculptural Light",
        subtitle: "Chandeliers, pendants, and statement decorative pieces",
        description:
            "Light as object. As sculpture. As presence. Curated decorative luminaires in marble, glass, ceramic, and natural materials — each piece designed to occupy space with intention and beauty.",

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
        title: "Accent & Drama",
        subtitle: "Narrow beam spots and precision accent lighting",
        description:
            "The art of contrast. Ultra-narrow beam optics and precision adjustable spotlights that carve light from darkness — ideal for galleries, hospitality, residential art walls, and product showcasing.",

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
        title: "Waterside",
        subtitle: "Pool, fountain, and underwater illumination",
        description:
            "Light beneath the surface. IP68-certified submersible luminaires and waterproof linear systems engineered for swimming pools, water features, and fountain installations — where luminance and reflection meet.",

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
