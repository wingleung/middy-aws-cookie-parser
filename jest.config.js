module.exports = {
  collectCoverage: true,
  coveragePathIgnorePatterns: [
    'node_modules'
  ],
  moduleDirectories: ['node_modules', 'src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [ '**/?(*.)+(spec|test).[t]s?(x)' ]
}