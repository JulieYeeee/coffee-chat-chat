const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "public"),
      filename: "main.bundle.[hash].js",
    },
    devServer: {
        static: {
          directory: path.join(__dirname, "public"),
        },
        port: 5000,
        historyApiFallback: true,
      },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./static/base.html",      
        }),
        new MiniCssExtractPlugin({
            filename: "style.[hash].css",
        })
    ],
    module:{
		rules:[
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader,"css-loader"]
			},
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
              presets: ['@babel/preset-env']
          }
        } 
      },
      {
        test: /\.(jpe?g|png|gif|svg|mp4)$/,
        type: 'asset/resource',
        // generator: {
        //   filename: 'images/[name][ext]'
        // }
        //     loader: 'file-loader',
        // options: {
        //   outputPath: '/',
        // },
      //  options:{
      //     context: path.resolve(__dirname, "static/"),
      //     outputPath: 'public/',
      //     publicPath: '../',

      //   } 
    
        // use: ['file-loader'],
        // options:{
        //   context: path.resolve(__dirname, "static/"),
        //   outputPath: 'public/',
        //   publicPath: '../',

        // }        
        // options: {
        //   name: '[name].[ext]',
        //   outputPath: 'assets/',
        //   publicPath: 'images/'
        // }

      } 
		],
	},
  };
  
