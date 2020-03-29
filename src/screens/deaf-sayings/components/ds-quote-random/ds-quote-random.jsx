import React, {
  useState,
  useEffect,
} from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  shuffle,
} from '~src/utils';

import {
  getQuote,
  getQuoteIds,
} from '~src/services/quote.service';

import { Icon } from '~src/components';

import './ds-quote-random.scss';

let quoteIds;
let randomGen;

const DsQuoteRandom = ({
  quoteId,
  onClick,
  ...props
}) => {
  const className = classNames({
    'ds-quote-random': true,
  });

  function getRandomQuoteId() {
    let _randomGen;

    do {
      _randomGen = randomGen.next();

      // restart?
      if (_randomGen.done) {
        randomGen = shuffle(quoteIds);
        _randomGen = randomGen.next();
      }

    // skip if duplicate
    } while (quoteId === _randomGen.value);

    return _randomGen.value;
  }

  useEffect(() => {
    quoteIds = getQuoteIds();
    randomGen = shuffle(quoteIds);
  }, []);

  props = {
    className,
    title: 'Random quote',
    onClick: (event) => {
      if (onClick) {
        const newQuoteId = getRandomQuoteId();

        onClick(event, getQuote(newQuoteId));
      }
    },
    ...props,
  };

  return (
    <div {...props}>
      <Icon iconName="renew" />
    </div>
  );
};

DsQuoteRandom.propTypes = {
  quoteId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default DsQuoteRandom;
