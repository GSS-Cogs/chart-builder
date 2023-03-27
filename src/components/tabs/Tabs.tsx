import React, { ReactElement, useState } from "react";
import TabTitle from "./TabTitle";
import DataLink from "../button/DataLink";

type Props = {
  link: string;
  children: ReactElement[];
};

const Tabs: React.FC<Props> = ({ link, children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <ul
        style={{
          marginBottom: 40,
          display: "flex",
          flexDirection: "row",
          listStyle: "none",
        }}
      >
        {children.map((item, index) => (
          <TabTitle
            key={index}
            title={item.props.title}
            index={index}
            currIndex={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
        <DataLink text={"Explore the data"} link={link} />
      </ul>
      {children[selectedTab]}
    </div>
  );
};

export default Tabs;
