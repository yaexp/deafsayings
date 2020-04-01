import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  Icon,
  Logo,
} from '~src/components';

import './warning-screen.scss';

const WarningScreen = ({
  text,
  isWarning,
  ...props
}) => {
  const className = classNames({
    'warning-screen': true,
  });

  props = {
    className,
    ...props,
  };

  return isWarning ? (
    <div {...props}>
      <div className="warning-screen__icon">
        <Icon iconName="warning"/>
      </div>
      <div className="warning-screen__text">
        <span>{ text }</span>
      </div>
      <div className="warning-screen__logo">
        <Logo />
      </div>
    </div>
  ): null;
};

WarningScreen.propTypes = {
  text: PropTypes.string.isRequired,
  isWarning: PropTypes.bool,
};

WarningScreen.defaultProps = {
  isWarning: true,
};

export default WarningScreen;
