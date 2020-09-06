import React, {
  useState,
  useEffect,
  useReducer,
} from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import './image.scss';

const useImageChange = ({ src }) => {
  const [prevSrc, dispatch] = useReducer((prevSrc, currentSrc) => currentSrc, null, () => src);
  const [isLoading, setIsLoading] = useState(false);
  const [imageMessage, setImageMessage] = useState(null);

  useEffect(() => {
    if(src !== prevSrc) {
      setIsLoading(true);
    }
  }, [src]);

  return {
    isLoading,
    imageMessage,
    handleLoad() {
      setIsLoading(false);
      setImageMessage(null);
      dispatch(src);
    },
    handleError() {
      setIsLoading(false);
      setImageMessage('Image not loaded');
    },
  };
};

const Image = ({ src, ...props }) => {
  const {
    isLoading,
    imageMessage,
    handleLoad,
    handleError,
  } = useImageChange({ src, ...props });

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
    onError: handleError,
  };

  return (
    <div {...props}>
      { imageMessage && <span className="image__message">{ imageMessage }</span> }
      <div className="image__img" style={{ backgroundImage: `url(${src})` }}>
        <img {...imgProps}/>
      </div>
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
};

export default Image;
