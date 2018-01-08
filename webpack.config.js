const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');


const config = {
  entry: "./src/index.js",
  output: {
    filename: "./bundle.js",  		
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: "cheap-module-source-map",
  module: {
    rules: [	
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: { importLoaders: 1 }
            }
          ]
        })
      },
      {
        test: /js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: { presets: ["react-app"] }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].css"
    })
	],
  resolve: {
    modules: ['src', 'node_modules'],
  },
};

module.exports = config;