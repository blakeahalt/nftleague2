// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};

module.exports = function override(config, env) {
  //do stuff with the webpack config...

  config.resolve.fallback = {
      url: require.resolve('url'),
      assert: require.resolve('assert'),
      crypto: require.resolve('crypto-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify/browser'),
      buffer: require.resolve('buffer'),
      stream: require.resolve('stream-browserify'),
      path: require.resolve('path-browserify'),
  };
  
  // config.plugins.push(
  //     new webpack.ProvidePlugin({
  //         process: 'process/browser',
  //         Buffer: ['buffer', 'Buffer'],
  //     })
  // );

  return config;
};
