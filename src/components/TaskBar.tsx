import React from "react";
import { Button } from "@headlessui/react";

interface TaskBarProps {
  taskName: string;
  taskIcon: React.ReactNode; // New prop for task icon
  quantity: string; // Current quantity out of total quantity
  color: string;
  completion: number; // percentage of completion
  onIncrement: () => void;
}

const colorClassMap: { [key: string]: string } = {
  purple: "bg-purple-300",
  blue: "bg-blue-300",
  cyan: "bg-cyan-300",
  yellow: "bg-yellow-300",
  indigo: "bg-indigo-300",
  pink: "bg-pink-300",
  green: "bg-green-300",
  orange: "bg-orange-300",
};

const TaskBar: React.FC<TaskBarProps> = ({
  taskName,
  taskIcon,
  quantity,
  color,
  completion,
  onIncrement,
}) => {
  const barClass = colorClassMap[color] || "bg-gray-600";

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="mr-2">{taskIcon}</span>
          <span className="text-sm">{taskName}</span>
        </div>
        <div className="flex items-center">
          <span className="text-sm mr-2">{quantity}</span>
          <Button
            onClick={onIncrement}
            className="inline-flex items-center justify-center w-8 h-8 rounded-full text-pink-500 border-pink-200 bg-white"
          >
            +
          </Button>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${barClass}`}
          style={{ width: `${completion}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TaskBar;
