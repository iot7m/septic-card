import { defineConfig } from "vitest/config";

export default defineConfig({
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
        statements: 43.2,
        branches: 65.34,
        functions: 45.7,
        lines: 43.2,
        autoUpdate: false,
      },
    },
  },
});
