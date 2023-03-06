import type { CSSProperties, ReactNode } from 'react';
import React from 'react';
import styles from './Tile.module.scss';

interface ITile {
  children: ReactNode;
  enableMarker?: boolean;
  style?: CSSProperties;
}

const Tile = ({ children, enableMarker = false, style }: ITile) => {
  const classes = `${styles.tile} ${enableMarker ? styles.marker : ''}`;
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};

export default Tile;
