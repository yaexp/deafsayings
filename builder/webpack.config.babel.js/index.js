require('@babel/register');

import { paths, config } from '../config';

// Build Config
export default () => {
  return require(`./${config.env}.js`).default(paths, config);
};
