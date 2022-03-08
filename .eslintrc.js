module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "amd": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": ["react", "@typescript-eslint"],
  "rules": {
    "no-alert": "error",
    "keyword-spacing": "error",
    "no-empty": "error",
    "prefer-const": "off",
    "indent": "off",
    "linebreak-style": ["error", "windows"],
    "semi": ["error", "always"],
    "quotes": "off",
    "no-console": [
      "warn", { 
        "allow": ["info", "error"]
      }
    ],

    // React
    "react/react-in-jsx-scope": "off",

    // TypeScript
    "@typescript-eslint/no-var-requires": "warn",
    "@typescript-eslint/quotes": "off",
  }
};
