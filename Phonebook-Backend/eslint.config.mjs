import globals from "globals";
import pluginJs from "@eslint/js";
import stylisticJs from '@stylistic/eslint-plugin-js'

/** @type {import('eslint').Linter.Config[]} */
export default [
  pluginJs.configs.recommended,
  {
    files: ["**/*.js"],
     languageOptions: {
      sourceType: "commonjs",
      ecmaVersion: "latest",
      globals:globals.node,
    },
    plugins:{ '@stylistic/js': stylisticJs  },
    rules:{
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': 'error',
      'arrow-spacing': [      'error', { 'before': true, 'after': true },    ],
      'no-console':'off'
    }
  },
  {ignores: ["dist/**", "build/**","**/*.config.mjs","mongo.js"],  }
];