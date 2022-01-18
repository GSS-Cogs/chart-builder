// function to extract a vector from a matrix (i.e. an array column from 2D array))
const arrayColumn = (arr: [], key: string) => arr.map((x) => x[key]);

export { arrayColumn };