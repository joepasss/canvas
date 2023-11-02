import path from "path";
import { fileURLToPath } from "url";
import { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";

const commonConfig: Configuration = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(fileURLToPath(import.meta.url), "../../dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.jsx?$/,
        use: ["babel-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html",
    }),
    new CleanWebpackPlugin(),
  ],
};

export default commonConfig;
