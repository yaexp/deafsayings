import anime from 'animejs';

export const fadeEffect = ({
  targets,
  delay = 0,
  duration,
  easing,
  effectType,
}) => {
  const keyframes = {};

  switch(effectType) {
    case 'InUp':
      keyframes['opacity'] = [0, 1];
      keyframes['translateY'] = ['2.5em', '0em'];
      break;
    case 'InDown':
      keyframes['opacity'] = [0, 1];
      keyframes['translateY'] = ['-2.5em', '0em'];
      break;
    case 'OutUp':
      keyframes['opacity'] = [1, 0];
      keyframes['translateY'] = ['0em', '-2.5em'];
      break;
    case 'OutDown':
      keyframes['opacity'] = [1, 0];
      keyframes['translateY'] = ['0em', '2.5em'];
      break;
  }

  return anime
    .timeline({
      targets,
      delay,
      duration,
      easing,
    })
    .add(keyframes)
    .finished;
};
