import { useEffect, useState } from "react";
import { useQuery } from "react-query";

import peoplesApi from "@/api/characters";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CharacterCard,
  CharacterCardSkeleton,
} from "@/features/character-card";

import { usePagination } from "@/hooks/usePagination";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

export function CharactersListPage() {
  // TODO: sync state to url
  const [name, setName] = useState("");
  const pagination = usePagination(10);
  const debouncedName = useDebouncedValue(name);

  const peoplesRequest = useQuery(
    ["characters", pagination.page + debouncedName],
    ({ signal }) =>
      peoplesApi.getList(
        { page: pagination.page, search: debouncedName },
        { signal }
      ),
    { keepPreviousData: true }
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
