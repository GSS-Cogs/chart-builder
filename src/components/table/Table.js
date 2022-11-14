import React, { useState } from "react";
import PropTypes from "prop-types";

import useTable from "../../hooks/useTable";
import styles from "./Table.module.css";
import TableFooter from "./TableFooter";

const Table = ({ headers, data, rowsPerPage }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(data, page, rowsPerPage);
  return (
    <>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.tableRowHeader}>
            <tr>
              {headers.map((head, index) => (
                <th className={styles.tableHeader} key={index}>
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slice.map((el, index) => (
              <tr className={styles.tableRowItems} key={index + "#"}>
                {el.map((col, index) => (
                  <td className={styles.tableCell} key={index + "##"}>
                    {col}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

Table.propTypes = {
  headers: PropTypes.any,
  data: PropTypes.any,
  rowsPerPage: PropTypes.number,
};

export default Table;
