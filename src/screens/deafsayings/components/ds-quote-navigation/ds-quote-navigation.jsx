import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getQuote } from '~/src/services/quote.service';

import { Icon } from '~/src/components';
import { useWait } from '~/src/hooks';

import './ds-quote-navigation.scss';

const DIRECT_NEXT = 'next';
const DIRECT_PREV = 'prev';

const DsQuoteNavigation = ({
    directType,
    quoteId,
    quoteCount,
    onClick,
    ...props
  }) => {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const { isWaiting } = useWait();

  const iconName = isDirectType() ? Icon.statics.ARROW_DOWN : Icon.statics.ARROW_UP;

  const className = classNames({
    'ds-quote-navigation': true,
    '_prev': !isDirectType(),
    '_next': isDirectType(),
  });

  function isDirectType() {
    return directType === DsQuoteNavigation.statics.DIRECT_NEXT;
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
    onClick: (event) => {
      const isTextRevealerWaiting = isWaiting('text-revealer');

      if (!isTextRevealerWaiting && onClick) {
        let newQuoteId;

        if (directType === DsQuoteNavigation.statics.DIRECT_NEXT) {
          newQuoteId = getNextQuoteId();
        } else {
          newQuoteId = getPrevQuoteId();
        }

        onClick(event, { data: getQuote(newQuoteId), directType });
      }
    },
    onMouseEnter() {
      setIsMouseEnter(true);
    },
    onMouseLeave() {
      setIsMouseEnter(false);
    },
    onFocus(event) {
      if (isMouseEnter) {
        event.target.blur();
      }
    },
    ...props,
  };

  return (
    <button {...props}>
      <span>
        { iconName && <Icon iconName={iconName} /> }
      </span>
    </button>
  );
};

DsQuoteNavigation.propTypes = {
  directType: PropTypes.oneOf([DIRECT_NEXT, DIRECT_PREV]).isRequired,
  quoteId: PropTypes.number.isRequired,
  quoteCount: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

DsQuoteNavigation.statics = {
  DIRECT_NEXT,
  DIRECT_PREV,
};

export default DsQuoteNavigation;
