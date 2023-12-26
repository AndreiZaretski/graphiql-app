import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { APIResponse, RequestParams } from '@type/interfaces/props.interface';
import { getIntrospectionQuery, IntrospectionQuery } from 'graphql';

export const graphiqlApi = createApi({
  reducerPath: 'graphiqlApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (build) => ({
    searchByQuery: build.mutation<APIResponse, RequestParams>({
      query: (params: RequestParams) => ({
        url: params.baseUrl,
        method: 'POST',
        body: JSON.stringify({
          query: params.query,
          variables: params.variables || '',
        }),
        headers: params.headers,
      }),
    }),
    getDocumentation: build.mutation({
      query: (baseUrl: string) => ({
        url: baseUrl,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: getIntrospectionQuery() }),
      }),
      transformResponse: (response: Record<'data', IntrospectionQuery>) => {
        const schema = response.data.__schema;
        return schema;
      },
    }),
  }),
});

export const { useSearchByQueryMutation, useGetDocumentationMutation } =
  graphiqlApi;
