var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
// var utils = require('./utils')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var webpack = require('webpack')
// var config = require('../config')

module.exports = {
  entry: {
    default: path.join(__dirname, 'app/main.js'),
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: [
      path.resolve(__dirname + "/node_modules/")
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname),
        exclude: /node_modules/,
        options: {
          presets: ['es2015'],
          "plugins": [
            ["transform-react-jsx", {
              "pragma": "m"
            }]
          ]
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.join(__dirname + 'img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.join(__dirname + 'fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.css$/,
        include: path.join(__dirname),
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true,
                sourceMap: process.env.NODE_ENV === 'development'
              }
            }
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].[contenthash].css"),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: process.env.NODE_ENV === 'production'
        ? {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          removeComments: true
          // more options:
          // https://github.com/kangax/html-minifier#options-quick-reference
        }
        : false
      ,
      showErrors: process.env.NODE_ENV === 'development'
    }),
    new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
    })

  ]
}