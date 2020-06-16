export function splitLines({ text, ref, blockElementName }) {
  const currentElm = ref.current;
  const words = text.split(/\s+/);
  const newElm = cloneElement(currentElm);

  let prevHtml;
  let maxHeight;
  let lineElm;

  currentElm.appendChild(newElm);
  newElm.innerHTML = 'a';
  newElm.style.width = currentElm.offsetWidth + 'px';
  maxHeight = newElm.offsetHeight + 2;
  newElm.innerHTML = '';

  lineElm = cloneElement(newElm);
  newElm.style.width = currentElm.offsetWidth + 'px';
  lineElm.innerHTML = '';
  currentElm.appendChild(lineElm);

  for (let wordIdx = 0; wordIdx < words.length; wordIdx++) {
    const html = lineElm.innerHTML;

    lineElm.innerHTML = [html, words[wordIdx]].join(html ? ' ' : '');

    if (lineElm.innerHTML === prevHtml) {
      prevHtml = '';

      newElm.appendChild(createLineElement({
        tag: 'span',
        html: lineElm.innerHTML,
        blockElementName,
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
        blockElementName,
      }));

      lineElm.innerHTML = '';
      wordIdx--;
    }
  }

  newElm.appendChild(createLineElement({
    tag: 'span',
    html: lineElm.innerHTML,
    blockElementName,
  }));

  currentElm.innerHTML = newElm.innerHTML;
}

function cloneElement(element) {
  const cloneElm = element.cloneNode();
  cloneElm.style.position = 'absolute';
  return cloneElm;
}

function createLineElement({tag, blockElementName, html}) {
  const lineElement = document.createElement(tag);
  lineElement.classList.add(`${blockElementName}__line`);
  lineElement.innerHTML = `<span>${html}</span>`;
  return lineElement;
}
