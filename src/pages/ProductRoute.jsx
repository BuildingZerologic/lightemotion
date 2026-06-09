import { useParams } from "react-router-dom";

import { getProductFamilyBySlug } from "../data/productFamilies";
import { getSubcategoryPageData } from "../data/subcategoryProducts";

import ErrorPage from "./ErrorPage";
import ProductDetail from "./ProductDetail";
import Subcategory from "./Subcategory";

export default function ProductRoute() {
    const { slug } = useParams();
    const product = getProductFamilyBySlug(slug);

    if (product) {
        return <ProductDetail />;
    }

    const subcategory = getSubcategoryPageData(slug);

    if (subcategory.isValid) {
        return <Subcategory />;
    }

    return (
        <ErrorPage
            title="Product category not found"
            message="This product category is unavailable or may have been renamed."
        />
    );
}
