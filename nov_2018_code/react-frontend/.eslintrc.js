module.exports = {
    "env": {
        "es6": true,
        "browser": true,
        "node": true,
    },
    "parser": "babel-eslint",
    "plugins": [
        "react"
    ],
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true,
          "modules": true,
          "experimentalObjectRestSpread": true
        }
    },
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "comma-dangle": 0,
        "react/jsx-uses-vars": 1,
        "react/display-name": 1,
        "no-unused-vars": "warn",
        "no-unexpected-multiline": "warn"
    },
    "settings": {
        "react": {
            "pragma": "React",
            "version": "16.5.2"
        }
    }
};
