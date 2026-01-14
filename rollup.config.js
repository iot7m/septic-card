import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/gseptik.js",
    format: "es",
  },
  plugins: [
    resolve({ browser: true, dedupe: ["lit"] }),
    typescript(),
    terser(),
  ],
};
