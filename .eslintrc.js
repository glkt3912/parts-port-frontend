module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "next",
        "next/core-web-vitals"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "files": ['**/*.{js,jsx,ts,tsx}'],
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off"
    },
    "settings": {
        "react": {
            "version": "18.2.0"
        }
    }
}
