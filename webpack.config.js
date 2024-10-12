const path = require('path');
const webpack = require('webpack');

module.exports = env => {
  let config = {};

  // configure input and output based on env arguments
  const entry = env.outputFilename.substring(0, env.outputFilename.length - 3); // remove .js extension

  config.entry = {};
  config.entry[entry] = path.resolve(__dirname, env.entryFile);

  config.output = {
    filename: '[name].js',
    path: path.resolve(__dirname, env.outputDir)
  };

  // default configuration for react+babel+external source maps
  config = {
    ...config,

    resolve: {
      extensions: ['.js', '.jsx']
    },

    module: {
      rules: [{
        test: /\.(?:jsx)$/,
        exclude: /node_modules/, // Exclude libraries in node_modules ...
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react']
            ]
          }
        }
      }]
    },

    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          }
        }
      }
    },
    
    mode: 'development',
    devtool: false,
    plugins: [new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
      exclude: ['vendor.js']
    })]
  };

  return config;
};