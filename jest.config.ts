import path from 'path';

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  collectCoverage: false, // run manually for now
  collectCoverageFrom: [
      'src/**/*.js',
      'src/**/*.ts',
  ],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.github/',
    '/.vscode/',
    '/dist/'
  ],
  coverageProvider: "v8",
  preset: 'ts-jest',
  setupFiles: [
    path.join(__dirname, 'jest.setup.ts')
  ]
};
