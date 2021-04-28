export const userProfileFeatureKey = 'userProfile';

export interface UserProfileModel
{
  userId: string;
}

export interface UserProfileState
{
  userProfileModel: UserProfileModel;
}

export const initialConnectCoachState: UserProfileState =
{
  userProfileModel: undefined
};
