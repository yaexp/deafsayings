import anime from 'animejs';

export const imageRevealEffect = ({
  targets,
  duration,
  easing,
  effectType,
}) => {
  const keyframes = {};
  let direction = 'normal';

  switch(effectType) {
    case 'InUp':
      keyframes['clipPath'] = ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)'];
      break;
    case 'InDown':
      keyframes['clipPath'] = ['inset(100% 0% 0% 0%)', 'inset(0% 0% 0% 0%)'];
      break;
    case 'OutUp':
      keyframes['clipPath'] = ['inset(0% 0% 0% 0%)', 'inset(100% 0% 0% 0%)'];
      direction = 'reverse';
      break;
    case 'OutDown':
      keyframes['clipPath'] = ['inset(0% 0% 0% 0%)', 'inset(0% 0% 100% 0%)'];
      direction = 'reverse';
      break;
  }

  return anime
    .timeline({
      targets: [targets, targets.querySelector('.image')],
      delay: anime.stagger(125, { direction }),
      duration,
      easing,
    })
    .add({
      ...keyframes,
    })
    .finished;
};
