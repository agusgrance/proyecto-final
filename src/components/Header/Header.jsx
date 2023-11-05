import React from "react";
import { HeaderMenu } from "../HeaderMenu/HeaderMenu";

export function Header({ title }) {
  return (
    <div className="flex justify-between ">
      <div>
        <h1 className="text text-[32px] font-bold ">{title}</h1>
      </div>
      <div>
        <HeaderMenu />
      </div>
    </div>
  );
}
