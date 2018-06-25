const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    devServer: {
        // contentBase: path.join(__dirname, 'dist'),
        // compress: true,
        // port: 9000
        host: 'localhost',
        port: 9000,
        historyApiFallback: true,
        open: true,
        hot: true
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.ts|\.tsx$/,
                use: 'awesome-typescript-loader',
                include: __dirname
            },
            { test: /\.css$/,   loader: 'style-loader!css-loader' },
            { test: /\.less$/,  loader: 'style-loader!css-loader!less-loader' },
            { test: /\.scss$/,  loader: 'style-loader!css-loader!resolve-url-loader!sass-loader' },
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,      loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,    loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,       loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,       loader: 'file-loader' },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,       loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
            { test: /\.png$/, loader: "url-loader?mimetype=image/png"},
            { test: /\.gif$/, loader: "url-loader?mimetype=image/png"},
            // {
            //     test: /\.(scss)$/,
            //     use: [{
            //         loader: 'style-loader', // inject CSS to page
            //     }, {
            //         loader: 'css-loader', // translates CSS into CommonJS modules
            //     }, {
            //         loader: 'postcss-loader', // Run post css actions
            //         options: {
            //             plugins: function () { // post css plugins, can be exported to postcss.config.js
            //                 return [
            //                     require('precss'),
            //                     require('autoprefixer')
            //                 ];
            //             }
            //         }
            //     }, {
            //         loader: 'sass-loader' // compiles Sass to CSS
            //
            //  }]
            // },
        ],

    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            favicon: 'public/favicon.ico'
        }),
        // ['import', { libraryName: "antd", style: true }]
    ],
};