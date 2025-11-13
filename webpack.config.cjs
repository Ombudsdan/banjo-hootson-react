const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();
const getEnv = require('./get-env.cjs');

const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DEV = NODE_ENV !== 'production';
// Enable React Refresh only when actually running webpack-dev-server, not for static builds
const ENABLE_REACT_REFRESH = IS_DEV && process.argv.some(arg => /webpack(.+)?serve/.test(arg));
const ENV = { ...getEnv(process.env), NODE_ENV };

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: IS_DEV ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src', 'main.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: IS_DEV ? 'assets/js/[name].js' : 'assets/js/[name].[contenthash:8].js',
    chunkFilename: IS_DEV ? 'assets/js/[name].chunk.js' : 'assets/js/[name].[contenthash:8].chunk.js',
    assetModuleFilename: 'assets/media/[name][ext]',
    clean: true,
    publicPath: '/'
  },
  devtool: IS_DEV ? 'eval-source-map' : 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      builders: path.resolve(__dirname, 'src/builders'),
      components: path.resolve(__dirname, 'src/components'),
      controllers: path.resolve(__dirname, 'src/controllers'),
      enums: path.resolve(__dirname, 'src/enums/index.ts'),
      env: path.resolve(__dirname, 'src/env/index.ts'),
      framework: path.resolve(__dirname, 'src/framework'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      icons: path.resolve(__dirname, 'src/icons.ts'),
      layout: path.resolve(__dirname, 'src/layout'),
      model: path.resolve(__dirname, 'src/model'),
      pages: path.resolve(__dirname, 'src/pages'),
      routes: path.resolve(__dirname, 'src/routes'),
      services: path.resolve(__dirname, 'src/services'),
      test: path.resolve(__dirname, 'src/test'),
      utils: path.resolve(__dirname, 'src/utils'),
      validators: path.resolve(__dirname, 'src/validators')
    }
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [ENABLE_REACT_REFRESH && require.resolve('react-refresh/babel')].filter(Boolean),
            presets: [
              [require.resolve('@babel/preset-env'), { targets: 'defaults', modules: false }],
              [
                require.resolve('@babel/preset-react'),
                {
                  runtime: 'automatic',
                  // Only enable dev JSX transform when actually running the dev server.
                  // This prevents jsxDEV from leaking into static builds (dev or prod).
                  development: ENABLE_REACT_REFRESH,
                  importSource: 'react'
                }
              ],
              require.resolve('@babel/preset-typescript')
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [require.resolve('style-loader'), require.resolve('css-loader')]
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: { importLoaders: 1 }
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              // Prefer Dart Sass
              implementation: require('sass'),
              sassOptions: {
                // Ensure modern Sass modules are available
                silenceDeprecations: ['legacy-js-api']
              }
            }
          }
        ]
      },
      { test: /\.svg$/, type: 'asset/resource' },
      { test: /\.(png|jpe?g|gif|webp|ico)$/i, type: 'asset/resource' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'index.html') }),
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify(ENV)
    }),
    ENABLE_REACT_REFRESH && new ReactRefreshWebpackPlugin()
  ].filter(Boolean),
  devServer: {
    static: { directory: path.resolve(__dirname, 'public') },
    historyApiFallback: true,
    port: ENV.PORT,
    hot: true,
    open: false,
    proxy: [
      {
        context: ['/plushie-birthdays', '/users', '/location', '/health'],
        target: ENV.API_URL,
        changeOrigin: true
      }
    ]
  },
  performance: { hints: false }
};
