import React, {
  useState,
  useEffect,
  useRef,
} from 'react';
import classNames from 'classnames';

import styleJson from '~/styles/main.scss.json';

import { Icon } from '~/components';

import './ds-quote-theme.scss';

function getThemeGenerator() {
  const colors = Object.keys(styleJson.colors).filter((color) => color !== DOM.html.getTheme());
  return colors[Symbol.iterator]();
}

const DOM = {
  html: {
    getTheme: () => document.querySelector('html').getAttribute('data-theme'),
    setTheme: (value) => document.querySelector('html').setAttribute('data-theme', value),
  },
};

let themes = (() => {
  let themeGenerator;

  return {
    next() {
      if (!themeGenerator) {
        this.update();
      }
      return themeGenerator.next();
    },
    update() {
      themeGenerator = getThemeGenerator();
    },
  };
})();

const DsQuoteTheme = (props) => {
  const isFirstChange = useRef(true);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [currentTheme, setCurrentTheme] = useState({ value: DOM.html.getTheme() });
  const buttonRef = useRef();

  const className = classNames({
    'ds-quote-theme': true,
  });

  props = {
    className,
    onClick: () => {
      setCurrentTheme(themes.next());
    },
    onKeyDown(event) {
      if (event.which === 13) {
        buttonRef.current.click();
      }
    },
    onMouseDown() {
      setIsMouseDown(true);
    },
    onMouseUp() {
      setIsMouseDown(false);
    },
    onFocus(event) {
      if (isMouseDown) {
        event.target.blur();
      }
    },
    ...props,
  };

  useEffect(() => {
    if (isFirstChange.current) {
      isFirstChange.current = false;
      return;
    }

    if (currentTheme.value !== DOM.html.getTheme()) {
      DOM.html.setTheme(currentTheme.value);
    } else {
      setCurrentTheme(themes.next());
    }
  }, [currentTheme.value]);

  useEffect(() => {
    if(currentTheme.done) {
      themes.update();
      setCurrentTheme(themes.next());
    }
  }, [currentTheme.done]);

  return (
    <div {...props} tabIndex="0" role="button" ref={buttonRef}>
      <span>
        <Icon iconName="contrast" />
      </span>
    </div>
  );
};

export default DsQuoteTheme;
