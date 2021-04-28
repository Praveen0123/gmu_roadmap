import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';

import { OccupationState, occupationFeatureKey } from './occupation.state';
import { Occupation } from '@gql';


export const occupationSlice = createFeatureSelector<OccupationState>(
  occupationFeatureKey
);

export const getOccupationDetails: MemoizedSelector<object, Occupation> = createSelector
  (
    occupationSlice,
    (state: OccupationState): Occupation => state.occupationModel
  );

export const getOccupationCardList: MemoizedSelector<object, Occupation[]> = createSelector
  (
    occupationSlice,
    (state: OccupationState): Occupation[] => state.occupationCardList
  );

