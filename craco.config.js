const CracoLessPlugin = require('craco-less')

module.exports = {
	babel: {
		// 用来支持装饰器
		plugins: [["@babel/plugin-proposal-decorators", { legacy: true }]]
	},
	plugins: [
		{
			plugin: CracoLessPlugin,
			options: {
				lessLoaderOptions: {
					lessOptions: { javascriptEnabled: true }
				},
				modifyLessRule: () => {
					return {
						test: /\.less$/,
						exclude: /node_modules/,
						use: [
							{ loader: 'style-loader' },
							{
								loader: 'css-loader',
								options: {
									modules: {
										localIdentName: '[local]_[hash:base64:6]'
									}
								}
							},
							{ loader: 'less-loader' }
						]
					}
				}
			}
		}
	]
}