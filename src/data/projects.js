const projectEntries = [
    {
        id: 1,
        slug: "raffles-hotel",
        title: "Raffles Hotel",
        category: "Hospitality",
        location: "Jaipur",
        listingImage: "/projects/raffles.webp",
    },
    {
        id: 2,
        slug: "fairmont",
        title: "Fairmont Hotels & Resorts",
        category: "Hospitality",
        location: "Jaipur",
        listingImage: "/projects/fairmont.webp",
        overview: {
            title: "Project Overview",
            body: "Fairmont Hotels & Resorts in Jaipur called for a lighting approach that could support the calm, refined character of the property while enhancing its layered hospitality experience. The brief focused on creating warm, welcoming illumination across arrival, circulation, and guest-facing areas, with enough visual restraint to let the architecture and interiors remain the primary focus.",
        },
        concept: {
            title: "Concept",
            intro: "The concept was developed around understated luxury and visual ease. Rather than relying on strong decorative statements, the lighting was layered to create depth, softness, and a consistent sense of warmth throughout the space.",
            pillars: [
                {
                    label: "01",
                    title: "Quiet Integration",
                    description: "Concealed sources were used to preserve clean architectural lines and allow the interiors to feel resolved rather than over-lit.",
                },
                {
                    label: "02",
                    title: "Warm Layering",
                    description: "Ambient and accent lighting were balanced carefully to introduce softness, guide movement, and maintain hospitality warmth across key guest spaces.",
                },
                {
                    label: "03",
                    title: "Refined Emphasis",
                    description: "Texture, form, and focal moments were highlighted selectively so the experience feels elevated, intimate, and visually calm.",
                },
            ],
        },
        technical: {
            title: "Technical",
            intro: "The lighting scheme was resolved through a quiet balance of concealed illumination, ambient layering, and carefully positioned accent light. Warm-toned light was selected to support the hotel's sense of ease and hospitality, while discreet fixture integration preserved the clarity of the architecture and allowed surfaces, finishes, and proportions to remain visually uninterrupted.",
            items: [
                {
                    label: "Lighting Strategy",
                    value: "Concealed illumination balanced with ambient and accent layers",
                },
                {
                    label: "Colour Temperature",
                    value: "Warm-toned lighting calibrated for hospitality comfort",
                },
                {
                    label: "Fixture Integration",
                    value: "Discreetly integrated to preserve clean architectural lines",
                },
                {
                    label: "Controls",
                    value: "Scene control planned for arrival, lounge, and evening settings",
                },
            ],
        },
        outcome: {
            title: "Outcome",
            body: "The final environment carries a sense of restraint, warmth, and considered luxury. Rather than drawing attention to itself, the lighting settles into the architecture and allows the space to feel more layered, more intimate, and more complete. It supports the hotel experience with a quiet confidence, shaping movement, revealing material depth, and holding a consistent atmospheric presence throughout the property.",
        },
        galleryImages: [
            {
                id: "fairmont-gallery-01",
                src: "/images/projects/fairmont/gallery-01.webp",
                alt: "",
                aspect: "landscape",
            },
            {
                id: "fairmont-gallery-02",
                src: "/images/projects/fairmont/gallery-02.webp",
                alt: "",
                aspect: "portrait",
            },
            {
                id: "fairmont-gallery-03",
                src: "/images/projects/fairmont/gallery-03.webp",
                alt: "",
                aspect: "portrait",
            },
            {
                id: "fairmont-gallery-04",
                src: "/images/projects/fairmont/gallery-04.webp",
                alt: "",
                aspect: "landscape",
            },
        ],
    },
    {
        id: 3,
        slug: "anytime-fitness",
        title: "Anytime Fitness",
        category: "Fitness",
        location: "Delhi NCR, Noida",
        listingImage: "/projects/anytime.avif",
    },
    {
        id: 4,
        slug: "raphe-mphibr",
        title: "Raphe mPhibr Pvt. Ltd.",
        category: "Corporate",
        location: "Noida",
        listingImage: "/projects/raphe.webp",
    },
    {
        id: 5,
        slug: "hsbc",
        title: "HSBC",
        category: "Corporate",
        location: "Vadodara, Indore, Mumbai, Pune",
        listingImage: "/projects/hsbc.webp",
    },
    {
        id: 6,
        slug: "ananta-spa-resort",
        title: "Ananta Spa & Resort",
        category: "Hospitality",
        location: "Ajabgarh",
        listingImage: "/projects/ananta.jpg",
    },
    {
        id: 7,
        slug: "alsisar-haveli",
        title: "Alsisar Haveli",
        category: "Hospitality",
        location: "Jaipur",
        listingImage: "/projects/alsisar.avif",
    },
    {
        id: 8,
        slug: "21-fitness",
        title: "21 Fitness",
        category: "Fitness",
        location: "Delhi NCR",
        listingImage: "/projects/21fitness.jpg",
    },
    {
        id: 9,
        slug: "gail",
        title: "GAIL",
        category: "Corporate",
        location: "Noida & Ranchi",
        listingImage: "/projects/gail.webp",
    },
    {
        id: 10,
        slug: "google-office",
        title: "Google Office",
        category: "Corporate",
        location: "Gurugram",
        listingImage: "/projects/google-gurugram.jpg",
    },
    {
        id: 11,
        slug: "harman-by-samsung",
        title: "Harman by Samsung",
        category: "Corporate",
        location: "Pune",
        listingImage: "/projects/harman.webp",
    },
    {
        id: 12,
        slug: "hyatt-regency",
        title: "Hyatt Regency",
        category: "Hospitality",
        location: "Srinagar",
        listingImage: "/projects/hyatt.webp",
    },
    {
        id: 13,
        slug: "golds-gym",
        title: "Gold's Gym",
        category: "Fitness",
        location: "Gurugram",
        listingImage: "/projects/goldgym.jfif",
    },
    {
        id: 14,
        slug: "g20-summit",
        title: "G20 Summit",
        category: "Institutional",
        location: "India",
        listingImage: "/projects/g20.jpg",
    },
    {
        id: 15,
        slug: "dlf-the-camellias",
        title: "DLF The Camellias",
        category: "Residential",
        location: "Gurugram",
        listingImage: "/projects/dlfcam.webp",
    },
    {
        id: 16,
        slug: "china-garden-hotel",
        title: "China Garden Hotel",
        category: "Hospitality",
        location: "Greater Kailash / Punjabi Bagh",
        listingImage: "/projects/china.jpg",
    },
    {
        id: 17,
        slug: "emaar",
        title: "Emaar",
        category: "Residential",
        location: "Gurugram",
        listingImage: "/projects/emaar.webp",
    },
    {
        id: 18,
        slug: "bounce-trampoline-park",
        title: "Bounce Trampoline Park",
        category: "Entertainment",
        location: "Gurgaon",
        listingImage: "/projects/bounce.webp",
    },
    {
        id: 19,
        slug: "ram-mandir",
        title: "Ram Mandir",
        category: "Religious",
        location: "Jammu",
        listingImage: "/projects/ram-mandir.jpg",
    },
    {
        id: 20,
        slug: "the-mahanta-boutique-hotel",
        title: "The Mahanta Boutique Hotel and Resort",
        category: "Hospitality",
        location: "India",
        listingImage: "/projects/mahanta.avif",
    },
];

function createOverviewContent(project) {
    if (project.overview) {
        return project.overview;
    }

    return {
        title: "Project Overview",
        body: `${project.title} is a ${project.category.toLowerCase()} project in ${project.location} conceived as a calm, architectural lighting environment. This placeholder overview can be replaced with final client-approved copy while preserving the same structure across every project detail page.`,
    };
}

function createConceptContent(project) {
    if (project.concept) {
        return project.concept;
    }

    return {
        title: "Concept",
        intro: `The lighting concept for ${project.title} is currently using structured placeholder content designed to be replaced once final client-approved messaging is available.`,
        pillars: [
            {
                label: "01",
                title: "Spatial Calm",
                description: "Light is treated as a supporting architectural layer, helping the space feel composed, breathable, and visually balanced.",
            },
            {
                label: "02",
                title: "Layered Illumination",
                description: "Ambient, concealed, and accent sources are considered together so the environment gains depth without visual noise.",
            },
            {
                label: "03",
                title: "Material Focus",
                description: "Selective highlights draw attention to texture, proportion, and key surfaces while preserving an understated overall mood.",
            },
        ],
    };
}

function createTechnicalContent(project) {
    if (project.technical) {
        return project.technical;
    }

    return {
        title: "Technical",
        intro: `Technical details for ${project.title} are currently represented with placeholder content so the layout can scale cleanly until final project specifications are confirmed.`,
        items: [
            {
                label: "Lighting Strategy",
                value: "Concealed ambient and selective accent lighting",
            },
            {
                label: "Colour Temperature",
                value: "Warm hospitality-led lighting approach",
            },
            {
                label: "Fixture Integration",
                value: "Architecturally integrated with restrained visual presence",
            },
            {
                label: "Controls",
                value: "Scene-based control planning for layered operation",
            },
        ],
    };
}

function createOutcomeContent(project) {
    if (project.outcome) {
        return project.outcome;
    }

    return {
        title: "Outcome",
        body: `${project.title} now uses a placeholder outcome summary that can be replaced once final project feedback or client-approved language is available. The section is designed to hold a concise editorial conclusion about atmosphere, spatial impact, and the overall guest or user experience.`,
    };
}

function createProjectContent(project) {
    return {
        overview: createOverviewContent(project),
        concept: createConceptContent(project),
        technical: createTechnicalContent(project),
        outcome: createOutcomeContent(project),
    };
}

function createProjectImages(slug, listingImage) {
    return {
        listing: listingImage,
        featured: `/images/projects/${slug}/featured.webp`,
        gallery: createGalleryImages(slug),
    };
}

function createGalleryImages(slug) {
    return [
        {
            id: `${slug}-gallery-01`,
            src: `/images/projects/${slug}/gallery-01.webp`,
            alt: "",
            aspect: "landscape",
        },
        {
            id: `${slug}-gallery-02`,
            src: `/images/projects/${slug}/gallery-02.webp`,
            alt: "",
            aspect: "portrait",
        },
        {
            id: `${slug}-gallery-03`,
            src: `/images/projects/${slug}/gallery-03.webp`,
            alt: "",
            aspect: "portrait",
        },
        {
            id: `${slug}-gallery-04`,
            src: `/images/projects/${slug}/gallery-04.webp`,
            alt: "",
            aspect: "landscape",
        },
    ];
}

function resolveGalleryImages(project) {
    return project.galleryImages || createGalleryImages(project.slug);
}

export const projectCategories = [
    "All",
    ...Array.from(new Set(projectEntries.map((project) => project.category))),
];

export const projects = projectEntries.map((project) => ({
    ...project,
    content: createProjectContent(project),
    images: {
        ...createProjectImages(project.slug, project.listingImage),
        gallery: resolveGalleryImages(project),
    },
}));

export function getProjectBySlug(slug) {
    return projects.find((project) => project.slug === slug) || null;
}
