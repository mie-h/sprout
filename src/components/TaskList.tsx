// src/components/TaskList.tsx
import React, { useState, useEffect } from "react";
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
  days: number[]; // Array of days (0 for Sunday, 1 for Monday, etc.)
}

const initialTasks: Task[] = [
  {
    name: "Drink water",
    icon: taskIcons["Drink water"],
    current: 6,
    total: 8,
    color: "cyan",
    completion: 75,
    days: [1, 2, 3, 4, 5],
  },
  {
    name: "Stretch",
    icon: taskIcons["Stretch"],
    current: 1,
    total: 2,
    color: "purple",
    completion: 50,
    days: [0, 2, 4],
  },
  {
    name: "Read a book",
    icon: taskIcons["Read a book"],
    current: 0,
    total: 1,
    color: "blue",
    completion: 0,
    days: [1, 3, 5],
  },
  {
    name: "Run",
    icon: taskIcons["Run"],
    current: 1,
    total: 2,
    color: "green",
    completion: 50,
    days: [0, 2, 4, 6],
  },
  {
    name: "Walk",
    icon: taskIcons["Walk"],
    current: 0,
    total: 1,
    color: "orange",
    completion: 0,
    days: [1, 2, 3, 4, 5, 6],
  },
  // Add more tasks as needed
];

interface TaskListProps {
  selectedDay: number;
}

const TaskList: React.FC<TaskListProps> = ({ selectedDay }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const handleIncrement = (taskName: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.name === taskName && task.days.includes(selectedDay)) {
          const newCurrent = Math.min(task.current + 1, task.total);
          const newCompletion = (newCurrent / task.total) * 100;
          return { ...task, current: newCurrent, completion: newCompletion };
        }
        return task;
      })
    );
  };

  const filteredTasks = tasks.filter((task) => task.days.includes(selectedDay));

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
      {filteredTasks.map((task, index) => (
        <TaskBar
          key={index}
          taskName={task.name}
          taskIcon={task.icon}
          quantity={`${task.current}/${task.total}`}
          color={task.color}
          completion={task.completion}
          onIncrement={() => handleIncrement(task.name)}
        />
      ))}
    </div>
  );
};

export default TaskList;
