module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "prettier", // This should be last to override other rules
  ],
  ignorePatterns: ["dist", "build", ".eslintrc.js", "vite.config.ts"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  rules: {
    // React specific rules
    "react/react-in-jsx-scope": "off", // Not needed with React 17+
    "react/prop-types": "off", // Using TypeScript for prop validation
    "react/display-name": "off",

    // TypeScript specific rules
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",

    // General rules
    "no-console": "warn",
    "no-debugger": "warn",
    "prefer-const": "error",
    "no-var": "error",
    "no-unused-vars": "off", // Use TypeScript version instead
    "no-undef": "off", // TypeScript handles this
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
