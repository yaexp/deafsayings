import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getQuote } from '~src/services/quote.service';

import { Icon } from '~src/components';

import './ds-quote-navigation.scss';

const TYPE_NEXT = 'next';
const TYPE_PREV = 'prev';

const DsQuoteNavigation = ({
    type,
    quoteId,
    quoteCount,
    onClick,
    ...props
  }) => {
  const iconName = isTypeNext() ? Icon.statics.ARROW_DOWN : Icon.statics.ARROW_UP;
  const title = isTypeNext() ? 'Next quote' : 'Previous quote';

  const className = classNames({
    'ds-quote-navigation': true,
    '_prev': !isTypeNext(),
    '_next': isTypeNext(),
  });

  function isTypeNext() {
    return type === DsQuoteNavigation.statics.TYPE_NEXT;
  }

  function getNextQuoteId() {
    const nextQuoteId = quoteId + 1;
    return !(nextQuoteId >= quoteCount + 1) ? nextQuoteId : 1;
  }

  function getPrevQuoteId() {
    const prevQuoteId = quoteId - 1;
    return !(prevQuoteId <= 0) ? prevQuoteId : quoteCount;
  }

  props = {
    className,
    title,
    onClick: (event) => {
      if (onClick) {
        let newQuoteId;

        if (type === DsQuoteNavigation.statics.TYPE_NEXT) {
          newQuoteId = getNextQuoteId();
        } else {
          newQuoteId = getPrevQuoteId();
        }

        onClick(event, getQuote(newQuoteId));
      }
    },
    ...props,
  };

  return (
    <div {...props}>
      { iconName && <Icon iconName={iconName} /> }
    </div>
  );
};

DsQuoteNavigation.propTypes = {
  type: PropTypes.oneOf([TYPE_NEXT, TYPE_PREV]).isRequired,
  quoteId: PropTypes.number.isRequired,
  quoteCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

DsQuoteNavigation.statics = {
  TYPE_NEXT,
  TYPE_PREV,
};

export default DsQuoteNavigation;
