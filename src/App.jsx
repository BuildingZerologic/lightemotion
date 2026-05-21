import { Outlet } from "react-router-dom";

import { Suspense } from "react";

import Footer from "./layout/Footer";
import Navbar from "./layout/Navbar";

export default function App() {
    return (
        <>

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
