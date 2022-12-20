import React from "react";
import "./styles.css";

type ExploreProps = {
  children: JSX.Element | JSX.Element[];
};

const Explore: React.FC<ExploreProps> = ({}) => {
  return (
    <div className="col-lg-2 col-explore-otr">
      <a className="col-explore-inr" href="Explore-Artworks.html">
        <img
          className="explore-img"
          src="../assets/img/Explore-artwork-text.png"
          alt="img"
        />
        <i className="ri-arrow-right-line icon" />
      </a>
    </div>
  );
};

export default Explore;
