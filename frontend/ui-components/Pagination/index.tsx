import React, { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

interface PaginationProps {
  itemsPerPage: number;
  toggleCurrentPage: (page: number) => void;
  totalCount: number;
}

export const Pagination: FC<PaginationProps> = React.memo(
  ({ itemsPerPage, totalCount, toggleCurrentPage }) => {
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageClick = (data: any) => {
      setCurrentPage(data.selected + 1);
    };

    useEffect(() => {
      toggleCurrentPage(currentPage);
    }, [currentPage, toggleCurrentPage]);

    useEffect(() => {
      setPageCount(Math.ceil(totalCount / itemsPerPage));
    }, [itemsPerPage, totalCount]);

    return (
      <>
        <ReactPaginate
          breakLabel='...'
          nextLabel='Next'
          pageRangeDisplayed={4}
          marginPagesDisplayed={1}
          onPageChange={handlePageClick}
          pageCount={pageCount}
          previousLabel='Previous'
          containerClassName={styles.pagination}
          pageClassName={styles.paginationItem}
          disabledClassName={styles.paginationBtnDisabled}
          pageLinkClassName={styles.paginationItemLink}
          previousClassName={styles.paginationBtn}
          previousLinkClassName={styles.paginationBtnLink}
          nextClassName={styles.paginationBtn}
          nextLinkClassName={styles.paginationBtnLink}
          breakClassName={styles.paginationBreak}
          activeClassName={styles.paginationItemActive}
        />
      </>
    );
  }
);
Pagination.displayName = 'Pagination';
