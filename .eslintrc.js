module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: ['import'],
    extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                directory: './',
            },
        },
    },
    rules: {
        'import/first': 'off',
        // "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        // '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/interface-name-prefix': 'off',
    },
};
