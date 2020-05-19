import React, {
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import { hot } from 'react-hot-loader/root';
import { loadFontGroup, isMobile } from '~/src/utils';

const styleJson = require('~styles/main.variables.json');

import {
  SplashScreen,
  WarningScreen,
  GrainyTexture,
  Cursor,
} from '~/src/components';

import { DeafSayings } from '~/src/screens';

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
    document.title = 'Deaf Sayings';

    (async () => {
      await loadFontGroup(styleJson.font.typefaces['primary']);
      setTimeout(() => setIsLoading(false), 1000);
    })();
  });

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

  return <>
    <GrainyTexture />
    <Cursor />
    { screenEl }
  </>;
}

export default module.hot ? hot(Root) : Root;
