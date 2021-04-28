import { createFeatureSelector, MemoizedSelector, createSelector } from '@ngrx/store';
import { UserProfileState, userProfileFeatureKey, UserProfileModel } from './user-profile.state';


export const userProfileSlice = createFeatureSelector<UserProfileState>
  (
    userProfileFeatureKey
  );

export const getUserProfile: MemoizedSelector<object, UserProfileModel> = createSelector
  (
    userProfileSlice,
    (state: UserProfileState): UserProfileModel => state.userProfileModel
  );
