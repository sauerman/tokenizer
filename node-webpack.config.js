module.exports = {
  context: __dirname,
  entry: ["./src/index"],
  output: {
    path: __dirname + "/bundle",
    filename: "[name].node-bundle.js",
    libraryTarget: "commonjs2",
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
      },
    ],
  },
};
