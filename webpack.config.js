const webpack = require('webpack')
const path = require('path')
const fileSystem = require('fs-extra')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const env = require('./utils/env')

// load the secrets
const alias = {
	'react-dom': '@hot-loader/react-dom',
}

const secretsPath = path.join(__dirname, `secrets.${env.NODE_ENV}.js`)

const fileExtensions = [
	'jpg',
	'jpeg',
	'png',
	'gif',
	'eot',
	'otf',
	'svg',
	'ttf',
	'woff',
	'woff2',
]

if (fileSystem.existsSync(secretsPath)) {
	alias.secrets = secretsPath
}

const options = {
	mode: process.env.NODE_ENV || 'development',
	entry: {
		newtab: path.join(__dirname, 'src', 'pages', 'Newtab', 'index.jsx'),
		options: path.join(__dirname, 'src', 'pages', 'Options', 'index.jsx'),
		popup: path.join(__dirname, 'src', 'pages', 'Popup', 'index.jsx'),
		background: path.join(__dirname, 'src', 'pages', 'Background', 'index.js'),
		contentScript: path.join(__dirname, 'src', 'pages', 'Content', 'index.js'),
	},
	chromeExtensionBoilerplate: {
		notHotReload: ['contentScript'],
	},
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			// {
			//   test: /\.css$/,
			//   loader: 'style-loader!css-loader',
			//   exclude: /node_modules/,
			// },
			// {
			//   test: /\.scss$/,
			//   loader: 'sass-loader',
			//   exclude: /node_modules/,
			// },
			{
				// look for .css or .scss files
				test: /\.(css|scss)$/,
				// in the `src` directory
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: new RegExp(`.(${fileExtensions.join('|')})$`),
				loader: 'file-loader?name=[name].[ext]',
				exclude: /node_modules/,
			},
			{
				test: /\.html$/,
				loader: 'html-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		alias: {
			// add as many aliases as you like!
			Api: path.resolve(__dirname, './src/api'),
			Assets: path.resolve(__dirname, './src/assets'),
			Utils: path.resolve(__dirname, './src/utils'),
		},
		extensions: fileExtensions
			.map((extension) => `.${extension}`)
			.concat(['.jsx', '.js', '.css']),
	},
	plugins: [
		new webpack.ProgressPlugin(),
		// clean the build folder
		new CleanWebpackPlugin({
			verbose: true,
			cleanStaleWebpackAssets: false,
		}),
		// expose and write the allowed env vars on the compiled bundle
		new webpack.EnvironmentPlugin(['NODE_ENV']),
		new CopyWebpackPlugin(
			[
				{
					from: 'src/manifest.json',
					to: path.join(__dirname, 'build'),
					force: true,
					transform(content, path) {
						// generates the manifest file using the package.json informations
						return Buffer.from(
							JSON.stringify({
								description: process.env.npm_package_description,
								version: process.env.npm_package_version,
								...JSON.parse(content.toString()),
							})
						)
					},
				},
			],
			{
				logLevel: 'info',
				copyUnmodified: true,
			}
		),
		new CopyWebpackPlugin(
			[
				{
					from: 'src/pages/Content/content.styles.css',
					to: path.join(__dirname, 'build'),
					force: true,
				},
			],
			{
				logLevel: 'info',
				copyUnmodified: true,
			}
		),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'pages', 'Newtab', 'index.html'),
			filename: 'newtab.html',
			chunks: ['newtab'],
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'pages', 'Options', 'index.html'),
			filename: 'options.html',
			chunks: ['options'],
		}),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'pages', 'Popup', 'index.html'),
			filename: 'popup.html',
			chunks: ['popup'],
		}),
		new HtmlWebpackPlugin({
			template: path.join(
				__dirname,
				'src',
				'pages',
				'Background',
				'index.html'
			),
			filename: 'background.html',
			chunks: ['background'],
		}),
		new WriteFilePlugin(),
	],
}

if (env.NODE_ENV === 'development') {
	options.devtool = 'cheap-module-eval-source-map'
}

module.exports = options
