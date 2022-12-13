import React from "react";

const ButtonDay = ({
  children,
  className,
  handleSelection,
  ...props
}: {
  children: number;
  handleSelection: () => void;
  className: string;
}) => {
  return <div onClick={handleSelection}>{children}</div>;
};

export default ButtonDay;
