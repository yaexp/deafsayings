import React, {
  useState,
  useEffect,
} from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import './image.scss';

const useImageChange = ({ src }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, [src]);

  return {
    isLoading,
    handleLoad() {
      setIsLoading(false);
    },
  };
};

const Image = ({ src, ...props }) => {
  const { isLoading, handleLoad } = useImageChange({ src, ...props });

  props = {
    className: classNames({
      'image': true,
      '_loading': isLoading,
    }),
    ...props,
  };

  const imgProps = {
    src,
    onLoad: handleLoad,
  };

  return (
    <div {...props} style={{ backgroundImage: `url(${src})` }}>
      <img {...imgProps}/>
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Image;
