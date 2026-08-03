import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

/** Type-aware linting is wired to tsconfig.json through the project service, so
 *  the lint run sees exactly the program `tsc --noEmit` sees — no second file
 *  list to keep in sync. Formatting is Prettier's job and is deliberately absent
 *  here: every rule below exists to catch a defect, not a preference. */
export default tseslint.config(
  {
    ignores: ["dist", "dist-ssr", "node_modules", "playwright-report", "test-results"],
  },

  js.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    extends: [tseslint.configs.recommended, tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // The build runs `verbatimModuleSyntax`: a type brought in as a value
      // survives into the emitted import and fails at runtime.
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      // `noUncheckedIndexedAccess` is only worth having if `!` cannot undo it.
      "@typescript-eslint/no-non-null-assertion": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
    },
  },

  /* Browser code. `no-console` is scoped to this layer only: a stray log in the
     shipped bundle is a defect, whereas the prerender script logs on purpose. */
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [reactHooks.configs["recommended-latest"]],
    languageOptions: { globals: globals.browser },
    rules: { "no-console": "error" },
  },

  /* Fast Refresh applies to the modules Vite hot-swaps in the browser. The SSR
     entry is built separately by `vite build --ssr` and is never an HMR
     boundary, so holding it to the one-component-per-module rule would be the
     tooling dictating the architecture rather than reporting a defect. */
  {
    files: ["src/**/*.tsx"],
    ignores: ["src/entry-server.tsx"],
    plugins: { "react-refresh": reactRefresh },
    rules: {
      "react-refresh/only-export-components": [
        "error",
        // `useLocale` ships beside its provider on purpose: it is the only
        // supported way to read that context.
        { allowConstantExport: true, allowExportNames: ["useLocale"] },
      ],
    },
  },

  /* Node contexts: build config, the prerender script, the e2e suite. The
     scripts directory is plain ESM with no type information, so it is linted by
     the untyped rules rather than forced into a TypeScript program it is not
     part of — `allowJs` is off, so it is genuinely not in one. */
  {
    files: ["*.config.{js,ts}", "scripts/**/*.mjs", "tests/**/*.ts"],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
);
