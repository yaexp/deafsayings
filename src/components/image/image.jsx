import React, {
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './image.scss';

const Image = ({
  src,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const className = classNames({
    'image': true,
    '_loading': isLoading,
  });

  props = {
    className,
    src,
    onLoad: () => {
      setIsLoading(false);
    },
    ...props,
  };

  useEffect(() => {
    setIsLoading(true);
  }, [src]);

  return <img {...props} />;
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Image;
