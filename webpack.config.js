const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path');

module.exports = {
	mode: 'production',
	entry: ['./src/pure-file-drop.js', './src/pure-file-drop.scss'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'pure-file-drop.min.js'
	},
	optimization: {
		minimizer: [
		new OptimizeCSSAssetsPlugin({}),
		new UglifyJsPlugin()
		]
	},
	module: {
		rules: [
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: {
				loader: "babel-loader"
			}
		},
		{
			test: /\.scss$/,
			use: [
			{
				loader: MiniCssExtractPlugin.loader
			},
			{
				loader: "css-loader"
			},
			{
				loader: "sass-loader"
			}
			]
		}
		]
	},
	plugins: [
    new MiniCssExtractPlugin({ // define where to save the file
    	filename: 'pure-file-drop.min.css',
      // allChunks: true,
  }),
    ],
};