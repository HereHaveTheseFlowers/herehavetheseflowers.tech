import classnames from 'classnames';
import { motion, useAnimationControls } from 'framer-motion';

type BouncyButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  svgRef: React.MutableRefObject<any>;
};

export function BouncyButton(props: BouncyButtonProps) {
  const { className, children, onClick, svgRef } = props;
  const circleControls = useAnimationControls();
  const classNames = classnames('bouncybutton', className);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    svgRef.current.style.transition = 'transform 0.13s';
    svgRef.current.style.transform = 'scale(0.91)';
    circleControls.start((i) => ({
      scaleY: 1.14,
      scaleX: 1,
      transition: {
        type: 'spring',
        delay: i * 0.04,
        duration: 0.05,
        stiffness: 1000,
        damping: 20,
        restDelta: 0.001
      }
    }));
    setTimeout(() => {
      svgRef.current.style.transition = 'transform 0.13s';
      svgRef.current.style.transform = 'scale(1)';
      circleControls.start((i) => ({
        scaleY: 1,
        scaleX: 1,
        transition: {
          type: 'spring',
          delay: i * 0.02,
          duration: 0.05,
          stiffness: 500,
          damping: 5,
          restDelta: 0.001
        }
      }));
    }, 140);
    onClick(e);
  };

  const handleHoverStart = () => {
    circleControls.start((i) => ({
      scaleY: 1.07,
      scaleX: 0.99,
      transition: {
        type: 'spring',
        delay: i * 0.02,
        duration: 0.05,
        stiffness: 1000,
        damping: 20,
        restDelta: 0.001
      }
    }));
  };

  const handleHoverEnd = () => {
    circleControls.start((i) => ({
      scaleY: 1,
      scaleX: 1,
      transition: {
        type: 'spring',
        delay: i * 0.02,
        duration: 0.05,
        stiffness: 500,
        damping: 5,
        restDelta: 0.001
      }
    }));
  };

  return (
    <motion.button
      onClick={handleClick}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      className={classNames}
    >
      <div className='bouncybutton__circlewrapper'>
        <motion.svg viewBox='0 0 100 100' className='bouncybutton__circle'>
          <g style={{ transform: 'rotate(120deg)' }}>
            <motion.circle cx='50' cy='50' r='35' custom={0} animate={circleControls} />
          </g>
          <g style={{ transform: 'rotate(180deg)' }}>
            <motion.circle cx='50' cy='50' r='35' custom={1} animate={circleControls} />
          </g>
          <g style={{ transform: 'rotate(240deg)' }}>
            <motion.circle cx='50' cy='50' r='35' custom={2} animate={circleControls} />
          </g>
        </motion.svg>
      </div>
      {children}
    </motion.button>
  );
}
