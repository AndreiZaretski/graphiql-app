import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@store/store';

export const memoizedSelectOpenTypes = createSelector(
  [(state: RootState) => state.documentationSlice.openTypes],
  (openTypes) => openTypes
);

export const memoizedSelectOpenQueries = createSelector(
  [(state: RootState) => state.documentationSlice.openQueries],
  (openQueries) => openQueries
);

export const memoizedSelectSelectedType = createSelector(
  [(state: RootState) => state.documentationSlice.selectedType],
  (selectedType) => selectedType
);
