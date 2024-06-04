// src/components/TaskBar.tsx
import React from "react";

interface TaskBarProps {
  taskName: string;
  taskIcon: React.ReactNode; // New prop for task icon
  quantity: string; // Current quantity out of total quantity
  color: string;
  completion: number; // percentage of completion
  onIncrement: () => void;
}

const colorClassMap: { [key: string]: string } = {
  purple: "bg-purple-600",
  blue: "bg-blue-600",
  cyan: "bg-cyan-600",
  yellow: "bg-yellow-600",
  indigo: "bg-indigo-600",
  pink: "bg-pink-600",
  green: "bg-green-600",
  orange: "bg-orange-600",
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
          <button
            onClick={onIncrement}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded"
          >
            +
          </button>
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
