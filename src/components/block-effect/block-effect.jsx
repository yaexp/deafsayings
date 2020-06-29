import React, {
  useState,
  useEffect,
  useRef,
} from 'react';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import { useWait } from '~/src/hooks';
import { getTextFromNode } from '~/src/utils';

import * as effects from './effects';
import { splitLines } from './block-effect.helper';

import {
  startAnimationLength as START_ANIMATION_LENGTH,
  endAnimationLength as END_ANIMATION_LENGTH,
} from './block-effect.variables.json';

import './block-effect.scss';

const DOM = {
  blockEffect: {
    className: 'block-effect',
    getElement(element = document) {
      return element.getElementsByClassName(DOM.blockEffect.className)[0];
    },
    inner: {
      className: 'block-effect__inner',
      getElement(element = document) {
        return element.getElementsByClassName(DOM.blockEffect.inner.className)[0];
      },
    },
    line: {
      className: 'block-effect__line',
      getElement(element = document) {
        return element.getElementsByClassName(DOM.blockEffect.line.className);
      },
    },
  },
};

const useBlockEffectState = ({
  children,
  deps,
  waiterKey,
  effectType,
  directType,
  delayIn,
  delayOut,
  onEntered,
  onExited,
  easingIn,
  easingOut,
  ref,
}) => {
  const [isStart, setIsStart] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [nextChildren, setNextChildren] = useState();
  const { startWaiting, endWaiting } = useWait();

  const isFirstChange = useRef(true);

  useEffect(() => {
    let timer;

    setNextChildren(children);

    if(effectType === TEXT_REVEAL_EFFECT) {
      timer = setTimeout(() => {
        splitLines({
          element: DOM.blockEffect.inner.getElement(ref.current),
          lineClassName: DOM.blockEffect.line.className,
        });
      });
    }

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isFirstChange.current) {
      isFirstChange.current = false;
      return;
    }

    startWaiting(waiterKey);
    setIsStart(true);
  }, deps.length ? deps : getTextFromNode(children));

  useEffect(() => {
    let innerElement;
    let delayInTimer = null;
    let delayOutTimer = null;

    switch (effectType) {
      case TEXT_REVEAL_EFFECT:
        innerElement = DOM.blockEffect.line.getElement(ref.current);
        break;
      default:
        innerElement = DOM.blockEffect.inner.getElement(ref.current);
    }

    if(isStart) {
      delayInTimer = setTimeout(() => {
        effects[`${effectType}Effect`]({
          targets: innerElement,
          duration: START_ANIMATION_LENGTH,
          easing: easingIn,
          effectType: (directType === DIRECT_NEXT) ? 'OutDown' : 'OutUp',
        }).then(() => {
          onEntered && onEntered();

          setNextChildren(children);

          if(effectType === TEXT_REVEAL_EFFECT) {
            splitLines({
              element: DOM.blockEffect.inner.getElement(ref.current),
              lineClassName: DOM.blockEffect.line.className,
            });
          }

          setIsStart(false);
          setIsFinish(true);
        });
      }, delayIn);
    }

    if (isFinish) {
      setTimeout(() => {
        effects[`${effectType}Effect`]({
          targets: innerElement,
          duration: END_ANIMATION_LENGTH,
          easing: easingOut,
          effectType: (directType === DIRECT_NEXT) ? 'InDown' : 'InUp',
        }).then(() => {
          onExited && onExited();

          setIsFinish(false);
          endWaiting(waiterKey);
        });
      }, delayOut);
    }

    return () => {
      clearTimeout(delayInTimer);
      clearTimeout(delayOutTimer);
    };
  }, [isStart, isFinish]);

  return { isStart, isFinish, nextChildren };
};

const BlockEffect = ({
  children,
  deps = [],
  effectType = FADE_EFFECT,
  directType = DIRECT_NEXT,
  waiterKey = DOM.blockEffect.className,
  delayIn,
  delayOut,
  onEntered,
  onExited,
  easingIn = 'easeInExpo',
  easingOut = 'easeOutExpo',
  ...props
}) => {
  const blockRef = useRef();
  const { isStart, isFinish, nextChildren } = useBlockEffectState({
    children,
    deps,
    waiterKey,
    effectType,
    directType,
    delayIn,
    delayOut,
    onEntered,
    onExited,
    easingIn,
    easingOut,

    ref: blockRef,
  });

  props = {
    className: classNames({
      [DOM.blockEffect.className]: true,
      [`_${effectType}-effect`]: true,
      [`_${directType}-start`]: isStart,
      [`_${directType}-finish `]: isFinish,
    }),
    ...props,
  };

  return (
    <div {...props} ref={blockRef}>
      <div className={DOM.blockEffect.inner.className}>
        {nextChildren}
      </div>
    </div>
  );
};

const {
  DIRECT_NEXT,
} = BlockEffect.directType = {
  DIRECT_NEXT: 'next',
  DIRECT_PREV: 'prev',
};

const {
  FADE_EFFECT,
  TEXT_REVEAL_EFFECT,
} = BlockEffect.effectType = {
  FADE_EFFECT: 'fade',
  TEXT_REVEAL_EFFECT: 'textReveal',
  IMAGE_REVEAL_EFFECT: 'imageReveal',
};

BlockEffect.blockElementName = DOM.blockEffect.className;

BlockEffect.propTypes = {
  children: PropTypes.node.isRequired,
  deps: PropTypes.array,
  effectType: PropTypes.oneOf(Object.values(BlockEffect.effectType)),
  directType: PropTypes.oneOf(Object.values(BlockEffect.directType)),
  waiterKey: PropTypes.string,
  delayIn: PropTypes.number,
  delayOut: PropTypes.number,
  easingIn: PropTypes.string,
  easingOut: PropTypes.string,
  onEntered: PropTypes.func,
  onExited: PropTypes.func,
};

export default BlockEffect;
