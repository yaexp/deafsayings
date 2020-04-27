import React from 'react';
import classNames from 'classnames';

import './grainy-texture.scss';

const GrainyTexture = (props) => {

  const className = classNames({
    'grainy-texture': true,
  });

  props = {
    className,
    ...props,
  };

  return <div {...props}></div>;
};

export default GrainyTexture;
