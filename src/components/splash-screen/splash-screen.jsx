import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { loadedDelay as LOADED_DELAY } from './splash-screen.variables.json';

import './splash-screen.scss';

const SplashScreen = ({ isLoading, children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const classes = classNames({
    'splash-screen': true,
    '_exiting': !isLoading,
  });

  useEffect(() => {
    if(!isLoading) {
      setTimeout(() => {
        setIsLoaded(true);
      }, LOADED_DELAY);
    }
  });

  return <>
    { !isLoaded && <div className={classes}>Loading...</div> }
    { !isLoading && children }
  </>;
};

SplashScreen.propTypes = {
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};

SplashScreen.defaultProps = {
  isLoading: false,
};

export default SplashScreen;
