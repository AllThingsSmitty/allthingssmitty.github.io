import js from "@eslint/js";
import globals from "globals";

export default [
  // Generated or vendored files are not linted
  { ignores: ["_site/", "node_modules/", "js/main.min.js", "js/lib/"] },

  js.configs.recommended,

  {
    rules: {
      eqeqeq: ["error", "always"],
      "no-empty": ["error", { allowEmptyCatch: true }],
      "no-var": "error",
      "prefer-const": "error",
    },
  },

  // Browser scripts concatenated into js/main.min.js (classic scripts, not modules)
  {
    files: ["js/utils/**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: globals.browser,
    },
  },

  // Local dev runner (ES module, Node)
  {
    files: ["index.mjs", "eslint.config.mjs"],
    languageOptions: {
      sourceType: "module",
      globals: globals.node,
    },
  },
];
