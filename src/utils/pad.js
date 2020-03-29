export const pad = (n, width = 3) => {
  n = n.toString();

  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
};
