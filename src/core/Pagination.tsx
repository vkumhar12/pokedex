// Pagination.tsx
import React from "react";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  setPage,
  totalPages,
}) => {
  const handlePreviousPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="flex justify-center mt-8 space-x-4">
      <button
        onClick={handlePreviousPage}
        disabled={page === 1}
        className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors disabled:bg-gray-300"
      >
        Previous
      </button>
      <button
        onClick={handleNextPage}
        disabled={page === totalPages}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
      >
        Next
      </button>
    </div>
  );
};
