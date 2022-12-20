import React from "react";
import { BsFillCalendarFill, BsFillEyeFill } from "react-icons/bs";
import ReactTimeAgo from "react-time-ago";
import { TagGroup, Tag } from "rsuite";
import TechTag from "../tags";
import "./styles.css";
import { CardProps } from "./types";

const Card: React.FC<CardProps> = ({
  heading,
  imageUrl,
  description,
  date = new Date().toISOString(),
  views = 0,
  tags = [],
  isActive,
}) => {
  return (
    <div className="p-0">
      <div
        className={
          "col-inr p-0 box1 col-h" + " " + `${isActive ? "zoomer-active" : ""} `
        }
      >
        <img
          className="img-fluid card-image"
          src={imageUrl}
          alt="artwork-img"
        />
        <div className="p-3">
          <div className="img-main">
            <div className="content">
              <div className="title-main body-sb">
                <p className="date">
                  <span className="mr-1">
                    <BsFillEyeFill />
                  </span>{" "}
                  {views}
                </p>
                <span className="dot">•</span>
                <p className="date">
                  <span className="mr-1">
                    <BsFillCalendarFill />
                  </span>
                  <ReactTimeAgo date={new Date(date)} locale="en-US" />
                </p>
              </div>
              <p className="box-head heading-h4 text-white">{heading}</p>
            </div>
          </div>
          <hr />
          <p className="desc body-m">{description}</p>
          <hr />
          <TechTag tags={tags} />
        </div>
      </div>
    </div>
  );
};

export default Card;
