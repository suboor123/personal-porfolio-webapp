import React from "react";
import { BsFillHeartFill, BsGithub, BsInstagram, BsLinkedin } from "react-icons/bs";
import { useSelector } from "react-redux";
import { profileSelector } from "src/redux/selectors";

const Footer = () => {

  const { userProfileModel } = useSelector(profileSelector);
  const d =  new Date();


  return (
    <div className="copy-otr-dark">
      <div className="container-fluid">
        <div className="copy-inr">
          <div className="language-selector" style={{cursor: 'no-drop'}}>
            <ul className="language-ul" style={{cursor: 'no-drop'}}>
              <li className="language-li" style={{cursor: 'no-drop'}}>
                <a className="language-a" style={{cursor: 'no-drop'}}>
                  <img style={{cursor: 'no-drop'}}
                    className="flag-img"
                    src="../assets/img/flag-img1.png"
                    alt="flag-img"
                  />
                  <p className="body-sb language" style={{cursor: 'no-drop'}}>English</p>
                  <svg style={{cursor: 'no-drop'}}
                    className="caret-down"
                    width={12}
                    height={8}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 1.5l-5 5-5-5"
                      stroke="#666"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="copy-name body-s">
            SuboorKhan © {d.getFullYear()} designed and devloped by{" "}
            <BsFillHeartFill style={{ color: "pink" }} />
          </div>
          {(userProfileModel.attributes as any).data && <div className="privacy-link">
            <a
              target={"_blank"}
              href={userProfileModel.pluck('social').instagramUrl}
              className="mx-3 social-icon"
            >
              <BsInstagram />
            </a>

            <a
              target={"_blank"}
              href={userProfileModel.pluck('social').githubUrl}
              className="mx-3 social-icon"
            >
              <BsGithub />
            </a>

            <a
              target={"_blank"}
              href={userProfileModel.pluck('social').linkedInUrl}
              className="mx-3 social-icon"
            >
              <BsLinkedin />
            </a>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Footer;
