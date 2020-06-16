import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import { TextRevealer } from '~/src/components';

import './ds-quote-text.scss';

const DsQuoteText = ({
  quoteText,
  quoteSize,
  directType,
  ...props
}) => {
  const className = classNames({
    'ds-quote-text': true,
  });

  const [nextQuoteSize, setNextQuoteSize] = useState();

  props = {
    className,
    style: {
      fontSize: `${nextQuoteSize}px`,
    },
    ...props,
  };

  useEffect(() => {
    setNextQuoteSize(quoteSize);
  }, []);

  return (
    <div {...props}>
      <TextRevealer
        text={quoteText}
        directType={directType}
        onNextChange={() => setNextQuoteSize(quoteSize)}
      />
    </div>
  );
};

DsQuoteText.propTypes = {
  quoteText: PropTypes.string.isRequired,
  quoteSize: PropTypes.number.isRequired,
  directType: PropTypes.string,
};

export default DsQuoteText;
