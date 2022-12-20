import React from "react";
import HeroAbout from "./hero-about";
import AboutTabs from "./tabs";

const About = () => {
  return (
<>
<div className="user-profile-otr-dark">
      <div className="container-fluid">
        <div className="wrapper">
          <HeroAbout />
        </div>
        <AboutTabs />
      </div>
    </div>
  
</>
  );
};

export default About;
