import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIResponse } from '@type/interfaces/props.interface';

export const graphiqlApi = createApi({
  reducerPath: 'graphiqlApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://rickandmortyapi.com/graphql',
  }),
  endpoints: (build) => ({
    searchByQuery: build.mutation<APIResponse, string>({
      query: (query) => ({
        url: '',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      }),
    }),
  }),
});

export const { useSearchByQueryMutation } = graphiqlApi;
