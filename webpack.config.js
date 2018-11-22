const webpack = require("webpack");
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

const isDEV = process.env.NODE_ENV === 'development';
const config = {
  mode: "development",
  entry: {
    app: [path.join(__dirname, "src/index.js")]
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: '[name].[hash]js',
    chunkFilename: '[name].[hash].js',
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: path.join(__dirname, 'node_modules'),
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
            }
          }]
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'node_modules'),
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: false
            },
          },
        ]
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader:'babel-loader'
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, "./src/template.html")
    }),
    new webpack.HotModuleReplacementPlugin()
  ],

};

if (isDEV) {
  config.entry = {
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, './src/index.js')
    ]
  },
    config.devServer = {
      hot: true,
      port: 8000,
      host: '0.0.0.0',
      contentBase: path.join(__dirname, ""),
      proxy: {
        '/v1': {
          target: 'http://file.mengant.cn/api',
          changeOrigin: true
        }
      }
    }
}

module.exports = config;