// webpack要有一個進入點entry他才知道要幫我們翻譯哪一個檔案就是src資料夾
// mode是模式要不要把檔案壓縮
// output是編譯後輸出的檔案路徑也就是dist資料夾
// webpack 本身其實看不懂除了 js 以外的東西(例如：css、圖片、sass...)，所以為了要讓 webpack 也能理解它，就需要倚賴眾多有用的 loaders
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const { Hash } = require('crypto');
module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.[hash].js',

    },
    module: {
        rules: [
            {
                test: /\.css$|\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader', 'postcss-loader'],

            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'index.[hash].css'
        }),
        new CleanWebpackPlugin(),
    ],
}