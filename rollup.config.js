import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/septic-element.ts",
  output: {
    file: "../config/www/septic-element.js",
    format: "es",
  },
  plugins: [
    resolve({ browser: true, dedupe: ["lit"] }),
    typescript(),
    terser(),
  ],
};
