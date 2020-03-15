import chalk from 'chalk';
import webpackMerge from 'webpack-merge';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

import commonConfig from './common.js';

export default (paths, config) => {
  const messages = [];

  if (config.enabled.watcher) {
    let localAddress = null;
    let networkAddress = null;

    if (config.host === '::') {
      localAddress = `http://localhost:${config.port}`;
      networkAddress = `http://${config.ip}:${config.port}`;
    } else {
      localAddress = `http://${config.host}:${config.port}`;
    }

    localAddress && messages.push(`${ chalk.bold('Local:') } ${ localAddress }`);
    networkAddress && messages.push(`${ chalk.bold('Network:') } ${ networkAddress }`);

    config.webpack.resolve.alias = {
      ...config.webpack.resolve.alias,
      'react-dom': '@hot-loader/react-dom',
    };

    config.webpack.devServer = {
      quiet: true,
      hot: true,
      compress: true,
      inline: true,
      stats: config.webpack.stats,
      port: config.port,
      host: config.host,
    };
  }

  return webpackMerge(commonConfig(paths, config), {
    devtool: config.enabled.watcher ? 'inline-source-map' : 'cheap-source-map',
    optimization: {
      ...config.webpack.optimization,
    },
    module: {
      rules: [

        // eslint
        {
          enforce: 'pre',
          test: /\.jsx?$/,
          exclude: /node_modules/,
          include: paths.root.dev,
          use: 'eslint-loader',
        },

      ],
    },
    plugins: [
      ...config.webpack.plugins,
      new FriendlyErrorsWebpackPlugin({
        compilationSuccessInfo: { messages },
      }),
    ],
  });
};
