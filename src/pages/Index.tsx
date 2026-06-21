import { useState } from "react";
import LoadingScreen from "../components/LoadingScreen";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SelectedWorks from "../components/SelectedWorks";
import Journal from "../components/Journal";
import Explorations from "../components/Explorations";
import Stats from "../components/Stats";
import Contact from "../components/Contact";
import { useHashScroll } from "../hooks/useHashScroll";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  useHashScroll();

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <Navbar />
      <main>
        <Hero animate={!isLoading} />
        <SelectedWorks />
        <Journal />
        <Explorations />
        <Stats />
        <Contact />
      </main>
    </>
  );
}
