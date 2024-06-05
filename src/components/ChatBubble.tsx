import React from "react";
import Robot from "@/images/robot.svg";

interface ChatBubbleProps {
  text: string;
  isSender?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, isSender = false }) => {
  const bubbleClass = isSender
    ? "bg-primary text-black self-end"
    : "bg-indigo-200 text-black self-start";

  const containerClass = isSender
    ? "flex justify-end items-start space-x-2"
    : "flex justify-start items-start space-x-2";

  const timestamp = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={containerClass}>
      {!isSender && (
        <img src={Robot} alt="avatar" className="w-8 h-8 rounded-full" />
      )}
      <div
        className={`p-3 rounded-lg max-w-xs w-auto ${bubbleClass}`}
        style={{
          maxHeight: "5.5rem", // approximately 4 lines of text
          overflowY: "auto",
        }}
      >
        {text}
        <div className="text-xs text-right mt-1 opacity-75">{timestamp}</div>
      </div>
    </div>
  );
};

export default ChatBubble;
