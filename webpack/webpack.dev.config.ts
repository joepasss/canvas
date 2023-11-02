import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import commonConfig from "./webpack.common.config";
import { merge } from "webpack-merge";
import path from "path";
import { fileURLToPath } from "url";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const devConfig: Configuration = merge(commonConfig, {
  mode: "development",
  output: {
    filename: "main.js",
  },
  devServer: {
    port: 9000,
    static: path.resolve(fileURLToPath(import.meta.url), "../../dist"),
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
    },
    client: {
      overlay: true,
    },
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
    ],
  },
});

export default devConfig;
