import * as React from "react";
import { animated, config, useSpring } from "react-spring";
import styles from "./Layout.module.scss";

interface IProps {
  children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
  // Animation for block1 - comes from right side (100vw) to its final position (0)
  const block1Animation = useSpring({
    from: { transform: "translateX(100vw)" },
    to: { transform: "translateX(0%)" },
    delay: 600,
    config: {
      ...config.wobbly,
      mass: 10,
      tension: 200,
      friction: 100,
    },
  });

  // Animation for block2 - comes from top (-100vh) to its final position (0)
  const block2Animation = useSpring({
    from: { transform: "translateY(-100vh)" },
    to: { transform: "translateY(0px)" },
    delay: 800,
    config: {
      ...config.wobbly,
      mass: 10,
      tension: 200,
      friction: 100,
    },
  });

  // Animation for block3 - comes from left side (-100vw) to its final position (0)
  const block3Animation = useSpring({
    from: { transform: "translateX(-100vw)" },
    to: { transform: "translateX(0%)" },
    delay: 1000,
    config: {
      ...config.wobbly,
      mass: 10,
      tension: 200,
      friction: 100,
    },
  });

  // Animation for block4 - comes from bottom (100vh) to its final position (0)
  const block4Animation = useSpring({
    from: { transform: "translateY(100vh)" },
    to: { transform: "translateY(0px)" },
    delay: 1200,
    config: {
      ...config.wobbly,
      mass: 10,
      tension: 200,
      friction: 100,
    },
  });

  return (
    <div className={styles.layout}>
      <div className={styles.container}>{children}</div>
      <animated.div
        style={block1Animation}
        className={styles.block1}
      ></animated.div>
      <animated.div
        style={block2Animation}
        className={styles.block2}
      ></animated.div>
      <animated.div
        style={block3Animation}
        className={styles.block3}
      ></animated.div>
      <animated.div
        style={block4Animation}
        className={styles.block4}
      ></animated.div>
    </div>
  );
};

export default Layout;
