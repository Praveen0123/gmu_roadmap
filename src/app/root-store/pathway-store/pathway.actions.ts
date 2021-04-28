import { createAction, props } from '@ngrx/store';
import { Pathway } from '@gql';

export const requestPathwayListFromHomePage = createAction
  (
    '[Pathway] request pathway list from home page'
  );

export const requestPathwayListFromConnectWithCoachPage = createAction
  (
    '[Pathway] request pathway list from connect with coach page'
  );

export const pathwayListReceived = createAction
  (
    '[Pathway] pathway list received',
    props<{ pathwayList: Pathway[]; }>()
  );

export const requestDetailsFromPathwayDetailsPage = createAction
  (
    '[Pathway] request details from pathway details page',
    props<{ pathwayId: string; }>()
  );

export const pathwayDetailsReceived = createAction
  (
    '[Pathway] pathway details received',
    props<{ pathway: Pathway; }>()
  );

export const pathwayFailure = createAction
  (
    '[Pathway] pathway failure',
    props<{ error: any; }>()
  );

export const requestClearSelectedPathway = createAction
  (
    '[Pathway] request clear selected pathway'
  );