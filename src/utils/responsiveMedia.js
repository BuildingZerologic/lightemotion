export const responsiveSizes = {
    fullBleed: "100vw",
    editorialGrid: "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
    categoryGrid: "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw",
    productGrid: "(min-width: 1200px) 15vw, (min-width: 1024px) 22vw, (min-width: 768px) 45vw, 100vw",
    denseProductGrid: "(min-width: 1200px) 12vw, (min-width: 1024px) 16vw, (min-width: 768px) 45vw, 100vw",
    productGallery: "(min-width: 1024px) 52vw, 100vw",
};

export function createSingleSourceSet(src, width) {
    if (!src || !width) {
        return undefined;
    }

    return `${src} ${width}w`;
}

export function getPublicProductWidth(src = "") {
    const productMatch = src.match(/prod \((\d+)\)\.jpeg$/);

    if (!productMatch) {
        return 736;
    }

    const knownWidths = {
        10: 600,
        11: 735,
        16: 400,
        17: 670,
        21: 673,
        22: 658,
    };

    return knownWidths[productMatch[1]] || 736;
}
