
import CSVUploader from "./csv-uploader/CSVUploader";
import "./side-panel.css";

const chartProperties: string[] = [
    "Example property placeholder 1",
    "Example property placeholder 2",
    "Example property placeholder 3",
    "Example property placeholder 4",
    "Example property placeholder 5",
    "Example property placeholder 6"
]

const handleOnChange =() =>
{
    console.log("checkboxselected");
}

const SidePanel = (): JSX.Element => {
    return (
        <div id="side-panel">
            <p id="data-source">Data Source</p>           
            <CSVUploader/>
            <br />
            <br />

            <h3>Select Chart Properties</h3>
            {chartProperties.map((item, index) => (
                <div id={"chartProperty" + index} key={"chartProperty" + index}>
                    <input type="checkbox" id={"chartProperty" + index} name={item} value={item}
                        onChange={handleOnChange} /> {item}
                    <br />
                </div>
            ))}
        </div>
    );
};
export default SidePanel;