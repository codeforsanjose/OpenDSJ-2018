const path = require('path'),
    paths = {
        entry: path.resolve('client', 'index.js'),
        build: path.resolve('public'),
        output: 'bundle.js',
    };

module.exports = {
    mode: 'development',
    entry: [
        // 'webpack-hot-middleware/client?reload=true', - have to add hot middleware to express server
        paths.entry
    ],
    output: {
        path: paths.build,
        filename: paths.output,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            }
        ]
    }
};
