const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
  entry: { index: './src/index.js' },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dana Moldovan',
      favicon: './src/favicon.ico',
      template: './src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/images', to: 'images' },
      ],
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
