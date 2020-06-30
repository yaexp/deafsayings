import {
  isValidElement,
  Children,
} from 'react';

import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';

export const childrenToString = (children) => {
  if(isString(children) || isNumber(children)) return String(children);

  return '';
};

export const hasChildren = (element) => element && Boolean(element.props.children);

export const getTextFromNode = (children) => {
  if (!(children instanceof Array) && !isValidElement(children)) {
    return childrenToString(children);
  }

  return Children.toArray(children).reduce((text, child) => {
    let newText;

    if (isValidElement(child) && hasChildren(child)) {
      newText = getTextFromNode(child.props.children);
    } else {
      newText = childrenToString(child);
    }

    return text.concat(newText);
  }, '');
};
