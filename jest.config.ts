import type { Config } from 'jest'

const config: Config = {
  clearMocks: true,
  modulePathIgnorePatterns: ['bin/'],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
}

export default config
