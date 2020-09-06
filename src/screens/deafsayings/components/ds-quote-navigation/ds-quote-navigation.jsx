import React, { useState, useRef   } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getQuote } from '~/services/quote.service';

import { Icon, BlockEffect } from '~/components';
import { useWait } from '~/hooks';

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
  const [isMouseDown, setIsMouseDown] = useState(false);
  const buttonRef = useRef();
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
    onClick(event) {
      const isTextRevealerWaiting = isWaiting(BlockEffect.blockElementName);

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
    onKeyDown(event) {
      if (event.which === 13) {
        buttonRef.current.click();
      }
    },
    onMouseDown() {
      setIsMouseDown(true);
    },
    onMouseUp() {
      setIsMouseDown(false);
    },
    onFocus(event) {
      if (isMouseDown) {
        event.target.blur();
      }
    },
    ...props,
  };

  return (
    <div {...props} tabIndex="0" role="button" ref={buttonRef}>
      <span>
        { iconName && <Icon iconName={iconName} /> }
      </span>
    </div>
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
