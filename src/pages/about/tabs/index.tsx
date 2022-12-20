import React, { useState } from "react";
import AboutTab from "./about";
import AcheivementTab from "./acheivement";
import { TabContent, Tabs } from "./constants";
import EmploymentTab from "./employment";
import ProjectTab from "./project";

const AboutTabs = () => {
  const [activeTab, setActiveTab] = useState<TabContent>(TabContent.Employment);

  const handleTabChange = (tab: TabContent) => {
    setActiveTab(tab);
  };

  return (
    <div className="explore-artwork-creator-dark">
      <div className="container-fluid">
        <div className="explore-artwork-inr">
          <div className="teb-main">
            <div className="tab-otr">
              <div className="tab-inr">
                <ul className="tabs">
                  {Tabs.map((tab, i) => (
                    <li
                      className={`
                    tab-link tab-1 ${activeTab === tab ? "active" : ""}
                    `}
                      onClick={() => handleTabChange(tab)}
                      key={i}
                    >
                      <p className="tab-p body-sb">{tab}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <span className="line" />
          <div className="row row-custom-main">
            <div
              id="tab-1"
              className={`tab-content ${
                activeTab === TabContent.About ? "active" : ""
              }`}
            >
              {activeTab === TabContent.About && <AboutTab />}
            </div>

            <div
              id="tab-2"
              className={`tab-content ${
                activeTab === TabContent.Employment ? "active" : ""
              }`}
            >
              {activeTab === TabContent.Employment && <EmploymentTab />}
            </div>
            
            <div
              id="tab-3"
              className={`tab-content ${
                activeTab === TabContent.Acheivement ? "active" : ""
              }`}
            >
              {activeTab === TabContent.Acheivement && <AcheivementTab />}
            </div>

            <div
              id="tab-4"
              className={`tab-content ${
                activeTab === TabContent.Projects ? "active" : ""
              }`}
            >
              {activeTab === TabContent.Projects && <ProjectTab />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTabs;
