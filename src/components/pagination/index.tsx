import React from "react";

type PaginationProps = {
  recordsPerPage: number;
  totalRecords: number;
  paginate: (page: number) => void;
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
  recordsPerPage,
  totalRecords,
  currentPage,
  ...props
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecords / recordsPerPage); i++) {
    pageNumbers.push(i);
  }

  const isLastPage = currentPage === pageNumbers[pageNumbers.length - 1];
  const isFirstPage = currentPage === pageNumbers[0];

  const handleNext = () => {
    if (!isLastPage) props.paginate(currentPage + 1);
  };

  const handlePrevious = () => {
    if (!isFirstPage) props.paginate(currentPage - 1);
  };

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <a className={isFirstPage ? "page-link no-drop" : 'page-link'} onClick={handlePrevious}>
            Previous
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={
              currentPage === number ? "page-item active" : "page-item"
            }
          >
            <a onClick={() => props.paginate(number)} className="page-link">
              {number}
            </a>
          </li>
        ))}
        <li className="page-item ">
          <a className={isLastPage ? "page-link no-drop" : 'page-link'} onClick={handleNext}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
