import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { pad } from '~/src/utils';
import { TextRevealer } from '~/src/components';

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
        <TextRevealer text={ pad(quoteId) } directType={directType} />
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
