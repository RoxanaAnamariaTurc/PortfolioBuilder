module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current", // Target the current version of Node
        },
      },
    ],
    "@babel/preset-react", // Add this for JSX transformation
    "@babel/preset-typescript", // Uncomment this line if you are using TypeScript
  ],
  plugins: [
    "@babel/plugin-transform-runtime", // Reduces the size of the output by deduplicating helper functions
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-private-methods",
    "@babel/plugin-proposal-private-property-in-object",
  ],
};
