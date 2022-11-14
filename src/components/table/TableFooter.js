import React, { useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./TableFooter.module.css";

const TableFooter = ({ range, setPage, page, slice, totalResults }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);

  const calculateResulstsPosition = () => {
    if (page === range.length) {
      let temp = 10 * page - 9 + " - " + (10 * (page - 1) + slice.length);
      return temp;
    } else {
      return 10 * page - 9 + " - " + 10 * page;
    }
  };

  return (
    <div className={styles.tableFooter}>
      <div>
        {page > 1 && (
          <button
            className={`${styles.button} ${styles.inactiveButton}`}
            onClick={() => setPage(page - 1)}
          >
            {"< Previous"}
          </button>
        )}
        {range.map((el, index) => (
          <button
            key={index}
            className={`${styles.button} ${
              page === el ? styles.activeButton : styles.inactiveButton
            }`}
            onClick={() => setPage(el)}
          >
            {el}
          </button>
        ))}
        {page < range.length && (
          <button
            className={`${styles.button} ${styles.inactiveButton}`}
            onClick={() => setPage(page + 1)}
          >
            {"Next >"}
          </button>
        )}
      </div>
      <div className={styles.results}>
        Showing results {calculateResulstsPosition()} of {totalResults} results
      </div>
    </div>
  );
};

TableFooter.propTypes = {
  range: PropTypes.number,
  setPage: PropTypes.any,
  page: PropTypes.number,
  slice: PropTypes.any,
  totalResults: PropTypes.number,
};

export default TableFooter;
