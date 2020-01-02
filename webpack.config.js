module.exports = {
  entry: __dirname + '/index.js',
  output: {
    path: __dirname + '/build',
    publicPath: '/build/',
    filename: 'accessibility-test.js',
    library: 'accessibility',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }]
  }
};
