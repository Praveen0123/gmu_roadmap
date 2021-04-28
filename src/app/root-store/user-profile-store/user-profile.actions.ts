import { createAction, props } from '@ngrx/store';
import { UserProfileModel } from './user-profile.state';

export const createUserProfile = createAction(
  '[UserProfile] request user profile'
);

export const userProfileReceived = createAction(
  '[UserProfile] user profile received',
  props<{ userProfileModel: UserProfileModel; }>()
);
