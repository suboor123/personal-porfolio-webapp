import React from "react";
import { useSelector } from "react-redux";
import Jumbotron from "src/components/jumbotron";
import TechTag from "src/components/tags";
import { profileSelector, tagSelector } from "src/redux/selectors";
import AboutCard from "./about-card";

const AboutTab = () => {
  const { userProfileModel } = useSelector(profileSelector);
  const { aboutMe, name, designation } = userProfileModel.pluckAll();
  const tags = useSelector(tagSelector)

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-8 mb-4">
          <AboutCard heading="About Me">
            <div>
            <h3>{name}</h3>
            <p className="text-muted">{designation} At {userProfileModel.latestCompanyName}</p>
            <div className="mt-3">
            {aboutMe}
            </div>
            </div>
          </AboutCard>
        </div>

        <div className="col-md-8 mb-4">
          <AboutCard heading="My Skills">
            <TechTag tags={tags.map(tag => tag.name)} />
          </AboutCard>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AboutTab;
