import { Button } from "@mui/material";
import React from "react";

export function Contacts() {
  return (
    <div className="w-full h-full border border-[#2233541a] bg-white rounded-xl  shadow-md ">
      <div className="border-b border-[#2233541a] w-full p-4">
        <h4 className="!text-[#223354] font-bold text-[16px]">Contacts</h4>
      </div>
      <div className="flex items-center justify-between border-b border-[#2233541a] w-full p-4">
        <div className="flex gap-1">
          <div>avatar</div>
          <h3 className="!text-[#223354] font-bold text-[16px]">name</h3>
        </div>
        <div>
          <Button type="secondary">Add</Button>
        </div>
      </div>
    </div>
  );
}
