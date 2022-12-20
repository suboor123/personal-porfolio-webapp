import React from "react";
import { useSelector } from "react-redux";
import HeroSection from "src/components/hero";
import SkillHero from "src/components/skill-hero";
import { profileSelector } from "src/redux/selectors";
import BlogSlider from "./blog-slider";
import ProjectSlider from "./project-slider";
import SessionDemo from "./session-demo";
import { Testimonials } from "./testimonials";

const Home: React.FC = () => {
  const { userProfileModel } = useSelector(profileSelector);

  return (
    <React.Fragment>
      <HeroSection />
      <ProjectSlider />
      <SessionDemo />
      <BlogSlider />
      <SkillHero />
      <Testimonials />
    </React.Fragment>
  );
};

export default Home;
