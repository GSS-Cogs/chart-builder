import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

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

const CreateHeadersComponent = ({ arr }) => {
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

const CreateBodyComponent = ({ arr }) => {
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

const Table = ({ data, selectedColumns, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range, totalResults, headers } = useTable(
    data,
    selectedColumns,
    page,
    rowsPerPage,
  );

  useEffect(() => {}, []);

  return (
    <>
      <div
        className={styles.tableWrapper}
        style={{ minHeight: 45 + 43 * slice.length }}
      >
        <table className={styles.table}>
          {slice.length > 0 ? (
            <>
              <CreateHeadersComponent arr={headers} />
              <CreateBodyComponent arr={slice} />
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
};

CreateHeadersComponent.propTypes = {
  arr: PropTypes.any,
};

CreateBodyComponent.propTypes = {
  arr: PropTypes.any,
};

export default Table;
