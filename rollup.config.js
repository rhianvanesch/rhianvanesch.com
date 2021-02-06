import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/js/contact.js",
    output: {
      file: "dist/js/contact.mjs",
      format: "esm"
    },
    plugins: [terser()]
  },
  {
    input: "src/js/theme-toggle.js",
    output: {
      file: "dist/js/theme-toggle.mjs",
      format: "esm"
    },
    plugins: [terser()]
  }
];
