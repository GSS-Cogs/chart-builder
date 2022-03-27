import upperFirst from "lodash/upperFirst";
import startCase from "lodash/startCase";

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

const toSafeFilename = (text: string): string =>
  text.replace(/[^a-zA-Z0-9]/g, "_");

export { titleCase, camelToSentenceCase, toSafeFilename };
