// eslint-disable-next-line no-undef
module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/.jest/setup-tests.ts'],
  moduleNameMapper: {
    '\\.(gif|ttf|eot|svg|png|webp)$': '<rootDir>/.jest/fileMock.js',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '@components': '<rootDir>/src/components',
    '@providers': '<rootDir>/src/providers',
    '@constants': '<rootDir>/src/constants',
    '@hooks': '<rootDir>/src/hooks',
    '@utils': '<rootDir>/src/utils',
    '@api': '<rootDir>/src/api',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.styles.*',
    '!src/main.tsx',
    '!src/api/supabaseClient.ts',
    '!src/providers/themeProvider/createTheme.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
  coverageReporters: ['lcov', 'text'],
};
