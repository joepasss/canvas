import prodConfig from "./webpack.prod.config";
import { merge } from "webpack-merge";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { Configuration } from "webpack";

const analyzeConfig: Configuration = merge(prodConfig, {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: "server",
      openAnalyzer: false,
      analyzerPort: 8888,
    }),
  ],
});

export default analyzeConfig;
