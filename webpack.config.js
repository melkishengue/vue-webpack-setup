'use strict'

const { resolve, join } = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  mode: 'development',
  entry: [
    './src/main.js'
  ],
  output: {
    filename: "[name].bundle.js",
    path: resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'js': 'babel-loader'
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      // {
      //   test: /\.css$/,
      //   use: [ 'vue-style-loader', 'css-loader' ]
      // },
      {
          test: /\.scss$/,
          use: [
              "vue-style-loader", // creates style nodes from JS strings
              "css-loader", // translates CSS into CommonJS
              "sass-loader" // compiles Sass to CSS
          ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: join(__dirname, 'src/assets/index.html')
    })
  ],
  resolve: {
    alias: {
      Components: __dirname + '/src/components/',
      Models: __dirname + '/src/models/',
      Services: __dirname + '/src/services/',
      Src: __dirname + '/src/',
      Assets: __dirname + '/src/assets/'
    }
  },
  devServer: {
    contentBase: join(__dirname, "dist")
  }
}
