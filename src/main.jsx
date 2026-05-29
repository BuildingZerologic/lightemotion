import React from "react";

import ReactDOM from "react-dom/client";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import App from "./App";

import About from "./pages/About";
import Catalog from "./pages/Catalog";
import Collection from "./pages/Collection";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import ProductRoute from "./pages/ProductRoute";
import Services from "./pages/Services";
import Contact from "./pages/Contact"

import "./styles/main.scss";


const router = createBrowserRouter([
    {
        path: "/",

        element: <App />,

        errorElement: <ErrorPage />,

        children: [
            {
                index: true,

                element: <Home />,

                loader: async () => {
                    return null;
                },
            },
            {
                path: "about",

                element: <About />,
            },
            {
                path: "catalog",

                element: <Catalog />,
            },
            {
                // Editorial collection pages — e.g. /collections/ceiling-presence
                path: "collections/:collectionSlug",

                element: <Collection />,
            },
            {
                path: "product-detail",

                element: <ProductDetail />,
            },
            {
                path: "products/:slug",

                element: <ProductRoute />,
            },
            {
                path: "services",

                element: <Services />,
            },
            {
                path: "contact",

                element: <Contact />,
            },
        ],
    },
]);


ReactDOM.createRoot(
    document.getElementById("root")
).render(
    <React.StrictMode>

        <RouterProvider router={router} />

    </React.StrictMode>
);
