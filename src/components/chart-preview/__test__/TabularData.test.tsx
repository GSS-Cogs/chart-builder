import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
// import configureStore from "redux-mock-store";
// import { Provider } from "react-intl-redux";

import TabularData from "../TabularData";
import { multipleSeriesChartDefinition } from "./data/multipleSeriesChartDefinition";
import { mapChartDefinition } from "./data/mapChartDefinition";

describe("TabularData", () => {
  it("renders the TabularData component", () => {
    const data = multipleSeriesChartDefinition;
    const selectedColumns = ["week_starting"];
    const component = render(
      <TabularData chartDefinition={data} selectedColumns={selectedColumns} />,
    );
    const json = component.container;
    expect(json).toMatchSnapshot();
  });

  it("renders the TabularData component and scrolls through pagination pages", () => {
    const data = multipleSeriesChartDefinition;
    const selectedColumns = ["week_starting"];
    const component = render(
      <TabularData chartDefinition={data} selectedColumns={selectedColumns} />,
    );

    for (let i = 2; i <= 5; i++) {
      const button = screen.getByText(i.toString());
      fireEvent.click(button);

      const json = component.container;
      expect(json).toMatchSnapshot();
    }
  });

  it("renders the TabularData component with given map chartDefintion data", () => {
    const data = mapChartDefinition;
    const selectedColumns = [""];
    const component = render(
      <TabularData chartDefinition={data} selectedColumns={selectedColumns} />,
    );
    let json = component.container;
    expect(json).toMatchSnapshot();

    const button = screen.getByText("38");
    fireEvent.click(button);

    json = component.container;
    expect(json).toMatchSnapshot();
  });
});
