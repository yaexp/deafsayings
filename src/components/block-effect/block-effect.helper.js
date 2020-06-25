export function splitLines({ element, lineClassName }) {
  const elements = getInnerText({ element, ignoreClassName: lineClassName });

  elements.forEach(({ parentElement, text }) => {
    const words = text.split(/\s+/);
    const newElm = cloneElement(parentElement);

    let prevHtml;
    let maxHeight;
    let lineElm;

    parentElement.appendChild(newElm);
    newElm.innerHTML = 'text';
    newElm.style.width = parentElement.offsetWidth + 'px';
    maxHeight = newElm.offsetHeight + 2;
    newElm.innerHTML = '';

    lineElm = cloneElement(newElm);
    newElm.style.width = parentElement.offsetWidth + 'px';
    lineElm.innerHTML = '';
    parentElement.appendChild(lineElm);

    for (let wordIdx = 0; wordIdx < words.length; wordIdx++) {
      const html = lineElm.innerHTML;

      lineElm.innerHTML = [html, words[wordIdx]].join(html ? ' ' : '');

      if (lineElm.innerHTML === prevHtml) {
        prevHtml = '';

        newElm.appendChild(createLineElement({
          tag: 'span',
          html: lineElm.innerHTML,
          className: lineClassName,
        }));

        lineElm.innerHTML = '';
        continue;
      }
      if (lineElm.offsetHeight > maxHeight) {
        prevHtml = lineElm.innerHTML;
        lineElm.innerHTML = html;

        newElm.appendChild(createLineElement({
          tag: 'span',
          html: lineElm.innerHTML,
          className: lineClassName,
        }));

        lineElm.innerHTML = '';
        wordIdx--;
      }
    }

    newElm.appendChild(createLineElement({
      tag: 'span',
      html: lineElm.innerHTML,
      className: lineClassName,
    }));

    parentElement.innerHTML = newElm.innerHTML;
  });
}

export function getInnerText({ element, ignoreClassName }) {
  const elements = [];

  return (function next(_element) {
    if (_element.nodeType === Node.TEXT_NODE && _element.nodeValue.trim()) {
      elements.push({ parentElement: _element.parentNode, text: _element.nodeValue });
    }

    if(_element.className && _element.className.split(' ').indexOf(ignoreClassName) === -1) {
      _element.childNodes.length && _element.childNodes.forEach(nextElm => next(nextElm));
    }

    return elements;
  })(element);
}

export function cloneElement(element) {
  const cloneElm = element.cloneNode();
  cloneElm.style.position = 'absolute';
  return cloneElm;
}

export function createLineElement({tag, html, className}) {
  const lineElement = document.createElement(tag);
  lineElement.classList.add(className);
  lineElement.innerHTML = `<span>${html}</span>`;
  return lineElement;
}
