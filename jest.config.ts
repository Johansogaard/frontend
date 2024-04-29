import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'jest-environment-jsdom', // Update this line
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files
    '^.+\\.jsx?$': 'babel-jest' // Transform JavaScript files
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mocks out CSS imports if used
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js'

  }
};
export default config;