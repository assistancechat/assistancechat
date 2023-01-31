import React from "react";
import { useState, useRef } from "react";
import { ArrowDownCircleIcon } from "@heroicons/react/24/solid";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import Document from "@/pages/_document";

const courseResources = {
  ImageBackground: {
    portait: "https://images.unsplash.com/photo-1604881991405-b273c7a4386a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    landscape:"https://images.unsplash.com/photo-1626387753307-5a329fa44578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80",
    alt: "Counselling picture",
  },
  courseTitle: "COURSE RESOURCES",
  headLine: "Discover God's Purpose for you in Counselling",
  subHeading:
    "Talk with our customer exerience officer to find the right course for you",
  LearnButton: {
    text: "Study Christian Counselling",
    link: "https://www.ac.edu.au/healthbrochure",
  },
  ChatButton: {
    text: "How can you help me align counselling with my faith?",
    link: "#Chat",
  },
};

//currently video is hidden, remove hidden to play video
export default function Hero() {

  return (
    <div className="w-screen h-screen">
      <img 
        className="absolute opacity-30 -z-10 w-screen h-screen lg:hidden"
        src={courseResources.ImageBackground.portait}
        alt="background"
      />
      <img 
        className="absolute opacity-30 -z-10 w-screen h-screen hidden lg:block"
        src={courseResources.ImageBackground.landscape}
        alt="background"
      />
      <div className="grid grid-rows-6 w-screen h-screen">
        <button
          type="button"
          className="row-span-2 left-10 top-40 md:top-30 h-12 w-3/4 relative inline-flex items-center rounded-md border border-transparent px-4 py-2 shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 lg:w-1/4"
        >
          <a
            href={courseResources.LearnButton.link}
            rel="noreferrer"
            target="_blank"
            className="inline-flex h-max w-max space-x-2"
          >
            <ArrowDownCircleIcon className="h-10 w-10 self-center text-orange-600" />
            <h3 className="text-md self-center text-left text-black leading-none uppercase ">
              {courseResources.LearnButton.text}
            </h3>
          </a>
        </button>
        <div className="space-y-6">
          <div className="row-span-4 relative left-5 sm:left-10 w-4/5 space-y-4 ">
            <h1 className="pt-4 text-5xl tracking-normalleading-none border-orange-400 border-t-4 border-orange-500">
              {courseResources.headLine}{" "}
            </h1>
            <h3 className="text-xl w-4/5 tracking-wide leading-tight font-light text-gray-800">
              {courseResources.subHeading}
            </h3>
          </div>

          <button
            type="button"
            className="animate-pulse flex relative sm:left-10 place-self-center place-content-evenly items-center rounded-md border border-transparent shadow-sm hover:bg-white focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 lg:justify-self-center lg:h-1/2"
          >
            <a
              href={courseResources.ChatButton.link}
              className="inline-flex max-h-max max-w-max space-x-2"
            >
              <ChatBubbleOvalLeftEllipsisIcon className="-ml-1 self-center text-orange-600 h-12 w-12" />
              <h3 className="self-center max-w-max text-left leading-none text-black text-sm uppercase">
                {courseResources.ChatButton.text}
              </h3>
            </a>
          </button>
        </div>

        <div></div>
      </div>
    </div>
  );
}
