import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";

import peoplesApi from "@/api/characters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CharacterCard,
  CharacterCardSkeleton,
} from "@/features/character-card";

function useDebouncedValue<T>(value: T, time = 250) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, time);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, time]);

  return debounceValue;
}

function usePagination(pageSize = 10) {
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

export function CharactersListPage() {
  const [name, setName] = useState("");
  const pagination = usePagination(10);
  const debouncedName = useDebouncedValue(name);

  const peoplesRequest = useQuery(
    ["characters", pagination.page + debouncedName],
    ({ signal }) =>
      peoplesApi.getList({ page: pagination.page, search: name }, { signal }),
    { keepPreviousData: true, staleTime: Infinity }
  );

  useEffect(() => {
    if (peoplesRequest.data) {
      pagination.setTotal(peoplesRequest.data.count);
    }
  }, [peoplesRequest.data]);

  useEffect(() => {
    peoplesRequest.refetch();
  }, [debouncedName]);

  return (
    <section className="page max-width w-full flex flex-col items-center gap-4">
      <div className="flex gap-4 justify-end w-full">
        <Input
          placeholder="Search hero by name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button
          size="sm"
          disabled={!pagination.canGoToPrevPage || peoplesRequest.isFetching}
          onClick={() => pagination.toPrevPage()}
        >
          Previous
        </Button>

        <Button
          size="sm"
          disabled={!pagination.canGoToNextPage || peoplesRequest.isFetching}
          onClick={() => pagination.toNextPage()}
        >
          Next
        </Button>
      </div>

      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {peoplesRequest.isFetching ? (
          Array.from({ length: pagination.pageSize }).map((_, i) => (
            <CharacterCardSkeleton key={i} />
          ))
        ) : peoplesRequest.data ? (
          peoplesRequest.data.results.map((character) => (
            <CharacterCard key={character.name} character={character} />
          ))
        ) : (
          <h4 className="col-span-2">Something went wrong</h4>
        )}
      </div>
    </section>
  );
}
