const webpack = require('webpack');

module.exports = {
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
    library: 'Horseman',
    libraryTarget: 'umd',
  },
};
