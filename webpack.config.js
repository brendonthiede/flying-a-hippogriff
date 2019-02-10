const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pathToPhaser = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(pathToPhaser, 'dist/phaser.js');

module.exports = {
  entry: {
    bundle: './src/game.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: '/node_modules/'
      },
      {
        test: /phaser\.js$/,
        loader: 'expose-loader?Phaser'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'src/assets/', to: 'assets/' }]),
    new CopyWebpackPlugin([{ from: 'src/index.html', to: 'index.html' }])
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist/'),
    publicPath: '/dist/',
    host: 'localhost',
    port: 8975,
    open: true
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      phaser: phaser
    }
  }
};
