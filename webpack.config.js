const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");

const package = require("./package.json");

let config = {
  mode: process.env.NODE_ENV,
  entry: path.join(__dirname, "src", "index.ts"),
  output: {
    path: path.join(__dirname, "dist"),
    filename: package.name + ".js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx"]
  },
  plugins: [new webpack.optimize.ModuleConcatenationPlugin()]
};

if (process.env.DEMO) {
  config.entry = path.join(__dirname, "demo", "demo.ts");
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "demo", "template.html")
    })
  );
}

if (process.env.MINIFY) {
  config.plugins.push(new UglifyWebpackPlugin());
}

module.exports = config;
