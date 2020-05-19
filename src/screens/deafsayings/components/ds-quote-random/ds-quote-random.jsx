import React, {
  useState,
  useEffect,
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

import { Icon } from '~/src/components';

import './ds-quote-random.scss';

const DsQuoteRandom = ({
  quoteId,
  onClick,
  ...props
}) => {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [quoteIds, setQuoteIds] = useState([]);
  const [randomGenerator, setRandomGenerator] = useState({});

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
    title: 'Random quote',
    onClick: (event) => {
      if (onClick) {
        const newQuoteId = getRandomQuoteId();

        onClick(event, getQuote(newQuoteId));
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
        <Icon iconName="renew" />
      </span>
    </button>
  );
};

DsQuoteRandom.propTypes = {
  quoteId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DsQuoteRandom;
