import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { Icon } from '~/components';

import './label.scss';

const Label = ({
  children,
  style,
  iconName,
  href,
  ...props
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const component = href ? 'a' : 'button';

  props = {
    className: classNames({
      'label': true,
      [`_style-${style}`]: style,
      ['_icon']: iconName,
    }),
    href,
    target: '_blank',
    onMouseDown() {
      setIsMouseDown(true);
    },
    onMouseUp() {
      setIsMouseDown(false);
    },
    onFocus(event) {
      if (isMouseDown) {
        event.target.blur();
      }
    },
    ...props,
  };

  if (iconName) {
    children = <><Icon iconName={iconName} size="auto"/>{ children }</>;
  }

  return React.createElement(component, { ...props }, children);
};

Label.propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOf(['label']),
  href: PropTypes.string,
  iconName: PropTypes.oneOf(['github']),
};

Label.defaultProps = {
  style: 'label',
};

export default Label;
