"use client";
import Image from "next/image";
import Robot from "@app/../../public/static/images/robot.svg";
import React from "react";

function AiCompanion({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="p-4" />
        <div className="px-3.5 py-2 bg-primary rounded-3xl rounded-bl-none justify-start  items-center gap-3 inline-flex">
          <h5 className="text-gray-900 text-sm font-normal leading-snug">
            Hello!
            <br />I am your AI buddy.
          </h5>
        </div>
        <div className="p-2" />
        <Image src={Robot} alt="Example Image" width={100} height={100} />
        <div className="p-4" />
      </div>
    </>
  );
}

function ChatBox() {
  const [value, setValue] = React.useState("");
  const handleClick = async () => {
    console.log("clicked");
    console.log(value);
  };
  return (
    <>
      <div className="w-50 p-1" />
      <div className="flex justify-center items-center">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-primary w-full"
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
        <div className="p-1" />
        <button className="btn btn-primary" onClick={handleClick}>
          Send
        </button>
      </div>
      <div className="w-50 p-4" />
    </>
  );
}

export default function Home() {
  const tasks = [
    <div key="1" className="w-50 p-4 border-4 box-border">
      task1
    </div>,
  ];
  for (let i = 2; i < 10; i++) {
    tasks.push(
      <div key={2 * i} className="w-50 p-2" />,
      <div key={2 * i + 1} className="w-50 p-4 border-4 box-border">
        task{i}
      </div>
    );
  }

  return (
    <>
      <AiCompanion>
        Hello, <br />I am your AI buddy.
      </AiCompanion>
      <div className="flex flex-col overflow-scroll flex-grow">{tasks}</div>
      <ChatBox />
    </>
  );
}
