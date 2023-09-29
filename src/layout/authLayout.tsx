import React, { ReactNode } from "react";

type AuthLayoutProps = {
    child: ReactNode
};

function authLayout(props: AuthLayoutProps) {
    const {child} = props
  return (
    <div className="bg-black-haze-400 w-full">
      {child}
    </div>
  ) 
}

export default authLayout;
