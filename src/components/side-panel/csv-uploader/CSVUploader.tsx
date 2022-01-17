
import { useCallback, useContext, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from "papaparse";
import "./csv-uploader.css"
import { ChartContext } from '../../../context/ChartContext';
import Button from '../../button/Button';

const CSVUploader = (): JSX.Element => {
    const { setData }: any = useContext(ChartContext);
    const [selectedFilename, setSelectedFilename] = useState('');

    const onDrop = useCallback((acceptedFiles) => {
        acceptedFiles.forEach((file: File) => {            
            validateData(file);
        })
    }, []);

    const {
        getRootProps,
        getInputProps,
        open
    } = useDropzone({
        onDrop,
        noClick: true,
        accept: '.csv',
        multiple: false,
    });

    const validateData = (data: File) => {
        Papa.parse(data, {
            worker: true,
            header: true,
            skipEmptyLines: true,
            dynamicTyping: true,
            complete: function (results) {
                if (results.errors && results.errors.length > 0) {
                    onFailure(results.errors[0].message);
                } else {
                    console.log("Finished:", results.data);
                    setSelectedFilename(data.name);               
                    setData(results.data);
                }
            },
        });
    };

    const onFailure = (error: string) => {
        console.log(error);
    };

    return (
        <div id="csv-uploader">
            <div {...getRootProps({ id: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>{"Drop CSV file"}</p>
            </div>
            <Button text={"Choose CSV file"} onClick={open}/>
            <label id="selected-filename" >{selectedFilename}</label>
        </div>

    );
};
export default CSVUploader;