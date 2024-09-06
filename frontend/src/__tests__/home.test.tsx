// src/__tests__/home.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import * as nextRouter from "next/navigation";

// Mock the Next.js router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
    asPath: "",
  }),
  usePathname: () => "", // Mock usePathname if it's used in Home component
}));

// Mock the data fetching function
jest.mock("@/app/apicall", () => ({
  fetchTasks: jest.fn(() => Promise.resolve([{ id: 1, task: "Sample Task" }])), // Mocked resolved data
}));

test("renders home page with required elements", () => {
  render(<Home />);

  // Check if certain elements are present
  expect(screen.getByRole("button", { name: /log out/i })).toBeInTheDocument();
  expect(screen.getByText(/Hi there! How are you\?/i)).toBeInTheDocument();
});
