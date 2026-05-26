import { productCollections } from "./products";

export function getProductFamilyBySlug(slug) {
    return productCollections
        .flatMap((collection) => collection.subcategories || [])
        .flatMap((subcategory) => subcategory.productFamilies || [])
        .find((productFamily) => productFamily.slug === slug);
}
