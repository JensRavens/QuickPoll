const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const mode = process.env.NODE_ENV || "development";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");

const config = {
  mode,
  entry: "./client/index.tsx",
  output: {
    path: process.cwd() + "/dist",
    filename: "[name].[hash].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        exclude: /node_modules/,
        enforce: "pre",
      },
      {
        test: /\.(svg)$/,
        use: [
          "file-loader",
          {
            loader: "svgo-loader",
            options: {
              plugins: [
                { removeTitle: true },
                { convertColors: { shorthex: false } },
                { convertPathData: false },
              ],
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ["file-loader"],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"],
      },
      {
        test: /\.ya?ml$/,
        use: ["js-yaml-loader"],
      },
      {
        test: /\.css$/,
        use: [
          mode !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      },
    ],
  },
  resolve: {
    alias: { "react-dom": "@hot-loader/react-dom" },
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "QuickPoll",
      template: "./client/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[name]-[id]-[hash].css",
    }),
    new CopyWebpackPlugin([{ from: "./public" }]),
    new webpack.ExternalsPlugin("commonjs", ["electron"]),
  ],
  performance: {
    hints: false,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  devServer: {
    contentBase: "./public",
    hot: true,
    watchContentBase: true,
    historyApiFallback: true,
    disableHostCheck: true,
    transportMode: "ws",
    proxy: {
      "/socket.io": {
        target: "http://localhost:3000",
        secure: false,
        changeOrigin: true,
        ws: true,
      },
    },
  },
};

if (mode == "production") {
  Object.assign(config, {
    optimization: {
      minimizer: [new TerserPlugin({})],
      splitChunks: {
        chunks: "all",
      },
    },
  });
}

if (mode == "development") {
  Object.assign(config, {
    devtool: "cheap-module-source-map",
  });
}

module.exports = config;
