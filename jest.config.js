module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
    testPathIgnorePatterns: ["/dist"],  // Run interpreted typescript tests from src instead with ts-jest
    verbose: true,
};