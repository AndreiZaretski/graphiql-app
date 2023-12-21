import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedType: '',
  openTypes: false,
  openQueries: false,
};

export const documentationSlice = createSlice({
  name: 'documentation',
  initialState: initialState,
  reducers: {
    setOpenTypes: (state, action) => {
      state.openTypes = action.payload;
    },
    setOpenQueries: (state, action) => {
      state.openQueries = action.payload;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
  },
});

export const { setOpenQueries, setOpenTypes, setSelectedType } =
  documentationSlice.actions;
export default documentationSlice.reducer;
