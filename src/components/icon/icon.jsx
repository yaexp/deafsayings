import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './icon.scss';

const Icon = ({
  children,
  iconName,
  size,
  ...props
}) => {
  const iconComponent = require(`./icons/${iconName}.icon`).default;

  props = {
    className: classNames({
      'icon': true,
      [`_size-${size}`]: !!size,
    }),
    ...props,
  };

  return React.createElement(iconComponent, { ...props }, children);
};

Icon.propTypes = {
  children: PropTypes.node,
  iconName: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['32', 'auto']),
};

Icon.statics = {
  GITHUB: 'github',
  ARROW_UP: 'arrow-up',
  ARROW_DOWN: 'arrow-down',
  CONTRAST: 'contrast',
  RENEW: 'renew',
  WARNING: 'warning',
};

Icon.defaultProps = {
  size: '32',
};

export default Icon;
