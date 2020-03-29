import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { loadFontGroup } from '~src/utils/load-fonts';

const styleJson = require('~styles/main.variables.json');

import { SplashScreen } from '~src/components';
import { DeafSayings } from '~src/screens';

function Root() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = 'Deaf Sayings';

    (async () => {
      await loadFontGroup(styleJson.font.typefaces['primary']);
      setTimeout(() => setIsLoading(false), 1000);
    })();
  });

  return (
    <SplashScreen isLoading={isLoading}>
      <DeafSayings />
    </SplashScreen>
  );
}

export default module.hot ? hot(Root) : Root;
