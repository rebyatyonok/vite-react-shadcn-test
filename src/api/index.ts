import ky from "ky";

export type ListRequest<T> = {
  count: number;
  previous: string | null;
  next: string | null;
  results: T[];
};

export const client = ky.extend({
  prefixUrl: "https://swapi.dev/api/",
});
