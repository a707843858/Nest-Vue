const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = function(options,webpack) {

  const { resolve, module } = options;

  options.entry = ["webpack/hot/poll?100", options.entry];

  /* Resolve */
  resolve.extensions = [...resolve.extensions, ".vue"];
  resolve.alias = {
    "@": path.resolve(__dirname, "src/")
  };

  /* Module */
  module.rules = module.rules.concat([
    {
      test: /\.vue$/,
      loader: "vue-loader"
    }
  ]);

  /* Plugins */
  options.plugins = options.plugins.concat([
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.WatchIgnorePlugin({
      paths: [/\.js$/, /\.d\.ts$/],
    }),
    new RunScriptWebpackPlugin({ name: options.output.filename, autoRestart: false }),
  ])

  return {
    ...options,
    externals: [
      nodeExternals({
        allowlist: ["webpack/hot/poll?100"]
      })
    ],
  };
};
