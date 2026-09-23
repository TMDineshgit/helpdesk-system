import { useMemo, useState } from 'react';

function usePagination(items = [], itemsPerPage = 3) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1,Math.ceil(items.length / itemsPerPage),);

  const paginatedItems = useMemo(() => {
    const startIndex =
      (currentPage - 1) * itemsPerPage;

    const endIndex =
      startIndex + itemsPerPage;

    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  const nextPage = () => {
    setCurrentPage((page) =>
      Math.min(page + 1, totalPages),
    );
  };

  const previousPage = () => {
    setCurrentPage((page) =>
      Math.max(page - 1, 1),
    );
  };

  const goToPage = (page) => {
    setCurrentPage(
      Math.min(Math.max(page, 1), totalPages),
    );
  };

  return {
    currentPage,
    totalPages,
    paginatedItems,
    nextPage,
    previousPage,
    goToPage,
  };
}

export default usePagination;