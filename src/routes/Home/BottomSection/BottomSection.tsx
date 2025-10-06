import React from "react";
import { type TabKeys } from "../Home";
import "./BottomSection.scss";

interface IProps {
  activeKey: TabKeys;
  setActiveKey: React.Dispatch<React.SetStateAction<TabKeys>>;
}

const BottomSection: React.FC<IProps> = ({ activeKey, setActiveKey }) => {
  return (
    <div className={"BottomSection"}>
      <svg preserveAspectRatio="none" className={"svg"} viewBox="0 0 20 5">
        <filter id="blurMe">
          <feGaussianBlur stdDeviation=".04" />
        </filter>
        <filter id="blurBorder">
          <feGaussianBlur stdDeviation=".04" />
        </filter>
        <g transform="translate(0,1)">
          <path
            strokeWidth=".1px"
            fill="#0d1633"
            stroke="#141c5a"
            strokeLinejoin="round"
            filter="url(#blurBorder)"
            d="m 5 4 l 1 -4 l 8 0 l 1 4"
          />
        </g>
        <g transform="translate(0,1)">
          <path className={"animatedMiddle"} d="m 5 4 l 1 -4 l 8 0 l 1 4" />
          <path className={"animatedLeft"} d="m 5 4 l 1 -4 l 8 0 l 1 4" />
          <path className={"animatedRight"} d="m 5 4 l 1 -4 l 8 0 l 1 4" />
        </g>
      </svg>
    </div>
  );
};

const MemoizedBottomSection = React.memo(BottomSection);

export default MemoizedBottomSection;
