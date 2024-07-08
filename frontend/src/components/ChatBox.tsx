import React, { useState } from "react";

export function ChatBox({ onSend }: { onSend: (message: string) => void }) {
  const [value, setValue] = useState("");

  const handleClick = async () => {
    console.log("clicked");
    console.log(value);
    onSend(value);
    setValue(""); // Clear input field after sending
  };

  return (
    <div className="flex justify-center items-center mt-8">
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered input-primary w-full"
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
      />
      <div className="p-1" />
      <button className="btn btn-primary" onClick={handleClick}>
        Send
      </button>
    </div>
  );
}
