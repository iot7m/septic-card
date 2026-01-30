import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  resolve: {
    alias: [
      { find: "@", replacement: resolve(__dirname, "./src") },
      { find: "@tests", replacement: resolve(__dirname, "./tests") },
    ],
  },
  test: {
    environment: "jsdom",
    outputFile: { junit: "./output/tests/junit.xml", html: "./output/tests/index.html" },
    reporters: ["default", "junit", "html"],
    setupFiles: ["./tests/setup.ts"],
    coverage: {
      include: ["src/**"],
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./output/coverage",
      thresholds: {
        statements: 71.25,
        branches: 65.17,
        functions: 64.91,
        lines: 75,
        autoUpdate: false,
      },
    },
  },
});
