const HtmlWebPackPlugin = require("html-webpack-plugin");
const { join, resolve } = require('path')

module.exports = {
  mode: 'development',
  output: {
    path: resolve(__dirname, 'client/dist'),
    filename: 'main.js',
    // chunkFilename: '[id].chunk.js'
  },
  devtool: 'eval',
  entry: {
    main: join(__dirname, 'client', 'index.js'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  devServer: {
    inline:true,
    port: 3001
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: resolve(__dirname, 'client', 'index.html'),
      filename: './index.html',
    })
  ]
};