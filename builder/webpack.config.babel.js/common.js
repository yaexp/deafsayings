import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import webpackMerge from 'webpack-merge';

import jsonImporter from 'node-sass-json-importer';
import globImporter from 'node-sass-glob-importer';

export default (paths, config) => {
  const assetsFilenames = (config.enabled.cacheBusting) ? config.cacheBusting : '[name]';

  return webpackMerge({
    context: paths.root.dev,
    output: {
      path: paths.root.prod,
      publicPath: paths.publicUrl,
      filename: `${paths.scriptsFolder}/${assetsFilenames}.js`,
    },
    module: {
      rules: [

        // javascript
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/,
          include: paths.root.dev,
          use: [
            { loader: 'cache-loader' },
            { loader: 'babel-loader' },
          ],
        },

        // styles
        {
          test: /\.scss$/i,
          exclude: /node_modules/,
          include: paths.root.dev,
          use: [
            { loader: MiniCssExtractPlugin.loader, options: { hmr: config.enabled.watcher } },
            { loader: 'cache-loader' },
            { loader: 'css-loader', options: { sourceMap: config.enabled.sourceMaps } },
            { loader: 'postcss-loader', options: { config: { path: __dirname, ctx: config } } },
            { loader: 'sass-loader', options: { sassOptions: { importer: [jsonImporter(), globImporter()] } }},
          ],
        },

        // images
        {
          test: /\.(png|jpe?g|gif)$/i,
          exclude: /node_modules/,
          include: [paths.root.assets, paths.root.dev],
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: paths.imagesFolder,
                publicPath: `../${paths.imagesFolder}`,
              },
            },
          ],
        },

        // fonts
        {
          test: /\.(woff2?)$/i,
          exclude: /node_modules/,
          include: [paths.root.assets, paths.root.dev],
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: paths.fontsFolder,
                publicPath: `../${paths.fontsFolder}`,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [paths.root.prod],
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: `${paths.assets.fonts}/**/*`,
            to: `${paths.fontsFolder}/[name].[ext]`,
          },
          {
            from: `${paths.assets.images}/**/*`,
            to: `${paths.imagesFolder}/[name].[ext]`,
            globOptions: {
              ignore: ['**/*.svg'],
            },
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: `${paths.stylesFolder}/${assetsFilenames}.css`,
      }),
      new HtmlWebpackPlugin({
        template: `../${paths.assetsFolder}/index.html`,
        minify: config.enabled.optimize ? {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
        } : false,
      }),
      new FaviconsWebpackPlugin({
        logo: `../${paths.assetsFolder}/favicon.png`,
        prefix: 'favicons',
        cache: false,
        inject: true,
        favicons: {
          icons: {
            favicons: true,

            android: false,
            appleIcon: false,
            appleStartup: false,
            firefox: false,
            windows: false,
            yandex: false,
            coast: false,
          },
        },
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: config.env,
        PUBLIC_URL: paths.publicUrl,
      }),
    ],
  }, config.webpack);
};
