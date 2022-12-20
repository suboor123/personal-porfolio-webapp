import React from "react";
import { useSelector } from "react-redux";
import { Tag, Timeline } from "rsuite";
import Jumbotron from "src/components/jumbotron";
import { Company, Profile } from "src/core/models/profile/types";
import { profileSelector } from "src/redux/selectors";

const EmploymentTab = () => {
  const { userProfileModel } = useSelector(profileSelector);
  const profile: Profile = userProfileModel.pluckAll();
  const { companies } = userProfileModel.pluckAll();


  const isCurrentWorkingHere = (company: Company) => {
    if(company.currentlyWorking) {
        return (<span className="lead badge badge-lg badge-success"> Currently working</span>)
    }
    return "to " + company.to;
  }

  return (
    <div className="row">
      <div className="col-md-8">
        <Timeline>
          {(companies || []).map((company, index) => (
              <Timeline.Item className="text-white" key={index}>
                <h2 className="text-primary">{company.name}</h2>
                <p className="text-muted">
                  From {company.from}  {isCurrentWorkingHere(company)}
                </p>
                <p>{company.description}</p>
              </Timeline.Item>
          ))}
        </Timeline>
      </div>
    </div>
  );
};

export default EmploymentTab;
