import React from "react";


type ContainerProps = {
    children: JSX.Element | JSX.Element[]
}
const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="container-fluid">{children}</div>
  )
};

export default Container;
