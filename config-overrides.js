// /* eslint-disable @typescript-eslint/no-var-requires */
// /* eslint-disable prettier/prettier */
// const webpack = require('webpack');

// module.exports = function override(config) {
//     const fallback = config.resolve.fallback || {};
//     Object.assign(fallback, {
//         "crypto": require.resolve("crypto-browserify"),
//         "stream": require.resolve("stream-browserify"),
//         "assert": require.resolve("assert"),
//         "http": require.resolve("stream-http"),
//         "https": require.resolve("https-browserify"),
//         "os": require.resolve("os-browserify"),
//         "url": require.resolve("url"),
//         "zlib": require.resolve("browserify-zlib"),
//         "path": require.resolve("path-browserify")
//     })
//     config.resolve.fallback = fallback;
//     config.plugins = (config.plugins || []).concat([
//         new webpack.ProvidePlugin({
//             process: 'process/browser',
//             Buffer: ['buffer', 'Buffer']
//         })
//     ])
//     return config;
// }

/* config-overrides.js */
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const webpack = require('webpack-browser');
import webpack from 'webpack';
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
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        })
    );

    return config;
};



