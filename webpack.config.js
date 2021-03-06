const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  devtool: "source-map",
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "main.bundle.[hash].js",
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 5000,
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./static/base.html",
      favicon: "./static/picture/minilogofavi.ico",
    }),
    new MiniCssExtractPlugin({
      filename: "style.[hash].css",
    }),
  ],
  module: {
    rules: [
      // {
      //   test: /\.css$/i,
      //   use: [MiniCssExtractPlugin.loader, "css-loader"],
      // },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(jpe?g|png|gif|svg|mp4)$/,
        type: "asset/resource",
      },
    ],
  },
};
