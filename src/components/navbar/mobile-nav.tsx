import React from "react";
import { BsCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GlobalHelpers } from "src/helpers/global-helpers";
import Footer from "../footer";
import Search from "../search";
import RouteChangeDetector from "./route-change-detector";

const MobileNav: React.FC = () => {
  return (
    <div id="myWebNav" className="overlay-content-otr-dark">
      <div id="modalContent" className="modal-content-custom">
        <div className="overlay-content">
          <svg
            onClick={GlobalHelpers.toggleSidebar}
            className="icon-close"
            width={18}
            height={18}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 1L1 17M17 17L1 1"
              stroke="#CFCFCF"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="logo-otr">
            <Link to="/" className="logo-inr">
              <img
                style={{ width: "250px" }}
                className="logo img-fluid"
                src="/assets/logo.png"
                alt="brand-logo"
              />
            </Link>
          </div>
          <Search />
          <div className="navigation-otr">
            <ul className="navigation-inr">
              <li className="nav-li">
                <Link to="/" className="nav-a heading-h4">
                  Home
                </Link>
              </li>

              <li className="nav-li">
                <Link to="/explore" className="nav-a heading-h4">
                  Explore
                </Link>
              </li>

              <li className="nav-li">
                <Link to="/projects" className="nav-a heading-h4">
                  Projects
                </Link>
              </li>

              <li className="nav-li">
                <Link to="/blogs" className="nav-a heading-h4">
                  Blogs
                </Link>
              </li>

              <li className="nav-li">
                <Link to="/live-sessions" className="nav-a heading-h4">
                  LIVE Sessions{" "}
                  <BsCircleFill style={{ color: "red", fontSize: "9px" }} />
                </Link>
              </li>
            </ul>
          </div>
          <div className="action-otr">
            <a
              onClick={() => {
                GlobalHelpers.toggleSidebar();
                GlobalHelpers.openContactForm();
              }}
              className="btn-fill btn-create"
            >
              Send Message
            </a>
          </div>
          <RouteChangeDetector />
         <Footer />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
