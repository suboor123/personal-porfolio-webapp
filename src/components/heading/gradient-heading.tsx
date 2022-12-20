import React from "react";
import "./styles.css";

type Props = {
  children: JSX.Element | JSX.Element[] | any;
  fontSize?: number;
};
const GradientHeading = (props: Props) => {
  const { children, fontSize } = props;
  return <h1 
  className="heading-h3 heading titleGreathorned"
  style={{fontSize: `${fontSize || 50}px`}}
  >{children}</h1>;
};

export default GradientHeading;
