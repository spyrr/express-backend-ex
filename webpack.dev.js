const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
  mode: "development",

  devtool: "inline-source-map",

  devServer: {
    contentBase: __dirname + '/dist/',
    historyApiFallback: true,
    inline: true,
    port: 18888,
    hot: true,
    publicPath: "/",
  },
  plugins: [
    new CopyWebpackPlugin({
        patterns: [
            './node_modules/swagger-ui-dist/swagger-ui.css',
            './node_modules/swagger-ui-dist/swagger-ui-bundle.js',
            './node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js',
            './node_modules/swagger-ui-dist/favicon-16x16.png',
            './node_modules/swagger-ui-dist/favicon-32x32.png'
        ]
    })
]
});
