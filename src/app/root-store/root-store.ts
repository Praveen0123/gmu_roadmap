import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import { storageSync } from '@larscom/ngrx-store-storagesync';

import * as AreaOfStudyStore from './area-of-study-store';
import * as ConnectWithCoachStore from './connect-with-coach-store';
import * as DeviceStore from './device-store';
import * as OccupationStore from './occupation-store';
import * as PathwayStore from './pathway-store';
import * as SpinnerStore from './spinner-store';
import * as UserProfileStore from './user-profile-store';
import * as SkillsRoadmapStore from './student-skills-roadmap-store';


export interface IRootState
{
  router: any;
  [AreaOfStudyStore.State.areaOfStudyFeatureKey]: AreaOfStudyStore.State.AreaOfStudyState;
  [ConnectWithCoachStore.State.connectCoachFeatureKey]: ConnectWithCoachStore.State.ConnectCoachState;
  [DeviceStore.State.deviceFeatureKey]: DeviceStore.State.DeviceState;
  [OccupationStore.State.occupationFeatureKey]: OccupationStore.State.OccupationState;
  [PathwayStore.State.pathwayFeatureKey]: PathwayStore.State.PathwayState;
  [SpinnerStore.State.spinnerFeatureKey]: SpinnerStore.State.SpinnerState;
  [UserProfileStore.State.userProfileFeatureKey]: UserProfileStore.State.UserProfileState;
  [SkillsRoadmapStore.State.skillsRoadmapFeatureKey]: SkillsRoadmapStore.State.SkillsRoadmapState;
}

export
{
  AreaOfStudyStore,
  ConnectWithCoachStore,
  DeviceStore,
  OccupationStore,
  PathwayStore,
  SpinnerStore,
  UserProfileStore,
  SkillsRoadmapStore
};

export const reducers: ActionReducerMap<IRootState> =
{
  router: routerReducer,
  [AreaOfStudyStore.State.areaOfStudyFeatureKey]: AreaOfStudyStore.Reducers.reducer,
  [ConnectWithCoachStore.State.connectCoachFeatureKey]: ConnectWithCoachStore.Reducers.reducer,
  [DeviceStore.State.deviceFeatureKey]: DeviceStore.Reducers.reducer,
  [OccupationStore.State.occupationFeatureKey]: OccupationStore.Reducers.reducer,
  [PathwayStore.State.pathwayFeatureKey]: PathwayStore.Reducers.reducer,
  [SpinnerStore.State.spinnerFeatureKey]: SpinnerStore.Reducers.reducer,
  [UserProfileStore.State.userProfileFeatureKey]: UserProfileStore.Reducers.reducer,
  [SkillsRoadmapStore.State.skillsRoadmapFeatureKey]: SkillsRoadmapStore.Reducers.reducer
};

// slices of state participating in session/local storage persistance
export function storageSyncReducer(reducer: ActionReducer<IRootState>)
{
  return storageSync<IRootState>({
    features:
      [
        { stateKey: OccupationStore.State.occupationFeatureKey, storageForFeature: window.localStorage },
        { stateKey: PathwayStore.State.pathwayFeatureKey, storageForFeature: window.localStorage },
        { stateKey: UserProfileStore.State.userProfileFeatureKey, storageForFeature: window.localStorage }
      ],
    // defaults to localStorage
    storage: window.localStorage
  })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [storageSyncReducer];
