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
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({ patterns: [{ from: 'src/assets/', to: 'assets/' }] }),
    new CopyWebpackPlugin({ patterns: [{ from: 'src/index.html', to: 'index.html' }] })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
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
