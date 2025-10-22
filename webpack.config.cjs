const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const webpack = require("webpack");
require("dotenv").config();

const isDev = process.env.NODE_ENV !== "production";

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: isDev ? "development" : "production",
  entry: path.resolve(__dirname, "src", "main.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isDev
      ? "assets/js/[name].js"
      : "assets/js/[name].[contenthash:8].js",
    chunkFilename: isDev
      ? "assets/js/[name].chunk.js"
      : "assets/js/[name].[contenthash:8].chunk.js",
    assetModuleFilename: "assets/media/[name][ext]",
    clean: true,
    publicPath: "/",
  },
  devtool: isDev ? "eval-source-map" : "source-map",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      services: path.resolve(__dirname, "src/services"),
      utils: path.resolve(__dirname, "src/utils"),
      model: path.resolve(__dirname, "src/model"),
      env: path.resolve(__dirname, "src/env/index.ts"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [isDev && require.resolve("react-refresh/babel")].filter(
              Boolean
            ),
            presets: [
              [
                require.resolve("@babel/preset-env"),
                { targets: "defaults", modules: false },
              ],
              [
                require.resolve("@babel/preset-react"),
                {
                  runtime: "automatic",
                  development: isDev,
                  importSource: "react",
                },
              ],
              require.resolve("@babel/preset-typescript"),
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: [require.resolve("style-loader"), require.resolve("css-loader")],
      },
      { test: /\.svg$/, type: "asset/resource" },
      { test: /\.(png|jpe?g|gif|webp|ico)$/i, type: "asset/resource" },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, "index.html") }),
    new webpack.DefinePlugin({
      __ENV__: JSON.stringify({
        API_URL: process.env.API_URL || "http://localhost:3000",
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY || "",
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN || "",
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID || "",
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID || "",
        FIREBASE_MESSAGING_SENDER_ID:
          process.env.FIREBASE_MESSAGING_SENDER_ID || "",
      }),
    }),
    isDev && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  devServer: {
    static: { directory: path.resolve(__dirname, "public") },
    historyApiFallback: true,
    port: process.env.PORT
      ? Number(process.env.PORT)
      : process.env.port
      ? Number(process.env.port)
      : 5173,
    hot: true,
    open: false,
    proxy: [
      {
        context: ["/plushie-birthdays", "/users", "/location", "/health"],
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    ],
  },
  performance: { hints: false },
};
