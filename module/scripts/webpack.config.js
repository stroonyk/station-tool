const path = require('path');
const AssetsPlugin = require('assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, { mode }) => {
  const useBundleAnalyzerPlugin = mode !== 'production' || (env && env.local);
  let BundleAnalyzerPlugin;
  if (useBundleAnalyzerPlugin) {
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  }

  return {
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      library: 'StationReader',
      libraryTarget: 'umd',
    },
    externals: {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
        umd: 'react',
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
        umd: 'react-dom',
      },
    },
    optimization: {
      usedExports: true,
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
                configFile: '../tsconfig.json',
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(mp3)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 20000,
                fallback: 'file-loader',
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
            },
            { loader: 'resolve-url-loader' },
            {
              loader: 'sass-loader?sourceMap',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.tsx|.ts$/,
          enforce: 'pre',
          exclude: /(node_modules|bower_components|\.spec\.js)/,
          use: [{ loader: 'webpack-strip-block' }],
        },
        {
          test: /\.(svg|jpg)$/i,
          type: 'asset/source',
        },
        {
          test: /\.(png)$/i,
          type: 'asset/inline',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        // RiskTool: path.resolve(__dirname, '../', 'dist', 'main.js'),
        assets: path.resolve(__dirname, 'dist/assets'),
      },
      symlinks: true,
    },
    plugins: [
      // ...(useBundleAnalyzerPlugin
      //   ? [
      //       new BundleAnalyzerPlugin({
      //         openAnalyzer: true,
      //         analyzerPort: 8881,
      //       }),
      //     ]
      //   : []),
      new MiniCssExtractPlugin({}),
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../src/fonts'),
          to: 'assets/fonts',
        },
      ]),
      new AssetsPlugin({
        filename: 'assets-manifest.json',
        fullPath: true,
        path: path.resolve(__dirname, '../dist/assets'),
        prettyPrint: true,
      }),
    ],
  };
};
