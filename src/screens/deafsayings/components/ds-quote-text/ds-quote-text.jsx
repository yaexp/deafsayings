import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import { BlockEffect } from '~/src/components';

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
      <BlockEffect
        effectType={BlockEffect.effectType.TEXT_REVEAL_EFFECT}
        directType={directType}
        onEntered={() => setNextQuoteSize(quoteSize)}
      >
        {quoteText}
      </BlockEffect>
    </div>
  );
};

DsQuoteText.propTypes = {
  quoteText: PropTypes.string.isRequired,
  quoteSize: PropTypes.number.isRequired,
  directType: PropTypes.string,
};

export default DsQuoteText;
