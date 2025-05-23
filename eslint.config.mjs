import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import eslintPluginPrettier from "eslint-plugin-prettier";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js, prettier: eslintPluginPrettier }, extends: ["js/recommended", "plugin:prettier/recommended"], rules: { "no-console": "warn", "prettier/prettier": "error" } },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
]);
