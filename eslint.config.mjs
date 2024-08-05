// @ts-check

import eslint from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    // register all of the plugins up-front
    {
        // note - intentionally uses computed syntax to make it easy to sort the keys
        /* eslint-disable no-useless-computed-key */
        plugins: {
            ["@typescript-eslint"]: tseslint.plugin,
        },
    },
    {
        // config with just ignores is the replacement for `.eslintignore`
        ignores: [
            "**/node_modules/**",
            "**/dist/**",
            "**/build/**",
            "*.mjs",
        ],
    },

    // extends ...
    eslint.configs.recommended,
    ...tseslint.configs.recommended,

    // base config
    {
        languageOptions: {
            globals: {
                ...globals.es2020,
                ...globals.node,
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: "root",
                warnOnUnsupportedTypeScriptVersion: false,
            },
        },
        rules: {
            "@typescript-eslint/no-confusing-void-expression": "off",
            "@typescript-eslint/no-unused-expressions": "off",
            "@typescript-eslint/consistent-type-imports": [
                "error",
                { prefer: "type-imports", disallowTypeAnnotations: true },
            ],
            "@typescript-eslint/explicit-function-return-type": ["error", { allowIIFEs: true }],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unnecessary-type-parameters": "error",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    caughtErrors: "all",
                    varsIgnorePattern: "^_",
                    argsIgnorePattern: "^_",
                },
            ],
            "@typescript-eslint/prefer-nullish-coalescing": [
                "error",
                {
                    ignoreConditionalTests: true,
                    ignorePrimitives: true,
                },
            ],
            "no-console": "error",
            "no-process-exit": "error",
            "no-useless-call": "error",
            "no-var": "error",
            "prefer-arrow-callback": "error",
            "prefer-const": "error",
            radix: "error",
        },
    },
    {
        files: ["**/*.js"],
        extends: [tseslint.configs.disableTypeChecked],
        rules: {
            "deprecation/deprecation": "off",
            "@typescript-eslint/internal/no-poorly-typed-ts-props": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
        },
    },
    {
        files: [
            "**/tools/**/*.{ts,tsx,cts,mts}",
            "**/tests/**/*.{ts,tsx,cts,mts}",
            "packages/integration-tests/**/*.{ts,tsx,cts,mts}",
        ],
        rules: {
            // allow console logs in tools and tests
            "no-console": "off",
        },
    },
    {
        files: ["eslint.config.{js,cjs,mjs}"],
        rules: {
            // requirement
            "import/no-default-export": "off",
        },
    }
);
