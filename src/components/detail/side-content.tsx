import React from "react";
import Jumbotron from "../jumbotron";

type Props = {
  children: any;
};

const SideContent = (props: Props) => {
  const { children } = props;
  return (
    <div className="col-lg-5 col-right-otr">
      <div className="col-right-inr">{children}</div>
    </div>
  );
};

export default SideContent;
