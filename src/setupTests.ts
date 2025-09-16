// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
global.TextEncoder = require("util").TextEncoder;

const globalWithImport = globalThis as typeof globalThis & {
  import?: { meta?: { env?: Record<string, unknown> } };
};

if (!globalWithImport.import) {
  globalWithImport.import = { meta: { env: {} } };
} else {
  globalWithImport.import.meta = globalWithImport.import.meta ?? { env: {} };
  globalWithImport.import.meta.env =
    globalWithImport.import.meta.env ?? {};
}
