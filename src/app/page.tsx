"use client";

import { useState } from "react";
import { ChatBox } from "@/components/ChatBox";
import { TaskList } from "@/components/TaskList";
import { AiCompanion } from "@/components/AiCompanion";

export default function Home() {
  const [messages, setMessages] = useState("Hi, I am Ai Companion.");
  const handleSendMessage = (newMessage: string) => {
    setMessages(newMessage);
  };

  return (
    <>
      <AiCompanion messages={messages} />
      <TaskList />
      <ChatBox onSend={handleSendMessage} />
    </>
  );
}
