import React from "react";
import { BsInstagram, BsGithub, BsLinkedin } from "react-icons/bs";
import { useSelector } from "react-redux";
import { profileSelector } from "src/redux/selectors";
import Tooltip from "react-simple-tooltip";
import CopyInput from "src/components/inputs/copy-input";

const HeroAbout = () => {
  const { userProfileModel } = useSelector(profileSelector);
  const { imageUrl, coverImageUrl, name, designation, social, ...userProfile } =
    userProfileModel.pluckAll();
  return (
    <>
      <div
        className="user-img"
        style={{
          background: `url(${coverImageUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="creator-img-otr">
          <img className="creator-img" src={imageUrl} alt={name} />
        </div>
      </div>
      <div className="another-user">
        <div className="another-user-top">
          <div className="another-user-left">
            <div className="user-main">
              <h3 className="user-head heading-h4">{name} </h3>

              <div className="check-otr">
                <svg
                  className="check-icon"
                  width={14}
                  height={14}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.813 3.938l-6.126 6.124L2.626 7"
                    stroke="#fff"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>

            <a className="address-main">
              <CopyInput text={social.instagramUrl} />
            </a>
          </div>
          <div className="another-user-right">
            <Tooltip content="Instagram">
              <a
                target={"_blank"}
                href={social.instagramUrl}
                className="mx-3 social-icon"
              >
                <BsInstagram />
              </a>
            </Tooltip>
            <Tooltip content="Github">
              <a
                target={"_blank"}
                href={social.githubUrl}
                className="mx-3 social-icon"
              >
                <BsGithub />
              </a>
            </Tooltip>

            <Tooltip content="LinkedIn">
              <a
                target={"_blank"}
                href={social.linkedInUrl}
                className="mx-3 social-icon"
              >
                <BsLinkedin />
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroAbout;
