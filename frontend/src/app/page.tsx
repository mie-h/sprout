"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Chat from "@/components/Chat";
import WeeklyCalendar from "@/components/WeeklyCalendar";
import { AiCompanion } from "@/components/AiCompanion";

export default function Home() {
  const [messages, setMessages] = useState("Hi, I am Ai Companion.");
  const [tasks, setTasks] = useState([] as { id: number; title: string }[]);
  const path = usePathname();
  const router = useRouter();
  const handleSendMessage = (newMessage: string) => {
    setMessages(newMessage);
  };

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

  return (
    <>
      <AiCompanion messages={messages} />
      <WeeklyCalendar />
      <Chat />
    </>
  );
}
