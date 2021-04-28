import { createReducer, on } from '@ngrx/store';
import { initialOccupationState } from './occupation.state';
import { occupationDetailsReceived, requestClearSelectedOccupationModel } from './occupation.actions';


export const reducer = createReducer(
  initialOccupationState,

  on(occupationDetailsReceived, (state, { occupationModel }) =>
  {
    return { ...state, occupationModel };
  }),


  // SELECTED OCCUPATION CLEARED
  on(requestClearSelectedOccupationModel, (state) =>
  {
    return { ...state, occupationModel: undefined };
  })

);
