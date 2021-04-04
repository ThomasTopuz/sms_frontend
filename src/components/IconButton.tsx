import { Button } from "reactstrap";
import React from "react";

export interface props {
  iconName: string;
  text: string;
  style?: {};
  onClickHandler: any;
  className?: string;
}

const IconButton: React.FC<props> = ({
  iconName,
  text,
  style,
  onClickHandler,
  className,
}) => {
  return (
    <Button
      onClick={onClickHandler}
      size={"12"}
      style={style}
      className={`btn-icon btn-3 ${className}`}
      color="primary"
      type="button"
    >
      <span className="btn-inner--text">{text}</span>
      <span className="btn-inner--icon">
        <i className={iconName} />
      </span>
    </Button>
  );
};

export default IconButton;
