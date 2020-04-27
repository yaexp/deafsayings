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
      publicPath: config.webpack.publicPath || '/',
      filename: `scripts/${assetsFilenames}.js`,
    },
    module: {
      rules: [

        // javascript
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          include: paths.root.dev,
          use: [
            { loader: 'cache-loader' },
            { loader: 'babel-loader' },
          ],
        },

        // styles
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          include: paths.root.dev,
          use: [
            { loader: MiniCssExtractPlugin.loader, options: { hmr: config.enabled.watcher } },
            { loader: 'cache-loader' },
            { loader: 'css-loader', options: { url: false, sourceMap: config.enabled.sourceMaps } },
            { loader: 'postcss-loader', options: { config: { path: __dirname, ctx: config } } },
            { loader: 'sass-loader', options: { sassOptions: { importer: [jsonImporter(), globImporter()] } }},
          ],
        },

        // fonts
        {
          test: /\.(woff2?)$/,
          exclude: /node_modules/,
          include: paths.root.dev,
          use: [{
            loader: 'file-loader',
            options: {
              regExp: new RegExp(`${paths.assetsFolder}[/]([a-z0-9-]+[/]).*$`, 'i'),
              name: '[1][name].[ext]',
              publicPath: (url) => `../${url}`,
            },
          }],
        },

        // images
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/,
          exclude: /node_modules/,
          include: paths.root.dev,
          use: [{
            loader: 'file-loader',
            options: {
              regExp: new RegExp(`${paths.assetsFolder}[/]([a-z0-9-]+[/]).*$`, 'i'),
              name: '[1][name].[ext]',
              publicPath: (url) => `../${url}`,
            },
          }],
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [paths.root.prod],
      }),
      new CopyWebpackPlugin([{
        // :TODO: ~config paths.public.image
        from: `${paths.assetsFolder}/images/**/*`,
        to: '[1][name].[ext]',
        test: new RegExp(`${paths.assetsFolder}[/]([a-z0-9-]+[/]).*$`, 'i'),
        ignore: ['*.svg'],
      }]),
      new MiniCssExtractPlugin({
        filename: `styles/${assetsFilenames}.css`,
      }),
      new HtmlWebpackPlugin({
        template: 'index.html',
        minify: config.enabled.optimize ? {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
        } : false,
      }),
      new FaviconsWebpackPlugin({
        logo: './favicon.png',
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
    ],
  }, config.webpack);
};
