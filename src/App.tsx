import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Work from "./pages/Work";
import Resume from "./pages/Resume";
import PageTransition from "./components/PageTransition";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Index />
            </PageTransition>
          }
        />
        <Route
          path="/work"
          element={
            <PageTransition>
              <Work />
            </PageTransition>
          }
        />
        <Route
          path="/resume"
          element={
            <PageTransition>
              <Resume />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
