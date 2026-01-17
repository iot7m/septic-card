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
        lines: 14.45,
        functions: 11.4,
        statements: 13.36,
        branches: 12.0,
        autoUpdate: false,
      },
    },
  },
});
