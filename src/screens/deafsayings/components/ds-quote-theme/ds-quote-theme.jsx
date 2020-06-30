import React, {
  useState,
  useEffect,
} from 'react';
import classNames from 'classnames';

const styleJson = require('~styles/main.variables.json');

import { Icon } from '~/src/components';

import './ds-quote-theme.scss';

const DsQuoteTheme = (props) => {
  const [isMouseEnter, setIsMouseEnter] = useState(false);
  const [themes, setThemes] = useState(getThemeGenerator());
  const [currentTheme, setCurrentTheme] = useState({});

  const className = classNames({
    'ds-quote-theme': true,
  });

  function getThemeGenerator() {
    return Object.keys(styleJson.colors)[Symbol.iterator]();
  }

  props = {
    className,
    onClick: () => {
      setCurrentTheme(themes.next());
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

  useEffect(() => {
    setCurrentTheme(themes.next());
  }, [themes]);

  useEffect(() => {
    currentTheme.value && document.querySelector('html').setAttribute('data-theme', currentTheme.value);
    return () => document.querySelector('html').removeAttribute('data-theme');
  }, [currentTheme.value]);

  useEffect(() => {
    if(currentTheme.done) {
      setThemes(getThemeGenerator());
    }
  }, [currentTheme.done]);

  return (
    <button {...props}>
      <span>
        <Icon iconName="contrast" />
      </span>
    </button>
  );
};

export default DsQuoteTheme;
