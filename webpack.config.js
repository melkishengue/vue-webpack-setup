'use strict'

const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  context: __dirname,
  mode: 'development',
  entry: [
    './src/main.js'
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
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
      {
        test: /\.css$/,
        use: [ 'vue-style-loader', 'css-loader' ]
      },
    //   {
    //   test: /\.js$/,
    //   exclude: /(node_modules|bower_components)/,
    //   use: {
    //     loader: 'babel-loader',
    //     options: {
    //       presets: ['@babel/preset-env']
    //     }
    //   }
    // }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  resolve: {
    alias: {
      Components: __dirname + '/src/components/',
      Models: __dirname + '/src/models/',
      Services: __dirname + '/src/services/',
      Src: __dirname + '/src/'
    }
  }
}
