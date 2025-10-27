import { useState } from "react";
import HeaderNav from "./components/HeaderNav";
import HeroSection from "./components/HeroSection";
import SectionTabs from "./components/SectionTabs";
import AppFooter from "./components/AppFooter";

function App() {
  const [tab, setTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <HeaderNav active={tab} onSelect={setTab} />
      <HeroSection />
      <SectionTabs value={tab} onChange={setTab} />
      <AppFooter />
    </div>
  );
}

export default App;
