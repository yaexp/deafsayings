import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { loadFontGroup } from '~src/utils/load-fonts';

const styleJson = require('~styles/main.variables.json');

import { Main as MainLayout } from '~src/layouts';
import { SplashScreen } from '~src/components';

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
      <MainLayout>
        {/* view */}
        Hello world!
      </MainLayout>
    </SplashScreen>
  );
}

export default module.hot ? hot(Root) : Root;
