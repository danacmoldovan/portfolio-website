const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line import/no-extraneous-dependencies
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: { index: './src/js/index.js', showcase: './src/js/showcase.js' },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Dana Moldovan',
      favicon: './src/favicon.ico',
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      title: 'Dana Moldovan - Showcases - Monitoring Dashboards',
      template: './src/showcase-monitoring-dashboards.html',
      filename: 'showcases-monitoring-dashboards.html',
      chunks: ['showcase'],
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
