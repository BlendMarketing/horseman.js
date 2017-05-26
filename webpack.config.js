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
  externals: {
    'react-redux': 'react-redux',
    PropTypes: 'prop-types',
    Redirect: 'react-router-dom',
    thunk: 'redux-thunk',
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
  },
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
    library: 'horseman.js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
};
