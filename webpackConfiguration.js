const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /.jsx?$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'react']
            }
        },
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(
                'style-loader',
                'css-loader?modules&sourceMap&importLoaders=1&camelCase&localIdentName=[local]'
            )
        }
      ]
    },
    output: {
        filename: 'app.js',
        path: path.resolve(process.cwd(), 'dist')
    },
    plugins: [
        new ExtractTextPlugin('app.css', {
            allChunks: true
        })
    ],
    stats: {
        colors: true,
        reasons: true
    },
    devtool: '#inline-source-map',
    externals: [
        (function ignoreElectron() {
            var IGNORES = [
                'electron'
            ];
            return (context, request, callback) => {
                if (IGNORES.indexOf(request) >= 0) {
                    return callback(null, "require('" + request + "')");
                }
                return callback();
            };
        }())
    ]
};