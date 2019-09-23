'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env, args) => {
  const {mode} = args;

  return {
    mode,
    entry: {
      main: path.resolve('src/index.js'),
      polyfills: 'core-js/stable',
    },
    output: {
      path: path.resolve('dist'),
      filename: '[name].bundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {},
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx)$/,
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          use: {
            loader: 'babel-loader',
            options: {
              envName: mode,
              configFile: true,
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        chunksSortMode: 'manual',
        chunks: ['polyfills', 'vendors', 'main'],
      }),
    ],
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/](!core-js)[\\/]/,
            chunks: 'all',
            name: 'vendors',
          },
        },
      },
      runtimeChunk: false,
      minimize: false,
    },
    performance: {
      hints: false,
    },
    devtool: 'eval',
    stats: 'minimal',
    devServer: {
      port: 9000,
      open: true,
    },
  };
};
