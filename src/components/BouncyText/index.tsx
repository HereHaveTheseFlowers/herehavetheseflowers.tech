import { motion, transform, useAnimationControls } from 'framer-motion';
import { useState } from 'react';

export function BouncyText(props: React.PropsWithChildren) {
  if (!props.children) return;
  const text = props.children.toString().split('');

  return (
    <>
      {text.map((letter, index) => {
        return <BouncyText.TextSpan key={index + Math.random()}>{letter}</BouncyText.TextSpan>;
      })}
    </>
  );
}

BouncyText.TextSpan = function BouncyTextSpan(props: React.PropsWithChildren) {
  const [isPlaying, setIsPlaying] = useState(false);

  const controls = useAnimationControls();

  const rubberBand = () => {
    controls.start({
      transform: [
        'scale(1, 1)',
        'scale(1.4, .55)',
        'scale(.75, 1.25)',
        'scale(1.25, .85)',
        'scale(.9, 1.05)',
        'scale(1, 1)'
      ],
      transition: {
        times: [0, 0.4, 0.6, 0.7, 0.8, 0.9]
      }
    });
    setIsPlaying(true);
  };

  return (
    <motion.span
      className='bouncytext'
      animate={controls}
      onMouseOver={() => {
        if (!isPlaying) {
          rubberBand();
        }
      }}
      onAnimationComplete={() => setIsPlaying(false)}
    >
      {props.children === ' ' ? '\xA0' : props.children}
    </motion.span>
  );
};
