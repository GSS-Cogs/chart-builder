import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";
import { getIsIntervalData } from "../../helper-functions/chart-helpers";

const FakeTable = () => (
  <tbody>
    <tr className={styles.tableRowItems}>
      <td className={styles.tableCell}></td>
    </tr>
    <tr className={styles.tableRowItems}>
      <td className={styles.tableCell}></td>
    </tr>
    <tr className={styles.tableRowItems}>
      <td className={styles.tableCell}></td>
    </tr>
    <tr className={styles.tableRowItems}>
      <td className={styles.tableCell}></td>
    </tr>
    <tr className={styles.tableRowItems}>
      <td className={styles.tableCell}></td>
    </tr>
    <tr className={styles.tableRowItems}>
      <td className={styles.tableCell}></td>
    </tr>
    <tr className={styles.tableRowItems}>
      <td className={styles.tableCell}></td>
    </tr>
    <tr className={styles.tableRowItems}>
      <td className={styles.tableCell}></td>
    </tr>
    <tr className={styles.tableRowItems}>
      <td className={styles.tableCell}></td>
    </tr>
    <tr className={styles.tableRowItems}>
      <td className={styles.tableCell}></td>
    </tr>
  </tbody>
);

const FakeTableHeader = () => (
  <thead className={styles.tableRowHeader}>
    <tr>
      <th className={styles.tableHeader} />
    </tr>
  </thead>
);

const getTableHeaderComponent = (arr, data) => {
  if (data[0].type !== "line") {
    // return basic header if the chart isn't a line chart
    return <TableHeadersComponent arr={arr} />;
  }
  if (data.length === 1 || getIsIntervalData(data) !== true) {
    // return basic header component if there's no interval data
    // interval data is set to type scatter
    return <TableHeadersComponent arr={arr} />;
  }
  // if the chart type is line and confidence intervals are displayed then return alternative header component
  return <TableHeadersLineChartComponent arr={arr} data={data} />;
};

const TableHeadersComponent = ({ arr }) => {
  const [head, setHead] = useState(null);
  useEffect(() => {
    const temp =
      arr.length > 1
        ? arr.map((head, index) => (
            <th className={styles.tableHeader} key={index}>
              {head}
            </th>
          ))
        : null;
    setHead(temp);
  }, [arr]);

  return (
    <thead className={styles.tableRowHeader}>
      <tr>{head}</tr>
    </thead>
  );
};

const TableHeadersLineChartComponent = ({ arr, data }) => {
  const [head, setHead] = useState(null);
  const tempData = [{}].concat(data);
  useEffect(() => {
    const temp =
      arr.length > 1
        ? arr.map((head, index) => (
            <th
              className={styles.tableHeader__lineChart}
              key={index}
              colSpan={tempData[index]?.confidence ? "2" : "1"}
              style={{
                textAlign: tempData[index]?.confidence ? "center" : "",
              }}
            >
              {head}
            </th>
          ))
        : null;
    setHead(temp);
  }, [arr]);

  return (
    <thead className={styles.tableRowHeader}>
      <tr>{head}</tr>
      <tr>
        {arr.map((h, i) => {
          if (tempData[i]?.confidence === true) {
            return (
              <>
                <th className={styles.tableSubHeader} colSpan="1">
                  Lower
                </th>
                <th className={styles.tableSubHeader} colSpan="1">
                  Upper
                </th>
              </>
            );
          } else {
            return <th className={styles.tableSubHeader} colSpan="1"></th>;
          }
        })}
      </tr>
    </thead>
  );
};

const TableBodyComponent = ({ arr }) => {
  const [body, setBody] = useState(null);
  useEffect(() => {
    const temp =
      arr.length > 0
        ? arr.map((el, index) => (
            <tr className={styles.tableRowItems} key={index + "#"}>
              {el.map((col, index) => (
                <td className={styles.tableCell} key={index + "##"}>
                  {col}
                </td>
              ))}
            </tr>
          ))
        : null;
    setBody(temp);
  }, [arr]);

  return <tbody>{body}</tbody>;
};

const Table = ({ data, selectedColumns, rowsPerPage, chartType }) => {
  const [page, setPage] = useState(1);
  const { slice, range, totalResults, headers } = useTable(
    data,
    selectedColumns,
    page,
    rowsPerPage,
    chartType,
  );

  useEffect(() => {}, []);

  if (data.length === 0) {
    return (
      <div className={styles.tableWrapper}>
        <div className={styles.table}>
          <div className={styles.emptyTableText}>No chart data selected</div>
          <div className={styles.emptyTableSubText}>
            Have you got all filters turned on?
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          {slice.length > 0 ? (
            <>
              {getTableHeaderComponent(headers, data)}
              <TableBodyComponent arr={slice} />
            </>
          ) : (
            <>
              <FakeTableHeader />
              <FakeTable />
            </>
          )}
        </table>
      </div>
      <TableFooter
        range={range}
        slice={slice}
        setPage={setPage}
        page={page}
        totalResults={totalResults}
      />
    </>
  );
};

Table.propTypes = {
  selectedColumns: PropTypes.any,
  data: PropTypes.any,
  rowsPerPage: PropTypes.number,
  chartType: PropTypes.string,
};

TableHeadersComponent.propTypes = {
  arr: PropTypes.any,
};

TableHeadersLineChartComponent.propTypes = {
  arr: PropTypes.any,
  data: PropTypes.any,
};

TableBodyComponent.propTypes = {
  arr: PropTypes.any,
};

export default Table;
