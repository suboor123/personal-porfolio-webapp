import React, { useEffect, useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "rsuite";
import { GlobalHelpers } from "src/helpers/global-helpers";
import ContactDrawer from "src/pages/contact";
import Search from "../search";
import MobileNav from "./mobile-nav";

type Props = {};

const Navbar: React.FC<Props> = () => {

  const [showContactDrawer, setShowContactDrawer] = useState<boolean>(false);

  const handleOpenContactDrawer = () => setShowContactDrawer(true);
  const handleCloseContactDrawer = () => setShowContactDrawer(false);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleNavToggle = () => {
    GlobalHelpers.toggleSidebar();
  };

  return (
    <>
      <MobileNav />
      <div className="navbar-main-dark sticky-top dark-bg">
        <div className="container-fluid">
          <div className="navbar-inr">
            <div className="logo-otr">
              <Link to="/" className="logo-inr">
                <img
                style={{width: '250px'}}
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
                  <Link to="/" className="nav-a body-sb">
                    Home
                  </Link>
                </li>

                <li className="nav-li">
                  <Link to="/explore" className="nav-a body-sb">
                    Explore
                  </Link>
                </li>

                <li className="nav-li">
                  <Link to="/projects" className="nav-a body-sb">
                    Projects
                  </Link>
                </li>

                <li className="nav-li">
                  <Link to="/blogs" className="nav-a body-sb">
                    Blogs
                  </Link>
                </li>

                <li className="nav-li">       
                    <Link to="/live-sessions" className="nav-a body-sb">
                    <BsCircleFill style={{color: 'red', fontSize: '9px'}} /> LIVE Sessions 
                    </Link>      
                </li>

                <li className="nav-li">       
                    <Link to="/how-did-i-make-it" className="nav-a body-sb">Clone Project 
                    </Link>      
                </li>


              </ul>
            </div>
            <div className="action-otr">
              <a
                onClick={handleOpenContactDrawer}
                className="btn-outline1 btn-wallet"
                id="contact-btn"
              >
                Send Message
              </a>
            </div>
            <div className="burger-menu" onClick={handleNavToggle}>
              <div className="burger-icon-otr">
                <svg
                  className="burger-icon"
                  width={24}
                  height={24}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.75 12h16.5M4 6h9M11 18h9"
                    stroke="#999"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactDrawer
        show={showContactDrawer}
        handleClose={handleCloseContactDrawer}
      />
    </>
  );
};

export default Navbar;
