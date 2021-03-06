import React, {
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { hot } from 'react-hot-loader/root';
import { loadFontGroup, isMobile } from '~/utils';
import { WaitingProvider } from '~/hooks';

const styleJson = require('~/styles/main.scss.json');

import {
  SplashScreen,
  WarningScreen,
  GrainyTexture,
  Cursor,
} from '~/components';

import { DeafSayings } from '~/screens';

const WARNING_MESSAGES = {
  W001: 'Temporarily not supported in mobile devices. Please, switch to a laptop or desktop to view.',
  W002: 'Please, resize browser window to view',
};

const isProduction = process.env.NODE_ENV === 'production';

function Root() {
  const [isLoading, setIsLoading] = useState(true);
  const [warningText, setWarningText] = useState('');
  let screenEl;

  function updateBreakpoint() {
    let text = '';

    if (isMobile.any()) {
      text = WARNING_MESSAGES['W001'];
    } else if (800 > window.innerWidth || 600 > window.innerHeight) {
      text = WARNING_MESSAGES['W002'];
    }

    setWarningText(text);
  }

  useEffect(() => {
    let loadingTimer;

    document.title = 'Deaf Sayings';

    (async () => {
      await loadFontGroup(styleJson.font.typefaces['primary']);
      loadingTimer = setTimeout(() => setIsLoading(false), 1000);
    })();

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);

  useLayoutEffect(() => {
    window.addEventListener('resize', updateBreakpoint);
    updateBreakpoint();
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  if (isProduction && warningText) {
    screenEl = (
      <WarningScreen text={warningText} />
    );
  } else {
    screenEl = (
      <SplashScreen isLoading={isLoading}>
        <DeafSayings />
      </SplashScreen>
    );
  }

  return (
    <WaitingProvider>
      <GrainyTexture />
      <Cursor />
      { screenEl }
    </WaitingProvider>
  );
}

export default module.hot ? hot(Root) : Root;
