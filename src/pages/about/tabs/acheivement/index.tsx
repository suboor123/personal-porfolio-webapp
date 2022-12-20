import React from "react";
import { useSelector } from "react-redux";
import { profileSelector } from "src/redux/selectors";
import AcheivementCard from "./acheivement-card";

const AcheivementTab = () => {
  const { userProfileModel } = useSelector(profileSelector);
  const { acheivements } = userProfileModel.pluckAll();
  return (
    <div className="row">
      {(acheivements || []).map((a) => (
        <div className="col-md-3 zoomer">
          <AcheivementCard
            imageUrl={a.imageUrl}
            title={a.title}
            description={a.description}
          />
        </div>
      ))}
    </div>
  );
};

export default AcheivementTab;
