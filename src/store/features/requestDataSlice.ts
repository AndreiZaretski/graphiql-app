import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppState } from '@store/store';

const initialrequestDataSliceState = {
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
};

export const requestSlice = createSlice({
  name: 'request',
  initialState: initialrequestDataSliceState,
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
  },
});

export const selectBaseUrl = (state: AppState) => state.request.baseUrl;

export const { setQuery, setVariables, setHeaders, setBaseUrl } =
  requestSlice.actions;
export default requestSlice.reducer;
