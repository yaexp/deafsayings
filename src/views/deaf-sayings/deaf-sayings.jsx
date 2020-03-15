import React, { useLayoutEffect, useState } from 'react';
import classNames from 'classnames';

import { desktopScreen as DESKTOP_SCREEN } from './deaf-sayings.json';

import './deaf-sayings.scss';

import { Label } from '~src/components';

const DeafSayings = () => {
  const [scale, setScale] = useState(0);
  const [isVertical, setIsVertical] = useState(false);


  function updateScale() {
    const scaleX = window.innerWidth / DESKTOP_SCREEN.width;
    const scaleY = window.innerHeight / DESKTOP_SCREEN.height;

    setScale(Math.min(scaleX, scaleY));

    if (scaleY > scaleX) {
      setIsVertical(true);
    } else {
      setIsVertical(false);
    }
  }

  useLayoutEffect(() => {
    window.addEventListener('resize', updateScale);
    updateScale();
    return () => window.removeEventListener('resize', updateScale);
  });

  const className = classNames({
    'deaf-sayings': true,
    '_vertical': isVertical,
    '_horizontal': !isVertical,
  });

  const props = {
    className,
    style: {
      transform: `scale(${scale}) ${ isVertical ? 'translateY(-50%)' : 'translateX(-50%)' }`,
    },
  };

  return <>
    <div {...props}>
      <div className="deaf-sayings__block _r1-c1"></div>
      <div className="deaf-sayings__block _r1-c2">
        <div className="deaf-sayings__logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 323.96 33.13"><path d="M15.17.74q8 0 12.54 4.23c3 2.81 4.5 6.71 4.5 11.67s-1.5 8.86-4.5 11.67-7.18 4.23-12.54 4.23H0V.74zm-.86 25.4c3.3 0 5.81-.85 7.52-2.53a9.32 9.32 0 002.56-7 9.32 9.32 0 00-2.56-7q-2.56-2.52-7.52-2.52h-6.5v19zM45.61 26.45h20.21v6.09h-28V.74h27.23v6.09H45.61v6.68h15.22v5.72H45.61zM96.17 32.54l-2.46-6.81H78.4L76 32.54h-7.73l12-31.8H92l12.09 31.8zM80.54 19.82h11L86.08 4.51zM134.92 7.15h-18.77V14h15v6.18h-15v12.4h-7.81V.74h26.58zM157.88 8.47a5 5 0 00-2.29-3.7 8.78 8.78 0 00-4.93-1.32A8.18 8.18 0 00145.52 5a4.66 4.66 0 00-2 3.82 3.75 3.75 0 001.06 2.79 7.72 7.72 0 002.51 1.65 23 23 0 002.64.9l3.27.88a28.84 28.84 0 012.8.91 13.19 13.19 0 013 1.57 8.33 8.33 0 012.36 2.48 7.41 7.41 0 01.92 3.81 8.45 8.45 0 01-1.36 4.71 9.35 9.35 0 01-3.95 3.34 14.47 14.47 0 01-6.3 1.24 12.76 12.76 0 01-8.22-2.45 8.68 8.68 0 01-3.32-6.4h4a4.92 4.92 0 001.23 3A6.37 6.37 0 00146.9 29a11 11 0 003.57.57 10.52 10.52 0 004-.72 6.85 6.85 0 002.81-2 4.83 4.83 0 001-3.07 3.72 3.72 0 00-.9-2.6 6.55 6.55 0 00-2.35-1.64 25.23 25.23 0 00-3.15-1.09l-4-1.13a14.72 14.72 0 01-6-3.09A6.8 6.8 0 01139.81 9a7.84 7.84 0 011.46-4.71 9.78 9.78 0 014-3.14A13.31 13.31 0 01150.79 0a13.08 13.08 0 015.52 1.11 9.58 9.58 0 013.83 3 7.52 7.52 0 011.5 4.35zM169.8 32.56h-4.08L177.52.44h4l11.8 32.12h-4.08L186 23.47h-13zM174.25 20h10.54l-5.14-14.5h-.25zM192.32.44h4.46l8.91 15h.37l8.94-15h4.46l-11.64 18.89v13.23h-3.89V19.33zM228.34.44v32.12h-3.89V.44zM261.59.44v32.12h-3.76L240.32 7.34H240v25.22h-3.89V.44h3.76l17.57 25.29h.31V.44zM291.33 10.48a10.14 10.14 0 00-3.35-5 9.11 9.11 0 00-5.81-1.83A9.56 9.56 0 00277 5.11a10.26 10.26 0 00-3.72 4.35 16.15 16.15 0 00-1.38 7 16.08 16.08 0 001.4 7.05 10.16 10.16 0 003.78 4.34 10 10 0 005.36 1.48 9.81 9.81 0 004.81-1.16 8.32 8.32 0 003.27-3.17 10.51 10.51 0 001.25-5h-8.47v-3.5h12.23V20a13.62 13.62 0 01-1.68 6.9 11.74 11.74 0 01-4.64 4.55 15.11 15.11 0 01-14.28-.4 13.53 13.53 0 01-5-5.71 19.93 19.93 0 01-1.79-8.79 19.88 19.88 0 011.79-8.78 13.63 13.63 0 015-5.71 13.35 13.35 0 017.29-2 13.94 13.94 0 016.15 1.33 12.54 12.54 0 017 9.15zM319.75 8.47a4.9 4.9 0 00-2.29-3.7 8.75 8.75 0 00-4.92-1.32A8.21 8.21 0 00307.39 5a4.67 4.67 0 00-1.94 3.82 3.75 3.75 0 001.06 2.79 7.61 7.61 0 002.49 1.61 21.79 21.79 0 002.64.9l3.26.88a28 28 0 012.8.91 13.25 13.25 0 013 1.57A8.3 8.3 0 01323 20a7.32 7.32 0 01.93 3.81 8.53 8.53 0 01-1.36 4.71 9.35 9.35 0 01-4 3.34 14.47 14.47 0 01-6.3 1.24 12.76 12.76 0 01-8.22-2.45 8.66 8.66 0 01-3.33-6.4h4a5 5 0 001.23 3 6.47 6.47 0 002.83 1.75 10.86 10.86 0 003.57.57 10.52 10.52 0 004-.72 6.85 6.85 0 002.81-2 4.82 4.82 0 001-3.07 3.76 3.76 0 00-.89-2.6 6.64 6.64 0 00-2.27-1.64 26 26 0 00-3.16-1.09l-4-1.13a14.65 14.65 0 01-6-3.09A6.77 6.77 0 01301.68 9a7.78 7.78 0 011.47-4.71 9.82 9.82 0 014-3.14A13.34 13.34 0 01312.66 0a13.08 13.08 0 015.52 1.11 9.61 9.61 0 013.84 3 7.52 7.52 0 011.5 4.35z"/></svg>
        </div>
      </div>
      <div className="deaf-sayings__block _r1-c3">
        <div className="deaf-sayings__number">No.001<span>010</span></div>
      </div>
      <div className="deaf-sayings__block _r1-c4">
        <div className="deaf-sayings__language">EN</div>
      </div>

      <div className="deaf-sayings__block _r2-c1"></div>
      <div className="deaf-sayings__block _r2-c2">
        <div className="deaf-sayings__quote">
          <span>Music is like a dream. One that I cannot hear.</span>
        </div>
      </div>
      <div className="deaf-sayings__block _r2-c3">
        <div className="deaf-sayings__pagination _next">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 4L6 14l1.41 1.41L15 7.83V30h2V7.83l7.59 7.58L26 14 16 4z"/></svg>
        </div>
      </div>

      <div className="deaf-sayings__block _r3-c1"></div>
      <div className="deaf-sayings__block _r3-c2">
        <div className="deaf-sayings__info">
          <div className="deaf-sayings__info_content">
            <span className="deaf-sayings__info_name">Ludwig van Beethoven</span>
            <span className="deaf-sayings__info_biography">German composer Ludwig van Beethoven is considered one of the most important figures in the history of music. He continued to compose even while losing his hearing and created some of his greatest works after becoming totally deaf.</span>
          </div>
        </div>
      </div>
      <div className="deaf-sayings__block _r3-c3">
        <div className="deaf-sayings__info">
          <div className="deaf-sayings__info_content">
            <span className="deaf-sayings__info_status">Lived</span>
            <span className="deaf-sayings__info_dates">1770 — 1827</span>
            <span className="deaf-sayings__info_place">Bonn, Germany</span>
          </div>
        </div>
        <div className="deaf-sayings__image">
          <img src={require('~src/assets/images/people/beethoven.jpg').default} />
        </div>
      </div>
      <div className="deaf-sayings__block _r3-c4">
        <div className="deaf-sayings__pagination _prev">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M24.59 16.59L17 24.17V2h-2v22.17l-7.59-7.58L6 18l10 10 10-10-1.41-1.41z"/></svg>
        </div>
      </div>

      <div className="deaf-sayings__block _r4-c1">
        <div className="deaf-sayings__theme">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16 30C8.3 30 2 23.7 2 16S8.3 2 16 2s14 6.3 14 14-6.3 14-14 14zm0-26C9.4 4 4 9.4 4 16s5.4 12 12 12 12-5.4 12-12S22.6 4 16 4z"/><path d="M16 6v20c5.5 0 10-4.5 10-10S21.5 6 16 6z"/></svg>
        </div>
      </div>
      <div className="deaf-sayings__block _r4-c2">
        <div className="deaf-sayings__develop-by">
          <span>Made by <Label href="#">@yakalinkin</Label></span>
        </div>
      </div>
      <div className="deaf-sayings__block _r4-c3">
        <div className="deaf-sayings__links">
          <Label href="#" iconName="github">GitHub</Label>
        </div>
      </div>
      <div className="deaf-sayings__block _r4-c4">
        <div className="deaf-sayings__random">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M12 10H6.78A11 11 0 0127 16h2A13 13 0 006 7.68V4H4v8h8zM20 22h5.22A11 11 0 015 16H3a13 13 0 0023 8.32V28h2v-8h-8z"/></svg>
        </div>
      </div>
    </div>
  </>;
};

export default DeafSayings;
