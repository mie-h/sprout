"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import ChatBubble from "@/components/ChatBubble";
import { ChatBox } from "@/components/ChatBox";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import { AiCompanion } from "@/components/AiCompanion";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { fetchTasks, sendMessage, logOut } from "@/app/apicall";

const initialMessages = [{ text: "Hi there! How are you?", isSender: true }];

export default function Home() {
  const [messages, setMessages] = useState(initialMessages);
  const [tasks, setTasks] = useState([] as { id: number; title: string }[]);
  const path = usePathname();
  const router = useRouter();
  const lastMessage =
    messages.length > 0 ? messages[messages.length - 1] : null;

  useEffect(() => {
    (async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error: any) {
        if (error.message === "Unauthorized") {
          return router.push("/login");
        }
        console.error("Error fetching tasks:", error);
        // Optionally update the UI to indicate an error
      }
    })();
  }, []);

  const handleLogOut = async () => {
    try {
      await logOut();
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendMessage = async (message: string) => {
    // Add the user's message to the state
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, isSender: false },
    ]);

    try {
      const responseMessage = await sendMessage(message); // Use sendMessage function

      // Add the response message to the state
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: responseMessage, isSender: true },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Failed to process message", isSender: true },
      ]);
      // Optionally update the UI to indicate an error
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center p-4 space-y-4">
      <div className="flex-1 flex flex-col justify-center items-center">
        <button className="btn self-end p-2" onClick={handleLogOut}>
          <RiLogoutCircleRLine />
        </button>
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
