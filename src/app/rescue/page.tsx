"use client";
import RescueMap from "@/components/RescueMap";
import MyNavbar from "@/components/MyNavbar";

export default function Rescue() {
    return (
        <div className="flex flex-col w-screen h-screen">
            <div className="flex-shrink-0">
                <MyNavbar />
            </div>
            <div className="flex-grow">
                <RescueMap />
            </div>
        </div>
    );
}
