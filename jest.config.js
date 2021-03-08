module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts', '<rootDir>/setupEnzyme.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
};
