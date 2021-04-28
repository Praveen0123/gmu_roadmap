import { createAction, props } from '@ngrx/store';
import { ConnectWithCoach } from '@gql';


export const requestToSaveConnectWithCoachForm = createAction
  (
    '[ConnectWithCoach] request to save connect with coach form',
    props<{ connectWithCoach: ConnectWithCoach; }>()
  );

export const connectWithCoachReceivedFromServer = createAction
  (
    '[ConnectWithCoach] connect with coach received from server',
    props<{ connectWithCoach: ConnectWithCoach; }>()
  );

export const connectCoachFailure = createAction
  (
    '[ConnectWithCoach] failure',
    props<{ error: any; }>()
  );
