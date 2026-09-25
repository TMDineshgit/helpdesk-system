import { useMemo, useState } from 'react';

function usePagination(items = [], itemsPerPage = 5) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil(items.length / itemsPerPage)
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedItems = useMemo(() => {
    const startIndex =
      (safeCurrentPage - 1) * itemsPerPage;

    return items.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [items, safeCurrentPage, itemsPerPage]);

  const nextPage = () => {
    setCurrentPage((page) =>
      Math.min(page + 1, totalPages)
    );
  };

  const previousPage = () => {
    setCurrentPage((page) =>
      Math.max(page - 1, 1)
    );
  };

  const goToPage = (page) => {
    setCurrentPage(
      Math.min(Math.max(page, 1), totalPages)
    );
  };

  return {
    currentPage: safeCurrentPage,
    totalPages,
    paginatedItems,
    nextPage,
    previousPage,
    goToPage,
  };
}

export default usePagination;