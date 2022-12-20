import React from "react";
import Jumbotron from "src/components/jumbotron";

type Props = {
  heading: string;
  children: JSX.Element | JSX.Element[] | string;
};

const AboutCard = (props: Props) => {
  const { heading, children } = props;
  return (
    <Jumbotron>
      <div className="h5 text-white p-3">
        <div>
          <b>{heading}</b>
        </div>
        <hr />
        {children}
      </div>
    </Jumbotron>
  );
};

export default AboutCard;
