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

  const rangeStart = () => {
    let start = page - 3;
    if (start < 0) {
      start = 0;
    } else if (start >= range.length - 4) {
      start = range.length - 5;
    }
    return start;
  };

  const rangeEnd = () => {
    let end = page + 2;
    if (page < 3) {
      end += 3 - page;
    }
    return end;
  };

  return (
    <div className={styles.tableFooter}>
      <div>
        {page > 1 && (
          <button
            className={`${styles.button} ${styles.inactiveButton}`}
            onClick={() => setPage(page - 1)}
          >
            {"< Prev"}
          </button>
        )}
        {range.slice(rangeStart(), rangeEnd()).map((el, index) => (
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
  range: PropTypes.array,
  setPage: PropTypes.any,
  page: PropTypes.number,
  slice: PropTypes.any,
  totalResults: PropTypes.number,
};

export default TableFooter;
