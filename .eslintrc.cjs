module.exports = {
    env: {
        node: true,
        es2021: true,
    },

    extends: [
        "airbnb-base",
        "eslint:recommended",
        "plugin:import/recommended",
        "prettier",
    ],
    parserOptions: {
        ecmaVersion: 14,
        sourceType: "module",
    },
    plugins: ["import", "prettier"],
    rules: {
        "import/prefer-default-export": "off",
        "import/extensions": ["error", "ignorePackages"],
        "prettier/prettier": 0,
        "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        "no-underscore-dangle": 0,
        "max-classes-per-file": 0,
    },
};
