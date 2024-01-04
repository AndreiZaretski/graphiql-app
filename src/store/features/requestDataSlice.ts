import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppState } from '@store/store';

const initialRequest = {
  query: `query Query {
    characters(page: 2, filter: { name: "Morty" }) {
      info {
        count
      }
      results {
        name
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }`,
  variables: '',
  headers: '',
  baseUrl: 'https://rickandmortyapi.com/graphql',
  validHeaderJson: false,
  validVariableJson: false,
};

export const requestSlice = createSlice({
  name: 'request',
  initialState: initialRequest,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setVariables: (state, action: PayloadAction<string>) => {
      state.variables = action.payload;
    },
    setHeaders: (state, action: PayloadAction<string>) => {
      state.headers = action.payload;
    },
    setBaseUrl: (state, action: PayloadAction<string>) => {
      state.baseUrl = action.payload;
    },
    setValidHeaderJson: (state, action: PayloadAction<boolean>) => {
      state.validHeaderJson = !action.payload;
    },
    setValidVariableJson: (state, action: PayloadAction<boolean>) => {
      state.validVariableJson = !action.payload;
    },
  },
});

export const selectBaseUrl = (state: AppState) => state.request.baseUrl;

export const {
  setQuery,
  setVariables,
  setHeaders,
  setBaseUrl,
  setValidHeaderJson,
  setValidVariableJson,
} = requestSlice.actions;
export default requestSlice.reducer;
