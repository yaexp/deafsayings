import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import './ds-quote-text.scss';

const DsQuoteText = ({
  quoteText,
  quoteSize,
  ...props
}) => {
  const className = classNames({
    'ds-quote-text': true,
  });

  props = {
    className,
    style: {
      fontSize: `${quoteSize}px`,
    },
    ...props,
  };

  return (
    <div {...props}>
      <span>{ quoteText }</span>
    </div>
  );
};

DsQuoteText.propTypes = {
  quoteText: PropTypes.string.isRequired,
  quoteSize: PropTypes.number.isRequired,
};

export default DsQuoteText;
