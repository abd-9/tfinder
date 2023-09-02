module.exports = {
  root: true,
  // extends: '@react-native-community',
  extends: ['plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        // 'no-unused-vars': 'warn',
        // '@typescript-eslint/no-unused-vars': 'error',
      },
    },
  ],
};
