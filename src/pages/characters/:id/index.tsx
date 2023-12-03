import { useQuery } from "react-query";

import charactersApi from "@/api/characters";
import { Skeleton } from "@/components/ui/skeleton";
import { CharacterForm, CharacterFormProps } from "@/features/character-form";

type CharacterPageProps = {
  id: number;
};

export function CharacterPage(props: CharacterPageProps) {
  const characterRequest = useQuery(
    ["character", props.id],
    () => charactersApi.getById(props.id),
    { keepPreviousData: true, staleTime: Infinity }
  );

  const onSubmit: CharacterFormProps["onSubmit"] = (data) => {
    debugger;
    console.log(data);
  };

  return (
    <section className="w-full max-w-[800px] mx-auto">
      {characterRequest.isFetching ? (
        <Skeleton className="w-full h-10" />
      ) : characterRequest.data ? (
        <section className="page max-width w-full">
          <h1 className="text-4xl text-center">{characterRequest.data.name}</h1>

          <CharacterForm
            character={characterRequest.data}
            onSubmit={onSubmit}
          />
        </section>
      ) : (
        <section className="page max-width w-full">
          <h1 className="text-4xl text-center">Something went wrong</h1>
        </section>
      )}
    </section>
  );
}
