const path = require("path");

const resourcesConfig = {
  loader: "sass-resources-loader",
  options: {
    sourceMap: true,
    resources: [path.resolve(__dirname, "src")],
  },
};

module.exports = function override(config, _env) {
  // Resolve paths
  config.resolve.alias["@"] = path.resolve(__dirname, "src");
  config.resolve.alias["@public"] = path.resolve(__dirname, "public");
  
  // Add sass-resources-loader
  for (let i = config.module.rules.length - 1; i > -1; i--) {
    const rule = config.module.rules[i];

    if (rule.oneOf) {
      for (let j = 0; j < rule.oneOf.length; j++) {
        const inner = rule.oneOf[j];
        // Add scss resources
        if (String(inner.test).indexOf("scss") > -1)
          if (Array.isArray(inner.use)) inner.use.push(resourcesConfig);
      }
    }
  }

  return config;
};
