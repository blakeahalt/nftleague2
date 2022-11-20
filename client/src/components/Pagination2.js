import React from 'react';

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage }) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            {pages.map((page, index) => {
                return (
                    <button
                        className="button-pagination button-days"
                        style={{ width: 60, padding: 10 }}
                        key={index}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                );
            })}
        </div>
    );
};

export default Pagination;
