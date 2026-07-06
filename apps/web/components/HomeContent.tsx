"use client";

import Image from "next/image";
import { Input } from "./ui/input";
import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "./LocationSearchPanel";

const HomeContent = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen],
  );

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <div className="max-w-md md:max-w-lg mx-auto min-h-screen bg-white relative overflow-hidden">
        <div>
          <Image
            src="https://static.vecteezy.com/system/resources/previews/027/127/501/non_2x/uber-logo-uber-icon-transparent-free-png.png"
            alt="Uber Logo"
            height={100}
            width={100}
            className="absolute top-7 left-7 z-20 w-20 h-auto"
          />
          <div className="absolute top-0 left-0 right-0 bottom-0">
            <Image
              src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
              alt="Uber Map"
              height={100}
              width={100}
              className="h-full w-full object-cover p-1.5"
            />
          </div>
          <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-end">
            <div className="bg-white rounded-t-3xl px-6 pt-6 pb-8 relative shadow-xl">
              <h5
                ref={panelCloseRef}
                onClick={() => {
                  setPanelOpen(false);
                }}
                className="absolute opacity-0 right-6 top-6 text-3xl cursor-pointer text-gray-600"
              >
                <i className="ri-arrow-down-wide-line"></i>
              </h5>
              <h4 className="text-2xl font-bold">Find a trip</h4>
              <form onSubmit={handleSubmit}>
                <div className="absolute left-6 top-19.5 h-24 w-1 rounded-l-2xl bg-gray-400"></div>
                <Input
                  onClick={() => {
                    setPanelOpen(true);
                  }}
                  value={pickup}
                  onChange={(e) => {
                    setPickup(e.target.value);
                  }}
                  className="bg-[#eee] h-11 rounded-lg mt-5 pl-8"
                  type="text"
                  placeholder="Add a pick-up location"
                />
                <Input
                  onClick={() => {
                    setPanelOpen(true);
                  }}
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                  }}
                  className="bg-[#eee] h-11 rounded-lg mt-3 pl-8"
                  type="text"
                  placeholder="Enter your destination"
                />
              </form>
            </div>
            <div
              ref={panelRef}
              className="bg-white h-0 overflow-hidden rounded-t-3xl"
            >
              <LocationSearchPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeContent;
