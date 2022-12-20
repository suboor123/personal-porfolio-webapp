import React from "react";
import { BsBuilding, BsCodeSquare, BsHeart } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { profileSelector, projectSelector } from "src/redux/selectors";
import Button from "../button/user-button";
import CompletedStuff from "./completed-stuff";
import HeroCard from "./hero-card";
import HeroSlider from "./hero-slider";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      item: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      marquee: any;
    }
  }
}

const HeroSection: React.FC = () => {
  const { userProfileModel } = useSelector(profileSelector);
  const { imageUrl, name, designation, social, aboutMe, companies } =
    userProfileModel?.pluckAll();

  const navigate = useNavigate();

  const company = companies[companies.length - 1];

  const projects = useSelector(projectSelector);

  return (
    <div className="main-hero-dark">
      <div className="hero-main-inr">
        <div className="hero-mainn">
          <div className="container-fluid">
            <div className="hero-inr">
              <div className="row row-custom">
                <div className="col-lg-6 col-content-otr">
                  <div className="col-content-inr">
                    <div className="head-otr">
                      <h1 className="heading-h1 heading titleGreathorned">
                        {name} <br />
                        Creative Web & Mobile app Developer
                      </h1>
                      <p className="lead mt-2">{aboutMe}</p>

                      <p className="lead text-white mt-4">
                        <BsBuilding className="text-white" />
                        <b>
                          {" "}
                          <span className="text-white">
                            {designation} at
                          </span>
                        </b>{" "}
                        <b className="text-primary">{company.name}</b>
                      </p>
                      <p className="lead text-white mt-4">
                        <b>
                          <BsCodeSquare /> Current status:
                        </b>{" "}
                        <b className="text-primary">
                          {userProfileModel.pluck("status")}
                        </b>
                      </p>
                    </div>
                    <div className="boxes-main d-block">
                      <CompletedStuff />
                    </div>
                    <div className="action-otr d-block text-center">
                      <div className="text-center">
                        <Button type="outline" onClick={() => navigate(`/explore`)}>
                          <div>
                            <span className="mr-2">
                              {" "}
                              <BsHeart />
                            </span>
                            Explore more
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <HeroCard />
              </div>
            </div>
          </div>
          <HeroSlider />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
