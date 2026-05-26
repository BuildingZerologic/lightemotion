import { useParams } from "react-router-dom";

import { getProductFamilyBySlug } from "../data/productFamilies";

import ProductDetail from "./ProductDetail";
import Subcategory from "./Subcategory";

export default function ProductRoute() {
    const { slug } = useParams();
    const product = getProductFamilyBySlug(slug);

    return product ? <ProductDetail /> : <Subcategory />;
}
