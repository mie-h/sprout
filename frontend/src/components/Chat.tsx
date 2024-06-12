import React, { useState } from "react";
import ChatBubble from "./ChatBubble";
import { ChatBox } from "./ChatBox";

const initialMessages = [
  { text: "Hi there! How are you?", isSender: false },
  { text: "Great", isSender: true },
  { text: "Congratulations on your workout!", isSender: false },
  {
    text: "Thank you! But I would like to remove one session this week.",
    isSender: true,
  },
];

const Chat: React.FC = () => {
  const [messages, setMessages] = useState(initialMessages);

  const handleSendMessage = (message: string) => {
    setMessages([...messages, { text: message, isSender: true }]);
  };

  return (
    <div className="flex flex-col h-screen p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-2">
            <ChatBubble text={message.text} isSender={message.isSender} />
          </div>
        ))}
      </div>
      <ChatBox onSend={handleSendMessage} />
    </div>
  );
};

export default Chat;
