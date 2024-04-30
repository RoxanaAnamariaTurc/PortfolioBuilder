// module.exports = {
//   setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
//   preset: "ts-jest",
//   testEnvironment: "jsdom",
//   transform: {
//     "^.+\\.(ts|tsx)$": "ts-jest",
//   },
// };

module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["node_modules/(?!(axios)/)"],
};
