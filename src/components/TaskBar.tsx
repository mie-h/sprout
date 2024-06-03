// src/components/TaskBar.tsx
import React from "react";

interface TaskBarProps {
  taskName: string;
  color: string;
  completion: number; // percentage of completion
}

const colorClassMap: { [key: string]: string } = {
  purple: "bg-purple-600",
  blue: "bg-blue-600",
  cyan: "bg-cyan-600",
  yellow: "bg-yellow-600",
  indigo: "bg-indigo-600",
  pink: "bg-pink-600",
  green: "bg-green-600",
};

const TaskBar: React.FC<TaskBarProps> = ({ taskName, color, completion }) => {
  const barClass = colorClassMap[color] || "bg-gray-600";

  return (
    <div
      className="flex items-center mb-4"
      role="progressbar"
      aria-valuenow={completion}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span className="w-1/4 text-sm">{taskName}</span>
      <div className="w-3/4 bg-gray-200 rounded-full h-6">
        <div
          className={`h-6 rounded-full ${barClass}`}
          style={{ width: `${completion}%` }}
        ></div>
      </div>
    </div>
  );
};

export default TaskBar;
