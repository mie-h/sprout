const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./", // Adjust if your Next.js app is in a subdirectory
});

const customJestConfig = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"], // Include both .test.ts and .test.tsx
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // For handling CSS imports
  },
};

module.exports = createJestConfig(customJestConfig);
