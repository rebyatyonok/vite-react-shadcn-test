import { Options } from "ky";
import { ListRequest, client } from ".";

export type Character = {
  name: string;
  birth_year: string;
  height: number;
  eye_color: string;
  gender: string;
  url: string;

  // ... and more fields
};

export type CharactersGetListRequest = {
  page: number;
  search?: string;
};

export type CharactersGetListResponse = ListRequest<Character>;

export default {
  getList: async (
    params: CharactersGetListRequest,
    options?: Options
  ): Promise<CharactersGetListResponse> => {
    // @ts-expect-error ts wants us to cast params.page to string
    const queryParams = new URLSearchParams(params);

    try {
      return await client.get(`people?${queryParams}`, options).json();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  getById: async (id: number, options?: Options): Promise<Character> => {
    try {
      return await client.get(`people/${id}`, options).json();
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
