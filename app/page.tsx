import Nav from "./components/Nav";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <LandingPage />
      </main>
      <Footer />
    </>
  );
}
