import { useMemo } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { HomeSection } from "./components/sections/HomeSection";
import { WorkSection } from "./components/sections/WorkSection";
import { DesignSection } from "./components/sections/DesignSection";
import { WritingSection } from "./components/sections/WritingSection";
import { MousePositionProvider } from "./contexts/MousePositionContext";
import { Toaster } from "sonner";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeSection = useMemo(() => {
    const path = location.pathname.toLowerCase();
    if (path.startsWith("/work")) return "Work";
    if (path.startsWith("/design")) return "Design";
    if (path.startsWith("/writing")) return "Writing";
    return "Home";
  }, [location.pathname]);

  const handleSectionChange = (section: string) => {
    switch (section) {
      case "Home":
        navigate("/home");
        break;
      case "Work":
        navigate("/work");
        break;
      case "Design":
        navigate("/design");
        break;
      case "Writing":
        navigate("/writing");
        break;
      default:
        navigate("/home");
    }
  };

  return (
    <>
      <MousePositionProvider>
      <div className="flex h-screen overflow-hidden bg-black flex-col md:flex-row">
        <Navigation activeSection={activeSection} onSectionChange={handleSectionChange} />
        <main className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={<HomeSection />} />
              <Route path="/work" element={<WorkSection />} />
              <Route path="/work/:slug" element={<WorkSection />} />
              <Route path="/design" element={<DesignSection />} />
              <Route path="/writing" element={<WritingSection />} />
              <Route path="/writing/:slug" element={<WritingSection />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
        </main>
      </div>
      </MousePositionProvider>
      <Toaster position="bottom-right" theme="dark" />
    </>
  );
}