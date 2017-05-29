const webpack = require('webpack');
const path = require('path');

module.exports = {
  cache: true,
  entry: {
    app: [
      path.join(__dirname, 'src/index.js'),
    ],
  },
  devtool: 'source-map',
  externals: [
    'react-redux',
    'prop-types',
    'react-router-dom',
    'redux-thunk',
    'react',
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules',
      'src',
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
  output: {
    library: 'horseman',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'horseman.js',
  },
};
