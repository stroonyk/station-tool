import chalk from 'chalk';
import { resolve } from 'path';

const rspack = require('@rspack/core');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { sentryWebpackPlugin } = require('@sentry/webpack-plugin');

module.exports = (env: any, { mode }: { mode: string }) => {
  const isDevMode = mode === 'development';

  (() => {
    console.log(chalk.bgGreen('rspack starting build'));
    console.log(
      chalk.yellow.bold('rspack building in'),
      chalk.blue.bold(mode),
      chalk.yellow.bold('mode')
    );
  })();

  return {
    entry: {
      index: resolve(__dirname, '../src/index.tsx'),
    },
    output: {
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].js',
      path: resolve(__dirname, '../dist/client'),
      publicPath: '/',
    },
    mode,
    resolve: {
      alias: {
        react: resolve('./node_modules/react'),
        'react-dom': resolve('./node_modules/react-dom'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss', '.svg'],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
          },
        },
      },
    },
    devtool: isDevMode ? 'source-map' : false,
    node: {
      global: true,
    },
    experiments: {
      css: true,
      incrementalRebuild: true,
      outputModule: true,
    },
    module: {
      rules: [
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.(png|jpg|gif|mp4)$/i,
          type: 'asset',
        },
        {
          test: /\.(tsx?$|jsx?$)/,
          use: {
            loader: 'builtin:swc-loader',
            options: {
              sourceMap: true,
              jsc: {
                parser: {
                  syntax: 'typescript',
                  jsx: true,
                },
                transform: {
                  react: {
                    pragma: 'React.createElement',
                    pragmaFrag: 'React.Fragment',
                    throwIfNamespace: false,
                    development: isDevMode,
                    useBuiltins: false,
                    runtime: 'automatic',
                  },
                },
                // experimental: {
                //   plugins: [
                //     !isDevMode && [
                //       "@swc/plugin-remove-console",
                //       {
                //         exclude: ["error"],
                //       },
                //     ],
                //   ],
                // },
              },
            },
          },
          type: 'javascript/auto',
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: resolve(__dirname, 'postcss.config.js'),
                },
              },
            },
            'sass-loader',
          ],
          type: 'css',
        },
      ],
    },
    plugins: [
      new NodePolyfillPlugin(),
      new rspack.ProgressPlugin(),
      new rspack.DefinePlugin({
        'process.env': {
          npm_package_version: process.env.npm_package_version,
        },
      }),
      new rspack.CopyRspackPlugin({
        patterns: [
          {
            from: resolve(__dirname, '../img'),
            to: 'img',
          },
          {
            from: resolve(__dirname, '../src/fonts'),
            to: '../client/assets/fonts',
          },
        ],
      }),
      new AssetsWebpackPlugin({
        filename: 'assets-manifest.json',
        fullPath: true,
        path: resolve(__dirname, '../dist/client'),
        prettyPrint: true,
      }),
      sentryWebpackPlugin({
        org: 'rradar',
        project: 'station-ui',
        authToken: process.env.SENTRY_AUTH_TOKEN,
        sourceMaps: {
          assets: resolve(__dirname, '../dist'),
        },
        telementary: !isDevMode,
      }),
    ],
  };
};
