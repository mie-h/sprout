// src/components/TaskList.tsx
import React, { useState } from "react";
import TaskBar from "./TaskBar";

// Example icons (replace with actual icons or images)
const taskIcons: { [key: string]: React.ReactNode } = {
  "Drink water": (
    <span role="img" aria-label="water">
      💧
    </span>
  ),
  Stretch: (
    <span role="img" aria-label="stretch">
      🧘‍♀️
    </span>
  ),
  "Read a book": (
    <span role="img" aria-label="book">
      📚
    </span>
  ),
  Run: (
    <span role="img" aria-label="run">
      🏃‍♂️
    </span>
  ),
  Walk: (
    <span role="img" aria-label="walk">
      🚶‍♂️
    </span>
  ),
  // Add more icons as needed
};

interface Task {
  name: string;
  icon: React.ReactNode;
  current: number;
  total: number;
  color: string;
  completion: number; // percentage of completion
}

const initialTasks: Task[] = [
  {
    name: "Drink water",
    icon: taskIcons["Drink water"],
    current: 6,
    total: 8,
    color: "cyan",
    completion: 75,
  },
  {
    name: "Stretch",
    icon: taskIcons["Stretch"],
    current: 1,
    total: 2,
    color: "purple",
    completion: 50,
  },
  {
    name: "Read a book",
    icon: taskIcons["Read a book"],
    current: 0,
    total: 1,
    color: "blue",
    completion: 0,
  },
  {
    name: "Run",
    icon: taskIcons["Run"],
    current: 1,
    total: 2,
    color: "green",
    completion: 50,
  },
  {
    name: "Walk",
    icon: taskIcons["Walk"],
    current: 0,
    total: 1,
    color: "orange",
    completion: 0,
  },
  // Add more tasks as needed
];

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleIncrement = (index: number) => {
    setTasks(
      tasks.map((task, i) => {
        if (i === index) {
          const newCurrent = Math.min(task.current + 1, task.total);
          const newCompletion = (newCurrent / task.total) * 100;
          return { ...task, current: newCurrent, completion: newCompletion };
        }
        return task;
      })
    );
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
      {tasks.map((task, index) => (
        <TaskBar
          key={index}
          taskName={task.name}
          taskIcon={task.icon}
          quantity={`${task.current}/${task.total}`}
          color={task.color}
          completion={task.completion}
          onIncrement={() => handleIncrement(index)}
        />
      ))}
    </div>
  );
};

export default TaskList;
