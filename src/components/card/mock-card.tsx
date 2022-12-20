import React from "react";
import "./styles.css";

type CardProps = {
  children: JSX.Element | JSX.Element[];
};

const MockCard: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="col-inr box1">
      <div className="img-main">
            {children}
        </div>
    </div>
  );
};

export default MockCard;
