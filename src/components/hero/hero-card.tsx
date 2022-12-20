import React from "react";
import { useSelector } from "react-redux";
import { profileSelector, selectProjectByLimit } from "src/redux/selectors";
import { BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import { Link } from "react-router-dom";
import useCopyToClipboard from "src/hooks/useCopy";
import CopyInput from "../inputs/copy-input";

const HeroCard = () => {
  const { userProfileModel } = useSelector(profileSelector);
  const { imageUrl, name, designation, social, aboutMe } =
    userProfileModel?.pluckAll();
  const [pm] = useSelector(selectProjectByLimit(1));

  const [val, copy] = useCopyToClipboard();

  return (
    <div className="col-lg-5 col-img-otr">
      <div className="col-img-inr">
        <a className="img-otr img-tilt" data-tilt>
          <img className="artwork-img img-fluid" src={imageUrl} alt={name} />
        </a>
        <div className="create-otr">
          <div className="create-inr w-100" style={{ display: "block" }}>
            <div className="text-center heading-h3 bid-head text-uppercase text-white">
              {name}
            </div>
            <p className="lead text-center text-light">{designation}</p>

            <div className="hover-box">
              <div className="hover-box-inr">
                <div className="user-info">
                  <a className="create-img">
                    <img className="img-create" src={imageUrl} alt={name} />
                    <div className="check-otr">
                      <svg
                        className="check-icon"
                        width={10}
                        height={10}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.438 2.813L4.061 7.188 1.876 5"
                          stroke="#fff"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </a>
                  <a
                    className="btn-outline2 follow-btn"
                    target="_blank"
                    href={social.instagramUrl}
                  >
                    <a className="text-white d-inline">
                      <BsInstagram className="mr-2" />
                    </a>
                    Follow
                  </a>
                </div>
                <p className="post-title body-lb">{name}</p>
                <CopyInput text={social.instagramUrl} />
                <p
                  className="post-desc body-s"
                  style={{
                    height: "100px",
                    overflow: "hidden",
                  }}
                >
                  {aboutMe}
                </p>{" "}
                <Link to="/explore" className="text-link text-primary">
                  Read more
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="d-flex justify-content-center">
          <a
            target={"_blank"}
            href={social.instagramUrl}
            className="mx-3 social-icon"
          >
            <BsInstagram />
          </a>
          <a
            target={"_blank"}
            href={social.githubUrl}
            className="mx-3 social-icon"
          >
            <BsGithub />
          </a>
          <a
            target={"_blank"}
            href={social.linkedInUrl}
            className="mx-3 social-icon"
          >
            <BsLinkedin />
          </a>
        </div>
      </div>
      <div className="bg-gradient">
        <div className="bg-gradient-inr"></div>
      </div>
    </div>
  );
};

export default HeroCard;


