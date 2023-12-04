import { useEffect, useMemo, useState } from "react";

export function usePagination(pageSize = 10) {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const canGoToNextPage = useMemo(
    () => total - pageSize * page > 0,
    [total, pageSize, page]
  );
  const canGoToPrevPage = useMemo(() => page > 1, [page]);

  const toNextPage = () => {
    if (canGoToNextPage) setPage((page) => page + 1);
  };
  const toPrevPage = () => {
    if (canGoToPrevPage) setPage((page) => page - 1);
  };

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  return {
    page,
    total,
    canGoToNextPage,
    canGoToPrevPage,
    pageSize,
    toNextPage,
    toPrevPage,
    setTotal,
  };
}
