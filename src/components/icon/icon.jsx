import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './icon.scss';

const Icon = ({ children, iconName, ...props }) => {
  const iconComponent = require(`./icons/${iconName}.icon`).default;

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
  iconName: PropTypes.string,
};

Icon.statics = {
  GITHUB: 'github',
  ARROW_UP: 'arrow-up',
  ARROW_DOWN: 'arrow-down',
};

export default Icon;
