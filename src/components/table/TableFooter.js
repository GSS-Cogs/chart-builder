import React, { useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./TableFooter.module.css";

const TableFooter = ({ range, setPage, page, slice, totalResults }) => {
  useEffect(() => {}, []);
  // useEffect(() => {
  //   console.log("reloading footer: " + page);
  //   if (slice.length < 1 && page !== 1) {
  //     setPage(page - 1);
  //   }
  // }, [slice, page, setPage]);
  const buttonWidthStyle =
    range.length > 99 ? styles.buttonWideWidth : styles.buttonNormalWidth;

  const calculateResulstsPosition = () => {
    if (page === range.length) {
      let temp = 10 * page - 9 + " - " + (10 * (page - 1) + slice.length);
      return temp;
    } else {
      return 10 * page - 9 + " - " + 10 * page;
    }
  };

  const PAGINATION_LENGTH = 7;

  const rangeStart = () => {
    let start = range.length > 4 ? page - 3 : page;
    if (start < 0) {
      start = 0;
    }
    if (page > range.length - 4) {
      start -= 4 - (range.length - page);
    }
    if (start < 0) {
      start = 0;
    }
    return start;
  };

  const rangeEnd = () => {
    let end = page + 2;
    if (page < 6) {
      end = page + (7 - page);
    }
    return end;
  };

  const LeftPagination = () => {
    let lPaginationComponentArray = [];
    lPaginationComponentArray.push(
      <button
        className={`${styles.endButton} ${styles.inactiveButton}`}
        onClick={() => setPage(page - 1)}
        disabled={!(page > 1)}
        key={"#prev"}
      >
        {"< Prev"}
      </button>,
    );
    if (page > 3 && range.length > 7) {
      lPaginationComponentArray.push(
        <button
          className={`${styles.button} ${buttonWidthStyle} ${styles.inactiveButton}`}
          onClick={() => setPage(1)}
          key={"#left1"}
        >
          {"1"}
        </button>,
      );

      if (page === 5) {
        lPaginationComponentArray.push(
          <button
            className={`${styles.button} ${buttonWidthStyle} ${styles.inactiveButton}`}
            onClick={() => setPage(2)}
            key={"#left2"}
          >
            {"2"}
          </button>,
        );
      } else if (page > 5) {
        lPaginationComponentArray.push(
          <button
            className={`${styles.button} ${buttonWidthStyle} ${styles.inactiveButton}`}
            onClick={() => setPage(page - 3)}
            key={"#left..."}
          >
            {"..."}
          </button>,
        );
      }
    }
    return <>{lPaginationComponentArray}</>;
  };

  const RightPagination = () => {
    let rPaginationComponentArray = [];
    if (page < range.length - 2 && range.length > 7) {
      if (page === range.length - 4) {
        rPaginationComponentArray.push(
          <button
            className={`${styles.button} ${buttonWidthStyle} ${styles.inactiveButton}`}
            onClick={() => setPage(2)}
            key={"#rightsemifinal"}
          >
            {range.length - 1}
          </button>,
        );
      } else if (page < range.length - 4) {
        rPaginationComponentArray.push(
          <button
            className={`${styles.button} ${buttonWidthStyle} ${styles.inactiveButton}`}
            onClick={() => setPage(page + 3)}
            key={"#right..."}
          >
            {"..."}
          </button>,
        );
      }

      rPaginationComponentArray.push(
        <button
          className={`${styles.button} ${buttonWidthStyle} ${styles.inactiveButton}`}
          onClick={() => setPage(range.length)}
          key={"#rightfinal"}
        >
          {range.length}
        </button>,
      );
    }
    rPaginationComponentArray.push(
      <button
        className={`${styles.endButton} ${styles.inactiveButton}`}
        onClick={() => setPage(page + 1)}
        disabled={page === range.length}
        key={"#next"}
      >
        {"Next >"}
      </button>,
    );
    return rPaginationComponentArray;
  };

  return (
    <div className={styles.tableFooter}>
      <div>
        {range.length > 1 && (
          <>
            <LeftPagination />
            {range.slice(rangeStart(), rangeEnd()).map((el, index) => (
              <button
                key={index}
                className={`${styles.button} ${buttonWidthStyle} ${
                  page === el ? styles.activeButton : styles.inactiveButton
                }`}
                onClick={() => setPage(el)}
              >
                {el}
              </button>
            ))}
            <RightPagination />
          </>
        )}
      </div>
      <div className={styles.results}>
        Showing results {calculateResulstsPosition()}{" "}
        {range.length > 1 && " of " + totalResults + " results"}
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
