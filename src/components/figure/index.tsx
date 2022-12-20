import React from "react";
import Button from "../button/user-button";
import GradientHeading from "../heading/gradient-heading";

type FigureProps = {
  children: JSX.Element | JSX.Element[];
  hasDot?: boolean;
  heading: string;
  withIcon?: JSX.Element | JSX.Element[];
  onViewAllClick?: () => void;
  withText?: string;
};

const Figure: React.FC<FigureProps> = ({
  children,
  hasDot,
  heading,
  withIcon,
  onViewAllClick,
  withText
}) => {
  return (
    <div className="live-acution-home2-dark">
      <div className="container-fluid">
        <div className="live-auction-inr">
          <div className="heading-otr">
            <div className="head-otr">
              <GradientHeading> {heading} </GradientHeading>
        
            </div>
            
            {onViewAllClick && (
              <a onClick={onViewAllClick} className="view-all pointer">
                <p className="View-p body-sb">View All</p>
                <svg
                  className="arrow-icon"
                  width={18}
                  height={16}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 8h16M10.455 1.455L17 8l-6.545 6.545"
                    stroke="#366CE3"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
          </div>
          <div className="mt-3">
              <p className="h4 text-white">{withText || ''}</p>
              </div>
          <span className="line" />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Figure;
