module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    "**/__tests__/**/*.(spec|test).[tj]s"
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],
};