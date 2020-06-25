import anime from 'animejs';

export const revealEffect = ({
  targets,
  delay = anime.stagger(100),
  duration,
  easing,
  effectType,
}) => {
  const keyframes = {};
  const keyframesInner = {};
  const targetsInner = [...targets].map((elm) => [...elm.childNodes]).flat();

  switch(effectType) {
    case 'InUp':
      keyframes['opacity'] = [0, 1];
      keyframesInner['translateY'] = ['100%', '0%'];
      break;
    case 'InDown':
      keyframes['opacity'] = [0, 1];
      keyframesInner['translateY'] = ['-100%', '0%'];
      break;
    case 'OutUp':
      keyframes['opacity'] = [1, 0];
      keyframesInner['translateY'] = ['0%', '-100%'];
      break;
    case 'OutDown':
      keyframes['opacity'] = [1, 0];
      keyframesInner['translateY'] = ['0%', '100%'];
      break;
  }

  return anime
    .timeline({
      targets,
      delay,
      duration,
      easing,
      ...keyframes,
    })
    .add({
      targets: targetsInner,
      ...keyframesInner,
    })
    .finished;
};
