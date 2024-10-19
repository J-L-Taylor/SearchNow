module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true // Add Node.js environment support
    },
    "extends": [
        "eslint:recommended",
        "plugin:import/errors", // Add import plugin for better module handling
        "plugin:import/warnings",
        "plugin:import/typescript"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module" // Enable ES6 modules
    },
    "rules": {
        "semi": ["error", "always"], // Enforce semicolons
        "quotes": ["error", "single"], // Enforce single quotes
        "no-unused-vars": ["warn"], // Warn on unused variables
        "no-console": "off", // Allow console statements
        "indent": ["error", 4], // Enforce 4-space indentation
        "linebreak-style": ["error", "unix"], // Enforce Unix linebreaks
        "eqeqeq": ["error", "always"], // Enforce strict equality
        "curly": ["error", "all"] // Enforce consistent brace style
    },
    "overrides": [
        {
            "files": ["*.ts", "*.tsx"],
            "parser": "@typescript-eslint/parser",
            "extends": [
                "plugin:@typescript-eslint/recommended"
            ],
            "rules": {
                "@typescript-eslint/no-unused-vars": ["warn"]
            }
        }
    ],
    "plugins": [
        "import", // Add import plugin
        "@typescript-eslint" // Add TypeScript plugin
    ]
};
