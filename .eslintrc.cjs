/* eslint-env node */
/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    tsconfigRootDir: __dirname,
    project: ["./tsconfig.json"],
  },
  plugins: ["@typescript-eslint", "import", "eslint-plugin-tsdoc"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/strict-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:import/errors",
    "plugin:import/typescript",
    "plugin:import/warnings",
    "next/core-web-vitals",
  ],
  env: {
    browser: true,
    es2021: true,
  },
  ignorePatterns: [
    "generated/**/*",
    "node_modules/**/*",
    ".next/**/*",
    "public/**/*",
    "src/assets/**/*",
    "*.js",
    "*.cjs",
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: `${__dirname}/tsconfig.json`,
      },
      node: true,
    },
  },
  reportUnusedDisableDirectives: true,
  rules: {
    "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    "@typescript-eslint/naming-convention": [
      "error",
      { selector: "function", format: ["camelCase", "PascalCase"] },
    ],
    "@typescript-eslint/no-non-null-assertion": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "parent", "sibling", "index"],
        "newlines-between": "always",
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "tsdoc/syntax": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn", // or "error"
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
  },
  overrides: [
    {
      files: ["*.js", "*.cjs"],
      rules: {
        "tsdoc/syntax": 0,
      },
    },
  ],
};

module.exports = config;
