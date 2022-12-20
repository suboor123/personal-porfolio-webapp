import React from "react";
import { BsFillCheckCircleFill, BsXCircleFill } from "react-icons/bs";

type Props = {
  title: string;
  description: string;
  color?: string;
  type?: "error" | "success";
};

const iconStyle: React.CSSProperties = {
    // position: 'absolute',
    // top: '-75%',
    // left: 0,
    fontSize: "30px"
}

const Notification = (props: Props) => {
  return (
    <div
      className="notification pointer"
      style={{
        border: `2px solid ${
          props.type === "success" ? "teal" : "tomato"
        }`,
      }}
    >
      <div className="row">
        <div className="col-2">
          {props.type === "success" && (
            <BsFillCheckCircleFill
              className="mt-3"
              style={{ color: "teal", ...iconStyle }}
            />
          )}

          {props.type === "error" && (
            <BsXCircleFill
              className="mt-3"
              style={{ color: "tomato", ...iconStyle }}
            />
          )}
        </div>
        <div className="col">
          <h3 style={{fontSize: '15px'}}>{props.title}</h3>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
