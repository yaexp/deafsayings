import React, {
  useLayoutEffect,
  useState,
} from 'react';

import classNames from 'classnames';

import './cursor.scss';

const Cursor = function () {
  const [isCursorHide, setIsCursorHide] = useState(true);
  const [isCursorClick, setIsCursorClick] = useState(false);
  const [isCursorHover, setIsCursorHover] = useState(false);
  const [cursorDot, setCursorDot] = useState({x: 0, y: 0});
  const [cursorCircle, setCursorCircle] = useState({x: 0, y: 0});

  function handleMouseEnter() {
    setIsCursorHide(false);
  }

  function handleMouseLeave() {
    setIsCursorHide(true);
  }

  function handleMouseOver(event) {
    const element = event.srcElement || event.target;

    switch(element.tagName) {
      case 'A':
        if (element.hasAttribute('href') && element.getAttribute('href')) {
          setIsCursorHover(true);
        }
        break;
      case 'BUTTON':
        if (!element.hasAttribute('disabled')) {
          setIsCursorHover(true);
        }
    }
  }

  function handleMouseOut() {
    setIsCursorHover(false);
  }

  function handleMouseDown() {
    setIsCursorClick(true);
  }

  function handleMouseUp() {
    setIsCursorClick(false);
  }

  function updateMouseMove({clientX, clientY}) {
    setCursorDot({ ...cursorDot, x: clientX, y: clientY });
    setTimeout(() => {
      setCursorCircle({ ...cursorCircle, x: clientX, y: clientY });
    }, 25);
  }

  const cursorClassName = classNames({
    'cursor': true,
    '_hide': isCursorHide,
    '_click': isCursorClick,
    '_hover': isCursorHover,
  });

  const cursorDotProps = {
    className: 'cursor__dot',
    style: {
      left: cursorDot.x,
      top: cursorDot.y,
    },
  };

  const cursorCircleProps = {
    className: 'cursor__circle',
    style: {
      left: cursorCircle.x,
      top: cursorCircle.y,
    },
  };

  useLayoutEffect(() => {
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', updateMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousemove', updateMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className={cursorClassName}>
      <div {...cursorDotProps}></div>
      <div {...cursorCircleProps}></div>
    </div>
  );
};

export default Cursor;
