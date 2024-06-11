"use client";

import { useEffect, useState } from "react";
import { ChatBox } from "@/components/ChatBox";
import { TaskList } from "@/components/TaskList";
import { AiCompanion } from "@/components/AiCompanion";
import { usePathname, useRouter } from "next/navigation";

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
        return router.push("/api/login");
      }

      setTasks(await response.json());
    })();
  }, []);

  return (
    <>
      <AiCompanion messages={messages} />
      <TaskList tasks={tasks} />
      <ChatBox onSend={handleSendMessage} />
    </>
  );
}
