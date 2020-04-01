import React, {
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import {
  getQuote,
  getQuoteCount,
} from '~src/services/quote.service';

import {
  Logo,
  Label,
  Image,
} from '~src/components';

import {
  DsQuoteId,
  DsQuoteText,
  DsQuoteNavigation,
  DsQuoteRandom,
  DsQuoteTheme,
} from './components';

import { desktopScreen as DESKTOP_SCREEN } from './deaf-sayings.json';

import './deaf-sayings.scss';

const DeafSayings = () => {
  const [scale, setScale] = useState(0);
  const [isVertical, setIsVertical] = useState(false);
  const [quote, setQuote] = useState();
  const [quoteCount, setQuoteCount] = useState();

  const className = classNames({
    'deaf-sayings': true,
    '_vertical-auto': isVertical,
    '_horizontal-auto': !isVertical,
  });

  const props = {
    className,
    style: {
      transform: `scale(${scale}) ${ isVertical ? 'translateY(-50%)' : 'translateX(-50%)' }`,
    },
  };

  function updateScale() {
    const scaleX = window.innerWidth / DESKTOP_SCREEN.width;
    const scaleY = window.innerHeight / DESKTOP_SCREEN.height;

    setScale(Math.min(scaleX, scaleY));

    setIsVertical(scaleY > scaleX);
  }

  function handleUpdateQuote(event, data) {
    setQuote(data);
  }

  useEffect(() => {
    const count = getQuoteCount();
    setQuote(getQuote(count));
    setQuoteCount(count);
  }, []);

  useLayoutEffect(() => {
    window.addEventListener('resize', updateScale);
    updateScale();
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return ( !isEmpty(quote) ?
    <div {...props}>
      <div className="deaf-sayings__block _r1-c1"></div>
      <div className="deaf-sayings__block _r1-c2">
        <div className="deaf-sayings__logo">
          <Logo />
        </div>
      </div>
      <div className="deaf-sayings__block _r1-c3">
        <DsQuoteId
          quoteId={quote.id}
          quoteCount={quoteCount}
        />
      </div>
      <div className="deaf-sayings__block _r1-c4">
        <div className="deaf-sayings__language">EN</div>
      </div>

      <div className="deaf-sayings__block _r2-c1"></div>
      <div className="deaf-sayings__block _r2-c2">
        <DsQuoteText
          quoteText={quote.text}
          quoteSize={quote.size}
        />
      </div>
      <div className="deaf-sayings__block _r2-c3 _states">
        <DsQuoteNavigation
          type="prev"
          quoteId={quote.id}
          quoteCount={quoteCount}
          onClick={handleUpdateQuote}
        />
      </div>

      <div className="deaf-sayings__block _r3-c1"></div>
      <div className="deaf-sayings__block _r3-c2">
        <div className="deaf-sayings__author">
          <span className="deaf-sayings__author_name">{ quote.author.name }</span>
          <div className="deaf-sayings__author_content">
            <span className="deaf-sayings__author_biography">{ quote.author.biography }</span>
          </div>
        </div>
      </div>
      <div className="deaf-sayings__block _r3-c3">
        <div className="deaf-sayings__image">
          <Image src={quote.author.img} />
        </div>
        <div className="deaf-sayings__author">
          <div className="deaf-sayings__author_content">
            <span className="deaf-sayings__author_status">{ quote.author.status }</span>
            <span className="deaf-sayings__author_lifetime">{ quote.author.getLifetime() }</span>
            <span className="deaf-sayings__author_place">{ quote.author.placeOfBirth }</span>
          </div>
        </div>
      </div>
      <div className="deaf-sayings__block _r3-c4 _states">
        <DsQuoteNavigation
          type="next"
          quoteId={quote.id}
          quoteCount={quoteCount}
          onClick={handleUpdateQuote}
        />
      </div>

      <div className="deaf-sayings__block _r4-c1 _states">
        <DsQuoteTheme />
      </div>
      <div className="deaf-sayings__block _r4-c2">
        <div className="deaf-sayings__develop-by">
          <span>Made by <Label href="https://github.com/yakalinkin">@yakalinkin</Label></span>
        </div>
      </div>
      <div className="deaf-sayings__block _r4-c3">
        <div className="deaf-sayings__links">
          <Label href="https://github.com/yaprj/deaf-sayings" iconName="github">GitHub</Label>
        </div>
      </div>
      <div className="deaf-sayings__block _r4-c4 _states">
        <DsQuoteRandom
          quoteId={quote.id}
          onClick={handleUpdateQuote}
        />
      </div>
    </div>
    : null
  );
};

export default DeafSayings;
