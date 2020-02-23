import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { loadFontGroup } from '~src/utils/load-fonts';

const styleJson = require('~styles/variables.json');

const Root = () => {
  const [isLoading, setIsLoading] = useState(null);

  useEffect(() => {
    document.title = 'Deaf Sayings';

    (async () => {
      await loadFontGroup(styleJson.fonts.typefaces['primary']);
      setIsLoading(false);
    })();
  });

  return isLoading === null
    ? <div>Loading...</div>
    : <div>Hello world!</div>;
};

export default module.hot ? hot(Root) : Root;
