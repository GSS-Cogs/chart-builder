import {ChartPropertySchema} from "../../../context/types";

export interface PropertyInputProps {
    property: ChartPropertySchema;
    sectionName: string;
    updateProperty: (sectionName: string, property: string, value: number | boolean | string) => void;
    value: number | string | boolean;
}