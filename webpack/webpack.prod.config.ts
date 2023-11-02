import { Chunk, Configuration, Module } from "webpack";
import { merge } from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import commonConfig from "./webpack.common.config";

const prodConfig: Configuration = merge(commonConfig, {
  mode: "production",
  output: {
    filename: "js/[name].[contenthash:12].js",
  },
  optimization: {
    minimize: true,
    minimizer: [
      `...`,
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxSize: Infinity,
      minSize: 2000,
      cacheGroups: {
        node_modules: {
          test: /[\\/]node_modules[\\/]/,
          name: "node_modules",
          chunks: "initial",
        },
        async: {
          test: /[\\/]node_modules[\\/]/,
          chunks: "async",
          name(module: Module, chunks: Array<Chunk>) {
            return chunks.map((chunk: Chunk) => chunk.name).join("-");
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:12].css",
    }),
  ],
});

export default prodConfig;
