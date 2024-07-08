import React from "react";

interface ChatBubbleProps {
  text: string;
  isSender?: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, isSender = false }) => {
  const bubbleClass = isSender
    ? "bg-primary text-black self-end rounded-bl-none"
    : "bg-indigo-200 text-black self-start rounded-br-none";

  const containerClass = isSender
    ? "flex justify-end items-start space-x-2"
    : "flex justify-start items-start space-x-2";

  const timestamp = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`overflow-y-auto mb-4 mt-10 ${containerClass}`}>
      <div
        className={`px-3.5 py-2 rounded-3xl justify-start items-center gap-3 inline-flex ${bubbleClass}`}
        style={{
          maxHeight: "5.5rem",
          overflowY: "auto",
        }}
      >
        <h5 className="text-gray-900 text-sm font-normal leading-snug">
          {text}
        </h5>
        <div className="text-xs text-right mt-1 opacity-75">{timestamp}</div>
      </div>
    </div>
  );
};

export default ChatBubble;
