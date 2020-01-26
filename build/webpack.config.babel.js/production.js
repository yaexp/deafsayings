import chalk from 'chalk';
import webpackMerge from 'webpack-merge';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';
import imageminMozjpeg from 'imagemin-mozjpeg';
import ImageminPlugin from 'imagemin-webpack-plugin';
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import commonConfig from './common.js';

import { assetManifestsFormatter } from './utils';

export default (paths, config) => webpackMerge(commonConfig(paths, config), {
  devtool: undefined,
  optimization: {
    ...config.webpack.optimization,
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin(),
    ],
    nodeEnv: 'production',
    concatenateModules: true,
  },
  plugins: [
    ...config.webpack.plugins,
    new ProgressBarPlugin({
      format: `[${ chalk.blue('webpack-frontend') }] Build :bar ${ chalk.green(':percent') }`,
      complete: '█',
      incomplete: '░',
      clear: true,
    }),
    new WebpackAssetsManifest({
      output: 'manifest.json',
      writeToDisk: true,
      assets: config.manifest,
      replacer: assetManifestsFormatter,
    }),
    new ImageminPlugin({
      optipng: { optimizationLevel: 7 },
      gifsicle: { optimizationLevel: 3 },
      pngquant: { quality: '65-90', speed: 4 },
      svgo: { removeUnknownsAndDefaults: false, cleanupIDs: false },
      plugins: [imageminMozjpeg({ quality: 75 })],
    }),
    new FriendlyErrorsPlugin(),
  ],
});
