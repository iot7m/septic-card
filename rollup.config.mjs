import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import serve from "rollup-plugin-serve";

const dev = process.env.ROLLUP_WATCH;

const serveOptions = {
  contentBase: ["./dist"],
  host: "0.0.0.0",
  port: 4000,
  allowCrossOrigin: true,
  verbose: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

const terserOptions = {
  module: true,
  format: {
    comments: false,
  },
  compress: {
    passes: 2,
    pure_getters: true,
    drop_console: true,
    drop_debugger: true,
  },
};

const plugins = [
  typescript({ declaration: false }),
  nodeResolve(),
  json(),
  commonjs(),
  ...(dev ? [serve(serveOptions)] : [terser(terserOptions)]),
];

export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/septic-card.js",
      format: "es",
      inlineDynamicImports: true,
      sourcemap: dev,
    },
    plugins,
    moduleContext: (id) => {
      const thisAsWindowForModules = [
        "node_modules/@formatjs/intl-utils/lib/src/diff.js",
        "node_modules/@formatjs/intl-utils/lib/src/resolve-locale.js",
      ];
      if (thisAsWindowForModules.some((id_) => id.trimRight().endsWith(id_))) {
        return "window";
      }
    },
  },
];
