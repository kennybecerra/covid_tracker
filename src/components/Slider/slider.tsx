import * as React from 'react';
import { useTransition, animated, config } from 'react-spring';
import styles from './slider.module.scss';

interface SliderProps {
  children: JSX.Element | JSX.Element[];
  index: number;
}

const Slider: React.FC<SliderProps> = ({ children, index }) => {
  //Calculate total number of slides
  const count = React.useMemo(() => {
    return React.Children.count(children);
  }, []);

  // Keep prevIndex to calculate direction of slide
  const prevIndex = React.useRef(index);

  // all Slides
  const slides = React.useMemo(() => {
    return React.Children.map(children, (child: React.ReactElement) => {
      return ({ style }) => {
        return (
          <animated.div className={styles.slide} style={style}>
            {React.cloneElement(child, {}, child.props.children)}
          </animated.div>
        );
      };
    });
  }, []);

  const transition = useTransition(index % count, {
    from: (slideIndex) => {
      return {
        opacity: slideIndex === prevIndex.current ? 1 : 0,
        x:
          slideIndex === prevIndex.current
            ? '0%'
            : slideIndex > prevIndex.current
            ? '100%'
            : '-100%',
      };
    },
    enter: {
      opacity: 1,
      x: '0%',
    },
    leave: (slideIndex) => {
      return {
        opacity: 0,
        x: slideIndex < index % count ? '-100%' : '100%',
      };
    },
    config: config.slow,
    onStart: () => {
      // Update previndex , onStart function runs after from prps have been calculated
      // has been calcualted, on every interation
      prevIndex.current = index;
    },
  });

  return (
    <div className={styles.slider}>
      {transition((style, item, t, i) => {
        const Slide = slides[item];
        return <Slide style={style} />;
      })}
    </div>
  );
};

const MemoizedSlider = React.memo(Slider);

export { MemoizedSlider as Slider };
