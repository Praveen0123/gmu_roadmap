import { createAction, props } from '@ngrx/store';

import { Occupation } from '@gql';


export const requestClearSelectedOccupationModel = createAction
  (
    '[Occupation] request clear selected occupation model'
  );

export const occupationCardsFailure = createAction
  (
    '[Occupation] Occupation Failure',
    props<{ error: any; }>()
  );

export const requestOccupationDetails = createAction
  (
    '[Occupation] request occupation details',
    props<{ occupationId: string; }>()
  );

export const occupationDetailsReceived = createAction
  (
    '[Occupation] occupation details received',
    props<{ occupationModel: Occupation; }>()
  );

export const occupationDetailsFailure = createAction
  (
    '[Occupation] occupation details error',
    props<{ error: any; }>()
  );

