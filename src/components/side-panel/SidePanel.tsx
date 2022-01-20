import { useContext } from "react";
import { ChartContext } from "../../context/ChartContext";
import CSVUploader from "./csv-uploader/CSVUploader";
import { camelToSentenceCase } from "../../helper-functions/string-helpers";
import "./side-panel.css";

const SidePanel = (): JSX.Element => {
    const { chartProperties, setChartProperties }: any =
        useContext(ChartContext);

    const onCheckboxChange = (e: any) => {
        const { value: property, checked: value } = e.target;
        setChartProperties({
            ...chartProperties,
            [property]: value,
        });
    };

    const onTextChange = (e: any) => {
        const { name: property, value } = e.target;
        setChartProperties({
            ...chartProperties,
            [property]: value,
        });
    };

    const getCheckbox = (
        key: string,
        value: boolean,
        index: number,
        onCheckboxChange: any,
    ) => {
        return (
            <div className="chart-property" key={key}>
                <input
                    type="checkbox"
                    className="checkbox"
                    id={"chartProperty" + index}
                    name={key}
                    value={key}
                    checked={value}
                    onChange={onCheckboxChange}
                />
                <label className="label" htmlFor={"chartProperty" + index}>
                    {camelToSentenceCase(key)}
                </label>
            </div>
        );
    };

    const getTextbox = (
        key: string,
        value: string,
        index: number,
        handleOnTextChange: any,
    ) => {
        return (
            <div className="chart-property" key={key}>
                <label className="label" htmlFor={"chartProperty" + index}>
                    {camelToSentenceCase(key)}:&nbsp;
                </label>
                <div className="property-textbox" key={key}>
                    <input
                        className="textbox"
                        id={"chartProperty" + index}
                        name={key}
                        value={value}
                        onChange={handleOnTextChange}
                    />
                </div>
            </div>
        );
    };

    return (
        <div id="side-panel">
            <p id="data-source">Data Source</p>
            <CSVUploader />

            <h3>Configure the Chart</h3>
            {Object.entries(chartProperties).map(([key, value], index) => {
                if (typeof value === "boolean") {
                    return getCheckbox(key, value, index, onCheckboxChange);
                } else if (typeof value === "string") {
                    return getTextbox(key, value, index, onTextChange);
                }
            })}
        </div>
    );
};
export default SidePanel;
