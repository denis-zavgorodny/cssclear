const path = require('path');
const fs = require('fs');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const plugins = [];
const builtToPath = process.env.NODE_ENV === 'production' ? path.resolve(__dirname, 'www-build') : path.resolve(__dirname, 'www-test');

if (process.env.NODE_ENV === 'production') {
  plugins.push(new BundleAnalyzerPlugin());
  fs.readdirSync(path.resolve(builtToPath)).map((file) => {
    fs.unlinkSync(path.resolve(`${builtToPath}/${file}`));
  });
}


module.exports = {
  entry: ['./web-client/index.js'],
  target: 'web',
  output: {
    path: builtToPath,
    filename: 'csscleaner.bundle.js',
    library: 'csscleaner',
    auxiliaryComment: 'Test Comment',
    chunkFilename: 'csscleaner.module-[id]-[chunkhash].js',
  },
  plugins,
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: /(web-client)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0'],
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'www-test'),
    host: 'localhost',
    port: 8080,
    inline: true,
  },
};
