/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  collectCoverage: false, // run manually for now
  collectCoverageFrom: [
      'src/**/*.js'
  ],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.github/',
    '/.vscode/',
    '/dist/'
  ],
  coverageProvider: "v8",
  setupFiles: [
    './jest.setup.js'
  ]
};