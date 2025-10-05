import type { CSSProperties, ReactNode } from "react";
import styles from "./Tile.module.scss";

interface ITile {
  children: ReactNode;
  enableMarker?: boolean;
  style?: CSSProperties;
  className?: string;
}

const Tile = ({
  children,
  enableMarker = false,
  style,
  className = "",
}: ITile) => {
  const classes = `${styles.tile} ${
    enableMarker ? styles.marker : ""
  } ${className}`;
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};

export default Tile;
