import { VueLoaderPlugin } from "vue-loader";
import { Configuration }   from "webpack";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

console.log(process.cwd(), "process.cwd()");
export default (args: webpackConfigArgs) => {
  const { entry } = args;
  return {
    entry: entry,
    mode: "development",
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".vue"],
      plugins: [
        new TsconfigPathsPlugin()
      ]
    },
    output: {
      filename: "[name].[contenthash].bundle.js"
    },
    module: {
      rules: [
        {
          test: /tsx?$/,
          loader: "ts-loader"
        },
        {
          test: /\.vue$/,
          loader: "vue-loader"
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  } as Configuration;
}

export interface webpackConfigArgs {
  /* 入口文件路径 */
  entry: Configuration['entry'];

  /* 别名 */
  alias?: Configuration['resolve']['alias'];
}
