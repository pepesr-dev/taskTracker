export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  // Mapea las extensiones .js de los imports a los archivos reales .ts
  moduleNameMapper: {
    "^(\\..*)\\.js$": "$1",
  },
};
