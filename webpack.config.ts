const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './client/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: './index.html',
      favicon: "./client/favicon.ico"
    }),
    new CopyPlugin({
      patterns: [{ from: './client/style.css' }],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
      publicPath: '/',
    },
    proxy: {
      '/api': 'http://localhost:3000',
      secure: false
    },
    compress: false,
    host: 'localhost',
    port: 8080,
    hot: true,
    historyApiFallback:true,
  }
}