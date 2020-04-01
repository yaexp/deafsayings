import path from 'path';
import os from 'os';
import { argv } from 'yargs';
import { merge } from 'lodash';

const userConfig = require('~/user.config.json');

// network address
const interfaces = os.networkInterfaces();
const getNetworkAddress = () => {
  for (const name of Object.keys(interfaces)) {
    for (const interfaceInfo of interfaces[name]) {
      const {address, family, internal} = interfaceInfo;
      if (family === 'IPv4' && !internal) {
        return address;
      }
    }
  }
};


// -env.production, -p
const isProduction = !!((argv.env && argv.env.production) || argv.p);


//
// Paths

const defaultPaths = {};
defaultPaths.rootPath = process.cwd();
defaultPaths.devFolder = 'src';
defaultPaths.prodFolder = 'dist';
defaultPaths.assetsFolder = 'assets';
defaultPaths.root = {
  dev: path.join(defaultPaths.rootPath, defaultPaths.devFolder),
  prod: path.join(defaultPaths.rootPath, defaultPaths.prodFolder),
};

export const paths = merge(defaultPaths, userConfig.paths);


//
// Default config

const defaultConfig = {};
defaultConfig.open = true;
defaultConfig.port = process.env.PORT || (isProduction ? 5000 : 4000);
defaultConfig.host = process.env.HOST || '::';
defaultConfig.ip = process.env.IP || getNetworkAddress();
defaultConfig.cacheBusting = '[name]_[hash]';
defaultConfig.manifest = {};
defaultConfig.watch = [];
defaultConfig.target = process.env.npm_lifecycle_event;
defaultConfig.env = isProduction ? 'production' : 'development';

// config.enabled
defaultConfig.enabled = {
  cacheBusting: defaultConfig.env === 'production',
  sourceMaps: defaultConfig.env === 'development',
  optimize: defaultConfig.env === 'production',
  extract: defaultConfig.env === 'development',
  watcher: defaultConfig.target === 'start',
};

// config.webpack
defaultConfig.webpack = {
  mode: defaultConfig.env,
  resolve: {
    alias: {
      'styles': path.join(paths.root.dev, paths.assetsFolder, 'styles'),
    },
  },
  stats: {
    errors: true,

    hash: false,
    children: false,
    errorDetails: false,
    warnings: false,
    chunks: false,
    modules: false,
    reasons: false,
    source: false,
    publicPath: false,
    version: false,
    timings: false,
    colors: false,
  },
  optimization: {

    // CommonsChunkPlugin
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          priority: 10,
          enforce: true,
        },
      },
    },

    // NoEmitOnErrorsPlugin
    noEmitOnErrors: true,

  },
  plugins: [],
};

export const config = merge(defaultConfig, userConfig.config);

if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = config.env;
}
