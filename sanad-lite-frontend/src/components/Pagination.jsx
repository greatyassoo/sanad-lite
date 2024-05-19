import React, { useState } from "react";

export default function Pagination({
    totalItems,
    itemsPerPage,
    currentPage,
    onPageChange,
}) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleClick = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
            onPageChange(newPage);
        }
    };

    const displayRange = 1;
    const pagesToShow = [];

    const startPage = Math.max(currentPage - displayRange, 1);
    const endPage = Math.min(currentPage + displayRange, totalPages);

    if (startPage > 2) {
        pagesToShow.push(1);
        if (startPage > 3) {
            pagesToShow.push("...");
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pagesToShow.push(i);
    }

    if (endPage < totalPages - 1) {
        if (endPage < totalPages - 2) {
            pagesToShow.push("...");
        }
        pagesToShow.push(totalPages);
    }

    return (
        <div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
            <button
                onClick={() => handleClick(currentPage - 1)}
                className={`${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    } text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
                disabled={currentPage === 1}
            >
                &lt;
            </button>

            {pagesToShow.map((page, index) => (
                <button
                    key={index}
                    onClick={() => {
                        if (typeof page === "number") {
                            handleClick(page);
                        }
                    }}
                    className={`${typeof page === "number"
                        ? currentPage === page
                            ? "bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white"
                            : "bg-transparent text-[#293241] hover:bg-slate-100"
                        : "text-[#293241]"
                        } px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => handleClick(currentPage + 1)}
                className={`${currentPage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                    }  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
}