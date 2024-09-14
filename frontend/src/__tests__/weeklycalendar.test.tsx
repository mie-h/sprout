import { render, screen } from "@testing-library/react";
import WeeklyCalendar from "../components/WeeklyCalendar";
import "@testing-library/jest-dom"; // for additional matchers like toBeInTheDocument

test("renders all day buttons", () => {
  // Render the WeeklyCalendar component
  render(<WeeklyCalendar />);

  // Check if all day buttons are rendered
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  daysOfWeek.forEach((day) => {
    const dayButton = screen.getByRole("button", { name: new RegExp(day) });
    expect(dayButton).toBeInTheDocument();
  });
});
