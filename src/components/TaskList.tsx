"use client";
import {
  CloseButton,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";

// src/components/TaskList.tsx
import React from "react";
import TaskBar from "./TaskBar";

interface Task {
  name: string;
  color: string;
  completion: number;
}

const tasks: Task[] = [
  { name: "Stretch", color: "purple", completion: 80 },
  { name: "Sleep early", color: "blue", completion: 60 },
  { name: "Drink water", color: "cyan", completion: 50 },
  { name: "Stand", color: "yellow", completion: 30 },
  { name: "Walk", color: "indigo", completion: 70 },
  { name: "Yoga", color: "pink", completion: 40 },
  { name: "Run", color: "green", completion: 90 },
];

const TaskList: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
      {tasks.map((task, index) => (
        <TaskBar
          key={index}
          taskName={task.name}
          color={task.color}
          completion={task.completion}
        />
      ))}
    </div>
  );
};

export default TaskList;
