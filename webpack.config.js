const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const BUILD_DIR = path.resolve(__dirname, "build");
const APP_DIR = path.resolve(__dirname, "src");

module.exports = env => {
    return {
        entry: {
            vendor: [
                "vue",
            ],
            main: APP_DIR + "/main.js",
        },
        output: {
            path: BUILD_DIR,
            filename: "js/[name].[hash:6].js",
            publicPath: "/",
        },
        optimization: {
            splitChunks: {
                cacheGroups: {
                    vendor: {
                        chunks: 'initial',
                        name: 'vendor',
                        test: 'vendor',
                        enforce: true
                    },
                }
            },
            runtimeChunk: true
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: "vue-loader",
                    options: {
                        compilerOptions: {
                            preserveWhitespace: false,
                        }
                    }

                },
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: {
                                    browsers: [ "last 1 version", "ie >= 11" ]
                                }
                            }]
                        ],
                        plugins: ["transform-remove-strict-mode"],
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: [
                        'vue-style-loader',
                        'css-loader'
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [{
                        loader: "vue-style-loader",
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader",
                    }]
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: "file-loader?name=images/img-[hash:6].[ext]&publicPath=/",
                    exclude: /node_modules/,
                },
                {
                    test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
                    use: ['file-loader']
                },
            ],
        },
        resolve: {
            extensions: [".js", ".json", ".vue"],
        },
        plugins: [
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: "styles.[hash:6].css",
            }),
            new HtmlWebpackPlugin({
                template: "public/index.html",
                filename: "index.html",
                hash: true,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    // More options:
                    // https://github.com/kangax/html-minifier#options-quick-reference
                },
            }),

            new webpack.DefinePlugin({
                "process.env": {
                    ENV: JSON.stringify(env)
                },
            }),
        ],
        devServer: {
            historyApiFallback: true,
            hot: true,
        },
        devtool: "#eval-source-map",
    };
};
