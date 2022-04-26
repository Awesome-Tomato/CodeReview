const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {

	output: {
		path: path.resolve(__dirname, '../'),
		filename: 'msw.js',
	},

	// Omit License file
	optimization: {
		minimizer: [new TerserPlugin({
			extractComments: false,
		})]
	}
};