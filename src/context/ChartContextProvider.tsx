import { ChartContext } from "./ChartContext";
import { useState, useEffect, ReactNode } from "react";
import { titleCase } from "../helper-functions/string-helpers";
import { arrayColumn } from "../helper-functions/array-helpers";

interface Props {
    children: ReactNode;
}

// array of colors for each series
const colors = ["#a05195", "#f95d6a", "#ffa600", "#003f5c"];

const section1 = {
    name: "section1",
    properties: [
        {
            name: "showTitle",
            displayname: "Show Title",
            displayType: "checkbox",
            value: true,
        },
        {
            name: "showGridLines",
            displayname: "Show Grid Lines",
            displayType: "checkbox",
            value: true,
        },
    ],
};
export const initialChartProperties = [section1];
console.log(initialChartProperties);
// export const initialChartProperties = {
//     showTitle: true,
//     title: "Covid-19 Triple Vaccination by UK Nation",
//     xAxisTickAngle: ["0", "45", "90", "?"],
// };

const ChartContextProvider = ({ children }: Props): JSX.Element => {
    const [data, setData] = useState([]);
    const [chartDefinition, setChartDefinition] = useState({});
    const [chartProperties, setChartProperties] = useState(
        initialChartProperties,
    );

    useEffect(() => {
        if (data.length === 0) {
            setChartDefinition({});
            return;
        }
        updateChartDefinition(data);
    }, [data, chartProperties]);

    const updateChartDefinition = (data: any) => {
        const chartData = [];
        const colNames = Object.keys(data[0]);
        const xValues = arrayColumn(data, colNames[0]);

        // iterate over the data columns to build up the traces (series) for the chart.
        // we ignore the first column which is for the x-axis values
        for (let index = 1; index < colNames.length; index++) {
            chartData.push({
                x: xValues,
                y: arrayColumn(data, colNames[index]),
                name: titleCase(colNames[index]),
                type: "scatter",
                mode: "lines",
                line: {
                    color: colors[index - 1],
                },
            });
        }

        const layout = {
            //title: chartProperties.showTitle ? chartProperties.title : "",
            xaxis: {
                //showgrid: chartProperties.showGridLines,
                //title: chartProperties.xAxisTitle,
                // tickangle: chartProperties.xAxisTickAngle,
            },
            yaxis: {
                // showgrid: chartProperties.showGridLines,
                // title: chartProperties.yAxisTitle,
            },
            // paper_bgcolor: chartProperties.chartBackgroundColour,
            //plot_bgcolor: chartProperties.chartBackgroundColour,
            //showlegend: chartProperties.showLegend,
        };

        const config = { responsive: true };

        setChartDefinition({ data: chartData, layout, config });
    };

    return (
        <ChartContext.Provider
            value={{
                setData,
                chartDefinition,
                chartProperties,
                setChartProperties,
            }}
        >
            {children}
        </ChartContext.Provider>
    );
};

export default ChartContextProvider;
