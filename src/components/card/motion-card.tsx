import React from "react";
import { CardProps } from "./types";
import { motion, Variants } from "framer-motion";
import { BsFillEyeFill, BsFillCalendarFill } from "react-icons/bs";
import ReactTimeAgo from "react-time-ago";
import TechTag from "../tags";
import "./styles.css";

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -3,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const hue = (h: number) => `hsl(${h}, 100%, 50%)`;

const hues: [string, number, number][] = [
  ["🍅", 340, 10],
  ["🍊", 20, 40],
  ["🍋", 60, 90],
  ["🍐", 80, 120],
  ["🍏", 100, 140],
  ["🫐", 205, 245],
  ["🍆", 260, 290],
  ["🍇", 290, 320],
];

const MotionCard: React.FC<CardProps> = (props) => {
  const {
    heading,
    imageUrl,
    description,
    date = new Date().toISOString(),
    views = 0,
    tags = [],
    isActive,
    currentlyViewing,
  } = props;

  const getStyles = (index: number) => {
    let currentHue = index;
    if (index > hues.length - 1) {
      currentHue = 0;
    }
    const background = `linear-gradient(306deg, ${hue(
      hues[currentHue][1]
    )}, ${hue(hues[currentHue][2])})`;
    return background;
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12 pointer">
          <motion.div
            className=" w-50-mob mx-auto d-block"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.8 }}
          >
            <div className="splash" />
            <motion.div className="card" variants={cardVariants}>
              {isActive && (
                <div
                  className="text-center bg-light p-2"
                  style={{
                    color: "teal",
                    fontSize: "20px",
                    position: "absolute",
                    top: 10,
                    left: 10,
                    border: "0.5px dashed teal",
                  }}
                >
                  <BsFillEyeFill /> Currently viewing
                </div>
              )}
              <img className="img-fluid" src={imageUrl} />
              <div className="img-main">
                <div className="content">
                  <div className="title-main text-center mt-3 body-sb">
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
                  <a className="box-head heading-h4 text-white">{heading}</a>
                </div>
              </div>
              <div className="p-3">
                <hr />
                <p className="desc body-m">{description}</p>
                <hr />
                <TechTag tags={tags} />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default MotionCard;
