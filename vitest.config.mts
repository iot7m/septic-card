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
        statements: 49.59,
        branches: 39.39,
        functions: 34.04,
        lines: 51.78,
        autoUpdate: false,
      },
    },
  },
});
