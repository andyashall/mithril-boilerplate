// var HtmlWebpackPlugin = require('html-webpack-plugin')
// var path = require('path')
// // var utils = require('./utils')
// var ExtractTextPlugin = require("extract-text-webpack-plugin")
// var webpack = require('webpack')
// // var config = require('../config')

// module.exports = {
//   entry: {
//     default: path.join(__dirname, 'src/index.js'),
//   },
//   output: {
//     path: path.join(__dirname, '/dist/'),
//     filename: '[name].[hash].js',
//     publicPath: '/'
//   },
//   resolve: {
//     extensions: ['.js', '.json'],
//     modules: [
//       path.resolve(__dirname + "/node_modules/")
//     ]
//   },
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         loader: 'babel-loader',
//         include: path.join(__dirname),
//         exclude: /node_modules/,
//         options: {
//           presets: ['es2015'],
//           "plugins": [
//             ["transform-react-jsx", {
//               "pragma": "m"
//             }]
//           ]
//         }
//       },
//       {
//         test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
//         loader: 'url-loader',
//         options: {
//           limit: 10000,
//           name: path.join(__dirname + 'img/[name].[hash:7].[ext]')
//         }
//       },
//       {
//         test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
//         loader: 'url-loader',
//         options: {
//           limit: 10000,
//           name: path.join(__dirname + 'fonts/[name].[hash:7].[ext]')
//         }
//       },
//       {
//         test: /\.css$/,
//         include: path.join(__dirname),
//         use: ExtractTextPlugin.extract({
//           use: [
//             {
//               loader: "css-loader",
//               options: {
//                 minimize: true,
//                 sourceMap: process.env.NODE_ENV === 'development'
//               }
//             }
//           ]
//         })
//       }
//     ]
//   },
//   plugins: [
//     new ExtractTextPlugin("[name].[contenthash].css"),
//     new HtmlWebpackPlugin({
//       filename: 'index.html',
//       template: 'index.html',
//       inject: true,
//       minify: process.env.NODE_ENV === 'production'
//         ? {
//           collapseBooleanAttributes: true,
//           collapseWhitespace: true,
//           minifyCSS: true,
//           minifyJS: true,
//           removeComments: true
//           // more options:
//           // https://github.com/kangax/html-minifier#options-quick-reference
//         }
//         : false
//       ,
//       showErrors: process.env.NODE_ENV === 'development'
//     }),
//     new webpack.optimize.AggressiveMergingPlugin(), //Merge chunks
//     new webpack.optimize.CommonsChunkPlugin({
//       name: 'vendor',
//       minChunks: function (module) {
//         // this assumes your vendor imports exist in the node_modules directory
//         return module.context && module.context.indexOf('node_modules') !== -1;
//       }
//     }),
//     //CommonChunksPlugin will now extract all the common modules from vendor and main bundles
//     new webpack.optimize.CommonsChunkPlugin({
//       name: 'manifest' //But since there are no more common modules between them we end up with just the runtime code included in the manifest file
//     })

//   ]
// }

const paths = require("./paths");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // Where webpack looks to start building the bundle
  entry: [paths.src + "/index.js"],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: "[name].bundle.js",
    publicPath: "/",
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: paths.src + "/assets",
    //       to: "assets",
    //       globOptions: {
    //         ignore: ["*.DS_Store"],
    //       },
    //     },
    //   ],
    // }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
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
    })
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
      { test: /\.(js|jsx)$/, exclude: /node_modules/, use: ["babel-loader"] },

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },

      // Images: Copy image files to build folder
      // { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },

      // Fonts and SVGs: Inline files
      // { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },
    ],
  },
};