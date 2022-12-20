import React from "react";

type Props = {
  text: string;
};

const NotFound = (props: Props) => {
  return (
    <div className="p-3">
      <h3 className="text-center mb-2">{props.text}</h3>
      <img src="./assets/404.svg" className="img-fluid d-block mx-auto" alt="" />
    </div>
  );
};

export default NotFound;
