// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const path = require('path')
const config = require('../webpack.config')
const env = require('./env')

const options = config.chromeExtensionBoilerplate || {}
const excludeEntriesToHotReload = options.notHotReload || []

for (const entryName in config.entry) {
	if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
		config.entry[entryName] = [
			`webpack-dev-server/client?http://localhost:${env.PORT}`,
			'webpack/hot/dev-server',
		].concat(config.entry[entryName])
	}
}

config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(
	config.plugins || []
)

delete config.chromeExtensionBoilerplate

const compiler = webpack(config)

const server = new WebpackDevServer(compiler, {
	hot: true,
	contentBase: path.join(__dirname, '../build'),
	// sockPort: env.PORT,
	// port: env.PORT,
	headers: {
		'Access-Control-Allow-Origin': '*',
	},
	disableHostCheck: true,
})

server.listen(env.PORT)
