"use client";
import { fetchUsers } from "@/app/apicall";
import { useState } from "react";

export function ChatBox({ onSend }: { onSend: (message: string) => void }) {
  const [value, setValue] = useState("");

  const handleClick = async () => {
    // Why async? func vs const
    console.log("clicked");
    console.log(value);
    const message = await fetchUsers();
    console.log("message: ", message);
    onSend(message);
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
