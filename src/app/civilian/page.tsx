"use client";

import MyNavbar from "@/components/MyNavbar";
import MyMap from "@/components/MyMap";

export default function Civilian() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="flex-shrink-0">
        <MyNavbar />
      </div>
      <div className="flex-grow">
        <MyMap />
      </div>
    </div>
  );
}
