import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node, // Spread the globals.node object
        // Define additional global variables if needed
      },
    },
  },
  pluginJs.configs.recommended,
  {
    ignores: [
      // Dependency directories
      "node_modules/",

      // Build output directory
      "dist/",

      // Environment configuration files
      ".env",
      ".env.*",

      // Logs
      "logs",
      "*.log",

      // Other files and directories to ignore
      "coverage/",
      "temp/",
      // Add any other patterns you wish to ignore
    ],
    // ... rest of your config ...
  },
];
