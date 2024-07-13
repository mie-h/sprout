import React, { useState } from "react";

export function ChatBox({ onSend }: { onSend: (message: string) => void }) {
  const [value, setValue] = useState("");

  const handleClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("clicked");
    console.log(value);

    // Send the user message to the parent component
    onSend(value);

    // Clear input field after sending
    setValue("");
  };

  return (
    <div>
      <form
        className="flex justify-center items-center mt-8"
        onSubmit={handleClick}
        id="form"
      >
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
        <button className="btn btn-primary">Send</button>
      </form>
    </div>
  );
}
