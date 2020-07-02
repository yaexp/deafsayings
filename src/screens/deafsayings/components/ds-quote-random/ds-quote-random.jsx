import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  shuffle,
} from '~/src/utils';

import {
  getQuote,
  getQuoteIds,
} from '~/src/services/quote.service';

import { Icon, BlockEffect } from '~/src/components';
import { useWait } from '~/src/hooks';

import './ds-quote-random.scss';

const DsQuoteRandom = ({
  quoteId,
  onClick,
  ...props
}) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [quoteIds, setQuoteIds] = useState([]);
  const [randomGenerator, setRandomGenerator] = useState({});
  const buttonRef = useRef();
  const { isWaiting } = useWait();

  const className = classNames({
    'ds-quote-random': true,
  });

  function getRandomQuoteId() {
    let next;

    do {
      next = randomGenerator.next();

      // renew?
      if (next.done) {
        const randomGen = shuffle(quoteIds);
        next = randomGen.next();

        setRandomGenerator(randomGen);
      }

    // skip if duplicate
    } while (quoteId === next.value);

    return next.value;
  }

  useEffect(() => {
    setQuoteIds(getQuoteIds());
  }, []);

  useEffect(() => {
    setRandomGenerator(shuffle(quoteIds));
  }, [quoteIds]);

  props = {
    className,
    onClick: (event) => {
      const isTextRevealerWaiting = isWaiting(BlockEffect.blockElementName);

      if (!isTextRevealerWaiting && onClick) {
        const newQuoteId = getRandomQuoteId();
        onClick(event, { data: getQuote(newQuoteId) });
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
        <Icon iconName="renew" />
      </span>
    </div>
  );
};

DsQuoteRandom.propTypes = {
  quoteId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DsQuoteRandom;
