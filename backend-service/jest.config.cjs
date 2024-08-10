const path = require('path');

const config = {
    transform: {
      "^.+\\.[tj]sx?$": ["babel-jest", { configFile: path.resolve(__dirname, "./babel.config.json") }],
    },
    transformIgnorePatterns: ["/node_modules/(?!(supertest)/)", "\\.svg$"],
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts", ".tsx", ".jsx"],
    moduleFileExtensions: ["js", "json", "ts", "tsx"],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      "\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$": "jest-transform-stub"
    },
    collectCoverage: true,
    coverageReporters: ["text", "html"]
};

module.exports = config;