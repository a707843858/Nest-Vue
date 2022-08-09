const path = require('path')
const { VueLoaderPlugin } = require("vue-loader");


module.exports = {
  entry: path.resolve(__dirname,'src/core/index.ts'),
  resolve: {
    extensions: ['.ts','.tsx','.vue'],
    alias: {
      "@": path.resolve(__dirname, "src/")
    }
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname,'src/core')
  },
  module: {
    unknownContextCritical: false,
    rules: [
      {
        test: /\.tsx?$/,
        use:'ts-loader',
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
}
