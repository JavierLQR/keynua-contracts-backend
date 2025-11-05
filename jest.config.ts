import type { Config } from 'jest'
import { pathsToModuleNameMapper } from 'ts-jest'

import { readFileSync } from 'fs'
import { join } from 'path'

// Minimal typed shape for tsconfig paths
interface TsConfig {
  compilerOptions?: {
    paths?: Record<string, string[]>
    [key: string]: unknown
  }
}

// read & parse tsconfig.json with an explicit type assertion
const tsconfigPath = join(__dirname, 'tsconfig.json')
const tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf8')) as TsConfig

// safe, typed paths value for pathsToModuleNameMapper
const tsPaths: Record<string, string[]> = tsconfig.compilerOptions?.paths ?? {}

const config: Config = {
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  moduleFileExtensions: ['ts', 'js', 'json'],
  transform: {
    '^.+\\.(t|j)s$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: true,
          },
          transform: {
            decoratorMetadata: true,
          },
          target: 'es2022',
        },
        module: {
          type: 'commonjs',
        },
      },
    ],
  },
  verbose: true,

  // 🔥 Agrega esto para que Jest reconozca tus paths como @app/*
  moduleNameMapper: pathsToModuleNameMapper(tsPaths, {
    prefix: '<rootDir>/../',
  }),

  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
}

export default config
