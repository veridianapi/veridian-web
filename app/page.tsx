import { Suspense } from "react";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import PaddleCheckout from "./components/PaddleCheckout";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <LandingPage />
      </main>
      <Footer />
      <Suspense>
        <PaddleCheckout />
      </Suspense>
    </>
  );
}
