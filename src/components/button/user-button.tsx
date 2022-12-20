import React from "react";
import { Link } from "react-router-dom";
import { getButtonClassName, UserButtonProps } from "./types";

const Button: React.FC<UserButtonProps> = ({
  children,
  type,
  onClick,
  ...props
}) => {
  const handleOnClick = () => (onClick ? onClick() : () => {});

  const renderButton = () => {
    if (props.routerLink) {
      return (
        <Link to={`/${props.routerLink}`} className={getButtonClassName(type) + ' d-inline-block mx-3'}>
          {children}
        </Link>
      );
    }

    return (
      <button
        className={getButtonClassName(type)}
        onClick={handleOnClick}
        {...props}
      >
        {children}
      </button>
    );
  };

  return <React.Fragment>{renderButton()}</React.Fragment>;
};

export default Button;
