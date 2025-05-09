import PortfolioLayout from "../components/PortfolioLayout";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import TimelineSection from "../components/TimelineSection";
import ContactSection from "../components/ContactSection";

const Index = () => {
  return (
    <PortfolioLayout>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TimelineSection />
      <ContactSection />
    </PortfolioLayout>
  );
};

export default Index;
