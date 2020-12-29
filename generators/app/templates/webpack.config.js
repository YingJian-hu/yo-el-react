const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractLESS = new ExtractTextPlugin('app.[contenthash:8].css');

module.exports = {
    entry: "./app/build/index.jsx",
    output: {
        path: path.resolve(__dirname, './app/public/static/'),
        filename: 'app.[chunkhash:8].js',
    },
    devtool: 'cheap-module-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modles)/,
                use: ['babel-loader'],
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modles)/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {targets: "defaults"}],
                            '@babel/preset-react'
                        ]
                    }
                }]
            },
            {
                test: /\.(less|css)$/,
                use: extractLESS.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            filename: '../views/index.html',
            template: './app/build/views/index.html'
        }),
        extractLESS
    ]
}
