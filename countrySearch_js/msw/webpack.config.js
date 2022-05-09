const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
  output: {
    path: path.resolve(__dirname, '../'),
    filename: 'msw.js',
  },

  // Omit License file
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },

  // https://webpack.js.org/configuration/devtool/#devtool
  // eval-source-map : 소스맵을 번들 파일에 eval 로 포함시킨다
  devtool: 'eval-source-map',
};
