import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import Work from "./pages/Work";
import Resume from "./pages/Resume";
import PageTransition from "./components/PageTransition";

const ROUTES = [
  { path: "/", Page: Index },
  { path: "/work", Page: Work },
  { path: "/resume", Page: Resume },
];

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {ROUTES.map(({ path, Page }) => (
          <Route
            key={path}
            path={path}
            element={
              <PageTransition>
                <Page />
              </PageTransition>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
}
