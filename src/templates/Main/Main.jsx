import React from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import { Header } from "../../components/Header/Header";
import clsx from "clsx";

const pages = {
  home: "Overview",
  calendar: "Todos Nuestros Eventos",
  chat: "Chat",
  profile: "My Profile",
  event: "Upcoming Event",
};
export function Main({ children, page, title }) {
  return (
    <div className="flex w-full h-[100vh] bg-[#202020]  p-3 pl-0 text-[#202020]">
      <div className="w-[5%] h-full">
        <Navbar />
      </div>
      <div
        className={clsx(
          "w-full rounded-[30px] p-9 bg-[#f2f5f9] overflow-scroll"
        )}
      >
        <Header title={title || pages?.[page] || ""} />
        {children}
      </div>
    </div>
  );
}
