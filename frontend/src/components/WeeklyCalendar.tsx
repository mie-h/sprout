import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import { Button } from "@headlessui/react";

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const getCurrentDayIndex = () => {
  const today = new Date();
  return today.getDay(); // returns 0 for Sunday, 1 for Monday, etc.
};

const WeeklyCalendar: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState(getCurrentDayIndex());

  const handleDayClick = (dayIndex: number) => {
    setSelectedDay(dayIndex);
  };

  useEffect(() => {
    setSelectedDay(getCurrentDayIndex());
  }, []);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg">
      <div className="flex justify-between mb-4">
        {daysOfWeek.map((day, index) => (
          <Button
            key={index}
            onClick={() => handleDayClick(index)}
            className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-pink-500 ${index === selectedDay ? "border-pink-700 bg-pink-100" : "border-pink-200 bg-white"}`}
          >
            <span className="sr-only">{day}</span>
            {day}
          </Button>
        ))}
      </div>
      <TaskList selectedDay={selectedDay} />
    </div>
  );
};

export default WeeklyCalendar;
