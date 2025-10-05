import { Spin } from "antd";
import type { CSSProperties, ReactNode } from "react";
import styles from "./Tile.module.scss";

interface ITile {
  children: ReactNode;
  enableMarker?: boolean;
  style?: CSSProperties;
  className?: string;
  isLoading?: boolean;
}

const Tile = ({
  children,
  enableMarker = false,
  style,
  className = "",
  isLoading = false,
}: ITile) => {
  const classes = `${styles.tile} ${
    enableMarker ? styles.marker : ""
  } ${className}`;
  return (
    <div className={classes} style={style}>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Spin size="large" />
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Tile;
