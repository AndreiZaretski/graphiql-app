import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  getIntrospectionQuery,
  buildClientSchema,
  IntrospectionQuery,
} from 'graphql';
import { APIResponse, APIDocResponse } from '@type/interfaces/props.interface';

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
    getDocumentation: build.mutation({
      query: () => ({
        url: '',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: getIntrospectionQuery() }),
      }),
      transformResponse: (
        response: Record<'data', IntrospectionQuery>
      ): APIDocResponse => {
        const schema = buildClientSchema(response.data);
        console.log(schema);
        const schemaFields = schema['_queryType']['_fields'];
        const schemaTypes = schema['_typeMap'];
        const resultSchemaFieldsArr = [];
        const resultSchemaTypesArr = [];

        for (const key in schemaFields) {
          resultSchemaFieldsArr.push(schemaFields[key]);
        }

        for (const key in schemaTypes) {
          resultSchemaTypesArr.push(schemaTypes[key]);
        }
        return { fields: resultSchemaFieldsArr, types: resultSchemaTypesArr };
      },
    }),
  }),
});

export const { useSearchByQueryMutation, useGetDocumentationMutation } =
  graphiqlApi;
