module.exports = {
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};
