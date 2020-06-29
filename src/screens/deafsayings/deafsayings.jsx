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
} from '~/src/services/quote.service';

import {
  Logo,
  Label,
  Image,
  BlockEffect,
} from '~/src/components';

import {
  DsQuoteId,
  DsQuoteText,
  DsQuoteNavigation,
  DsQuoteRandom,
  DsQuoteTheme,
} from './components';

import { desktopScreen as DESKTOP_SCREEN } from './deafsayings.json';

import './deafsayings.scss';

const DeafSayings = () => {
  const [scale, setScale] = useState(0);
  const [isVertical, setIsVertical] = useState(false);
  const [quote, setQuote] = useState();
  const [quoteCount, setQuoteCount] = useState();
  const [directType, setDirectType] = useState();

  const className = classNames({
    'deafsayings': true,
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
    const scaleY = window.innerHeight / (DESKTOP_SCREEN.height + 4);

    setScale(Math.min(scaleX, scaleY));

    setIsVertical(scaleY > scaleX);
  }

  function handleUpdateQuote(event, { data, directType }) {
    setQuote(data);
    setDirectType(directType);
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

      {/* Row #1 */}
      <div className="deafsayings__block _r1-c1"></div>
      <div className="deafsayings__block _r1-c2">
        <div className="deafsayings__logo">
          <Logo />
        </div>
      </div>
      <div className="deafsayings__block _r1-c3">
        <DsQuoteId
          quoteId={quote.id}
          quoteCount={quoteCount}
          directType={directType}
        />
      </div>
      <div className="deafsayings__block _r1-c4">
        <div className="deafsayings__language">EN</div>
      </div>

      {/* Row #2 */}
      <div className="deafsayings__block _r2-c1"></div>
      <div className="deafsayings__block _r2-c2">
        <DsQuoteText
          quoteText={quote.text}
          quoteSize={quote.size}
          directType={directType}
        />
      </div>
      <div className="deafsayings__block _r2-c3 _states">
        <DsQuoteNavigation
          directType="prev"
          quoteId={quote.id}
          quoteCount={quoteCount}
          onClick={handleUpdateQuote}
        />
      </div>

      {/* Row #3 */}
      <div className="deafsayings__block _r3-c1"></div>
      <div className="deafsayings__block _r3-c2">
        <div className="deafsayings__author">
          <BlockEffect
            effectType={BlockEffect.effectType.FADE_EFFECT}
            directType={directType}
            delayIn={100}
            deps={ [quote.author.id] }
          >
            <span className="deafsayings__author_name">
              { quote.author.name }
            </span>
          </BlockEffect>
          <BlockEffect
            effectType={BlockEffect.effectType.FADE_EFFECT}
            directType={directType}
            delayIn={200}
            deps={ [quote.author.id] }
          >
            <div className="deafsayings__author_content">
              <span className="deafsayings__author_biography">
                { quote.author.biography }
              </span>
            </div>
          </BlockEffect>
        </div>
      </div>
      <div className="deafsayings__block _r3-c3">
        <div className="deafsayings__image">
          <BlockEffect
            effectType={BlockEffect.effectType.IMAGE_REVEAL_EFFECT}
            directType={directType}
            // delayIn={100}
            delayOut={100}
            deps={ [quote.author.id] }
          >
            <Image src={quote.author.img} />
          </BlockEffect>
        </div>
        <div className="deafsayings__author">
          <BlockEffect
            effectType={BlockEffect.effectType.FADE_EFFECT}
            directType={directType}
            delayIn={300}
            deps={ [quote.author.id] }
          >
            <div className="deafsayings__author_content">
              <span className="deafsayings__author_status">
                { quote.author.status }
              </span>
              <span className="deafsayings__author_lifetime">
                { quote.author.getLifetime() }
              </span>
              <span className="deafsayings__author_place">
                { quote.author.placeOfBirth }
              </span>
            </div>
          </BlockEffect>
        </div>
      </div>
      <div className="deafsayings__block _r3-c4 _states">
        <DsQuoteNavigation
          directType="next"
          quoteId={quote.id}
          quoteCount={quoteCount}
          onClick={handleUpdateQuote}
        />
      </div>

      {/* Row #4 */}
      <div className="deafsayings__block _r4-c1 _states">
        <DsQuoteTheme />
      </div>
      <div className="deafsayings__block _r4-c2">
        <div className="deafsayings__develop-by">
          <span>Made by <Label href="https://github.com/yakalinkin">@yakalinkin</Label></span>
        </div>
      </div>
      <div className="deafsayings__block _r4-c3">
        <div className="deafsayings__links">
          <Label href="https://github.com/yaexp/deafsayings" iconName="github">GitHub</Label>
        </div>
      </div>
      <div className="deafsayings__block _r4-c4 _states">
        <DsQuoteRandom
          quoteId={quote.id}
          onClick={handleUpdateQuote}
        />
      </div>

    </div>
    // :TODO: Add DsSkeletonLoading
    : null
  );
};

export default DeafSayings;
