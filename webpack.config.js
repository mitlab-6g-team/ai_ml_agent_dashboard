module.exports = {
    // ...其他配置
    ignoreWarnings: [(warning) =>
      warning.includes("Failed to parse source map")
    ],
  };
  