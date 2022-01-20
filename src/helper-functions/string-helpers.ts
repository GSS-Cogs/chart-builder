import { upperFirst, startCase } from "lodash";

const titleCase = (str: string) => {
    return str
        .toLowerCase()
        .split("_")
        .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
};

const camelToSentenceCase = (text: string) => {
    return upperFirst(startCase(text).toLowerCase());
};

export { titleCase, camelToSentenceCase };
