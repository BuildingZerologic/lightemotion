import React from "react";

import ReactDOM from "react-dom/client";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import App from "./App";

import About from "./pages/About";
import Catalog from "./pages/Catalog";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Services from "./pages/Services";

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
                path: "product-detail",

                element: <ProductDetail />,
            },
            {
                path: "services",

                element: <Services />,
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
