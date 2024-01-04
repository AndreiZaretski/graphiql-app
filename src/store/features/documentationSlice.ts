import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedType: '',
  openTypes: false,
  openQueries: false,
};

export const documentationSlice = createSlice({
  name: 'documentation',
  initialState: initialState,
  reducers: {
    setOpenTypes: (state, action: PayloadAction<boolean>) => {
      state.openTypes = action.payload;
    },
    setOpenQueries: (state, action: PayloadAction<boolean>) => {
      state.openQueries = action.payload;
    },
    setSelectedType: (state, action: PayloadAction<string>) => {
      state.selectedType = action.payload;
    },
  },
});

export const { setOpenQueries, setOpenTypes, setSelectedType } =
  documentationSlice.actions;
export default documentationSlice.reducer;
