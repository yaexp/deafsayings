import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import anime from 'animejs';

import { useWait } from '~/src/hooks';

import { splitLines } from './text-revealer.helper';

import './text-revealer.scss';

import {
  startAnimationLength as START_ANIMATION_LENGTH,
  endAnimationLength as END_ANIMATION_LENGTH,
} from './text-revealer.variables.json';

const DIRECT_NEXT = 'next';
const DIRECT_PREV = 'prev';

const blockElementName = 'text-revealer';

function useTextRevealerState({ text, waiterKey, directType, textRef, onNextChange }) {
  const [isStart, setIsStart] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [nextText, setNextText] = useState();
  const { startWaiting, endWaiting } = useWait();

  const firstChange = useRef(true);

  useEffect(() => {
    setNextText(text);
  }, []);

  useEffect(() => {
    if (firstChange.current) {

      // :FIX: setTimeout is bad practice
      setTimeout(() => splitLines({ text, blockElementName, ref: textRef }));

      firstChange.current = false;
      return;
    }

    startWaiting(waiterKey || blockElementName);
    setIsStart(true);
  }, [text]);

  useEffect(() => {
    if(isStart) {
      anime.timeline({
        targets: textRef.current.querySelectorAll('.text-revealer__line'),
        delay: anime.stagger(100),
        duration: START_ANIMATION_LENGTH,
        easing: 'easeInExpo',
        opacity: [1, 0],
      }).add({
        targets: textRef.current.querySelectorAll('.text-revealer__line > *'),
        translateY: (directType === DIRECT_NEXT) ? ['0%', '100%'] : ['0%', '-100%'],
      }).finished.then(() => {
        onNextChange && onNextChange();

        setNextText(text);
        splitLines({ text, blockElementName, ref: textRef });
        setIsStart(false);
        setIsEnd(true);
      });
    }
    if (isEnd) {
      anime.timeline({
        targets: textRef.current.querySelectorAll('.text-revealer__line'),
        delay: anime.stagger(100),
        duration: END_ANIMATION_LENGTH,
        easing: 'easeOutExpo',
        opacity: [0, 1],
      }).add({
        targets: textRef.current.querySelectorAll('.text-revealer__line > *'),
        translateY: (directType === DIRECT_NEXT) ? ['-100%', '0%'] : ['100%', '0%'],
      }).finished.then(() => {
        setIsEnd(false);
        endWaiting(waiterKey || blockElementName);
      });
    }
  }, [isStart, isEnd]);

  return { isStart, isEnd, nextText };
}

const TextRevealer = ({ text, waiterKey, directType = DIRECT_NEXT, onNextChange, ...props }) => {
  const textRef = React.useRef();
  const { isStart, isEnd, nextText } = useTextRevealerState({ text, waiterKey, directType, textRef, onNextChange });

  props = {
    className: classNames({
      [blockElementName]: true,
      [`_${directType}-start`]: isStart,
      [`_${directType}-end`]: isEnd,
    }),
    ...props,
  };

  return (
    <span {...props} ref={textRef}>
      { nextText }
    </span>
  );
};

TextRevealer.propTypes = {
  text: PropTypes.string.isRequired,
  directType: PropTypes.oneOf([DIRECT_NEXT, DIRECT_PREV]),
  onNextChange: PropTypes.func,
  waiterKey: PropTypes.string,
};

TextRevealer.statics = {
  DIRECT_NEXT,
  DIRECT_PREV,
};

export default TextRevealer;
