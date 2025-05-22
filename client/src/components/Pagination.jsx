import React from 'react';
import { Links } from 'react-router-dom';
import { getPagination } from '../utils/helper';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = getPagination(currentPage, totalPages);

  return (
    <nav className='pagination'><ul className="pagination">
      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="dots">
            ...
          </span>
        ) : (
          <li
            key={index}
            className={`page-item ${page === currentPage ? "active" : ""}`}
            onClick={() => onPageChange(page)}
          >
            <span className='page-link'>{page}</span>
          </li>
        )
      )}
    </ul>
    </nav>
  );
};

export default Pagination;
