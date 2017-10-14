module.exports = {
  context: __dirname,
  entry: ["./src/index"],
  output: {
    path: __dirname + "/bundle",
    filename: "[name].browser-bundle.js",
    libraryTarget: "var",
    library: "tokenizer",
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
