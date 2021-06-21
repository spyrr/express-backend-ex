const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "production",
    
    devtool: "cheap-module-source-map",
    
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {myCustomOption: true,},
                // Can be async
                minify: (file, sourceMap, minimizerOptions) => {
                    // The `minimizerOptions` option contains option from the `terserOptions` option
                    // You can use `minimizerOptions.myCustomOption`
                    const extractedComments = [];
                    
                    // Custom logic for extract comments
                    
                    const { map, code } = require("uglify-js")
                        .minify(file, {
                            sourceMap: {
                                filename: 'main.js',
                                url: 'main.js.map'
                            },
                            /* Your options for minification */
                            compress: {
                                dead_code: true,
                                global_defs: {
                                    DEBUG: false,
                                }
                            },
                            mangle: {}
                        });
                    
                    return { map, code, extractedComments };
                },
            }),
        ],
    },
    plugins: [new CleanWebpackPlugin()],
});