import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { pad } from '~/src/utils';
import { BlockEffect } from '~/src/components';

import './ds-quote-id.scss';

const DsQuoteId = ({
  quoteId,
  quoteCount,
  directType,
  ...props
}) => {
  const className = classNames({
    'ds-quote-id': true,
  });

  props = {
    className,
    ...props,
  };

  return (
    <div {...props}>
      No.
      <span className="ds-quote-id__current">
        <BlockEffect
          effectType={BlockEffect.effectType.TEXT_REVEAL_EFFECT}
          directType={directType}
        >
          { pad(quoteId) }
        </BlockEffect>
      </span>
      <span className="ds-quote-id__count">{ pad(quoteCount) }</span>
    </div>
  );
};

DsQuoteId.propTypes = {
  quoteId: PropTypes.number.isRequired,
  quoteCount: PropTypes.number.isRequired,
  directType: PropTypes.string,
};

export default DsQuoteId;
