"use client";

import MyNavbar from "@/components/MyNavbar";
import MyMap from "@/components/MyMap";
import CivilianLocation from "../../../components/CivilianLocation";

export default function Civilian() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <CivilianLocation></CivilianLocation>
        <div className="flex-shrink-0">
          <MyNavbar />
        </div>
        <div className="flex-grow">
          <MyMap />
        </div>
    </div>
  );
}
