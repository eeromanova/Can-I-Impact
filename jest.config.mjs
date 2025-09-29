import nextJest from 'next/jest.js';

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '^@/shared/(.*)$': '<rootDir>/shared/$1',
    '^@/utils/(.*)$': '<rootDir>/shared/utils/$1',
    '^@/utils$': '<rootDir>/shared/utils/index.ts',
  },
};

export default createJestConfig(customJestConfig);
