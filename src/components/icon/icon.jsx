import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './icon.scss';

const Icon = ({ children, iconName, ...props }) => {
  const iconComponent = require(`./svg/icon-${iconName}`).default;

  props = {
    className: classNames({
      'icon': true,
    }),
    ...props,
  };

  return React.createElement(iconComponent, { ...props }, children);
};

Icon.propTypes = {
  children: PropTypes.node,
  iconName: PropTypes.oneOf(['github']),
};

export default Icon;
