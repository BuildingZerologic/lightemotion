import { Outlet } from "react-router-dom";

import { Suspense } from "react";

import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";
import ScrollToTop from "./layout/ScrollToTop";

export default function App() {
    return (
        <>

            <ScrollToTop />

            <Navbar />

            <Suspense fallback={<div>Loading luxurious experience...</div>}>

                <main>
                    <Outlet />
                </main>

            </Suspense>

            <Footer />

        </>
    );
}
