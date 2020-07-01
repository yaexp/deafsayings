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
    setIsCursorClick(false);
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
        break;
      case 'DIV':
        if (element.getAttribute('role') === 'button') {
          setIsCursorHover(true);
        }
        break;
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
    document.getElementById('root').addEventListener('mouseenter', handleMouseEnter);
    document.getElementById('root').addEventListener('mouseover', handleMouseOver);
    document.getElementById('root').addEventListener('mousedown', handleMouseDown);
    document.getElementById('root').addEventListener('mousemove', updateMouseMove);
    document.getElementById('root').addEventListener('mouseup', handleMouseUp);
    document.getElementById('root').addEventListener('mouseout', handleMouseOut);
    document.getElementById('root').addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.getElementById('root').removeEventListener('mouseenter', handleMouseEnter);
      document.getElementById('root').removeEventListener('mouseover', handleMouseOver);
      document.getElementById('root').removeEventListener('mousemove', updateMouseMove);
      document.getElementById('root').removeEventListener('mousedown', handleMouseDown);
      document.getElementById('root').removeEventListener('mouseup', handleMouseUp);
      document.getElementById('root').removeEventListener('mouseout', handleMouseOut);
      document.getElementById('root').removeEventListener('mouseleave', handleMouseLeave);
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
