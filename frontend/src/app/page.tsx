"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ChatBubble from "@/components/ChatBubble";
import { ChatBox } from "@/components/ChatBox";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import { AiCompanion } from "@/components/AiCompanion";

const initialMessages = [{ text: "Hi there! How are you?", isSender: true }];

export default function Home() {
  const [messages, setMessages] = useState(initialMessages);
  const [tasks, setTasks] = useState([] as { id: number; title: string }[]);
  const path = usePathname();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/tasks");
      console.log(response);
      if (response.status === 401) {
        return router.push("/login");
      }

      setTasks(await response.json());
    })();
  }, []);

  const handleSendMessage = async (message: string) => {
    // Add the user's message to the state
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isSender: false },
    ]);

    try {
      // Send the message to the backend API
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error sending message:", data.error);
        return;
      }

      // Add the response message to the state
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.response, isSender: true },
      ]);
    } catch (error) {
      console.error("Error handling request:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Failed to process message", isSender: true },
      ]);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center p-4 space-y-4">
      <div className="flex-1 flex flex-col justify-center items-center">
        {messages.slice(-2).map((message, index) => (
          <ChatBubble
            key={index}
            text={message.text}
            isSender={message.isSender}
          />
        ))}
        <div className="flex-1 flex justify-center items-center">
          <AiCompanion />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <WeeklyCalendar />
        </div>
        <div className="flex-1 flex justify-center items-center">
          <ChatBox onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
}
