import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ["**/*.{js,mjs,cjs,ts}"]
    },
    {
        languageOptions: {
            globals: globals.browser
        }
    },
    pluginJs.configs.recommended,
    ...tseslint.configs.stylistic,
    ...tseslint.configs.strict,
    {
        rules: {
            "semi": ["error", "always"],
            "eol-last": ["error", "always"],
            "no-multiple-empty-lines": "error",
            "@typescript-eslint/consistent-type-assertions": "error"
        }
    }
];
