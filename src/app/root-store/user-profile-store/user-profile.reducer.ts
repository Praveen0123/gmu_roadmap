import { createReducer, on } from '@ngrx/store';

import { initialConnectCoachState } from './user-profile.state';
import { userProfileReceived } from './user-profile.actions';


export const reducer = createReducer
  (
    initialConnectCoachState,
    on(userProfileReceived, (state, { userProfileModel }) =>
    {
      return { ...state, userProfileModel };
    })
  );
