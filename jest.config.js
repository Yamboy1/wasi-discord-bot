/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  collectCoverage: true,
  roots: ["test", "src"],
  collectCoverageFrom: ["src/**.ts"],
  testEnvironment: "node",
};
