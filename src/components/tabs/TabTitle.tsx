import React from "react";

type Props = {
  title: string;
  index: number;
  currIndex: number;
  setSelectedTab: (index: number) => void;
};

const TabTitle: React.FC<Props> = ({
  title,
  setSelectedTab,
  index,
  currIndex,
}) => {
  const style =
    index === currIndex
      ? { borderBottom: "3px solid #1D70B8", fontWeight: "bold" }
      : null;

  return (
    <li style={{ width: 180 }} className="non-content">
      <button
        onClick={() => setSelectedTab(index)}
        style={{
          textAlign: "center",
          color: "#1D70B8",
          ...style,
        }}
        className="tab-button"
      >
        {title}
      </button>
    </li>
  );
};

export default TabTitle;
