import React, { lazy } from "react";

import ReactDOM from "react-dom/client";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import App from "./App";

import ErrorPage from "./pages/ErrorPage";

import "./styles/main.scss";

function lazyElement(resolvePage) {
    const Page = lazy(resolvePage);
    return <Page />;
}

const router = createBrowserRouter([
    {
        path: "/",

        element: <App />,

        errorElement: <ErrorPage />,

        children: [
            {
                index: true,

                element: lazyElement(() => import("./pages/Home")),
            },
            {
                path: "about",

                element: lazyElement(() => import("./pages/About")),
            },

            {
                // Editorial collection pages — e.g. /collections/ceiling-presence
                path: "collections/:collectionSlug",

                element: lazyElement(() => import("./pages/Collection")),
            },
            {
                path: "product-detail",

                element: lazyElement(() => import("./pages/ProductDetail")),
            },
            {
                path: "products/:slug",

                element: lazyElement(() => import("./pages/ProductRoute")),
            },
            {
                path: "services",

                element: lazyElement(() => import("./pages/Services")),
            },
            {
                path: "contact",

                element: lazyElement(() => import("./pages/Contact")),
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
