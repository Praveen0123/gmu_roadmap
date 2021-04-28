import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, concatMap, withLatestFrom, filter } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { Store, select } from '@ngrx/store';

import { createUserProfile, userProfileReceived } from './user-profile.actions';
import { UserProfileModel } from './user-profile.state';
import { getUserProfile } from './user-profile.selectors';
import { IRootState } from '../root-store';


@Injectable()
export class UserProfileEffects
{

  constructor
    (
      private actions$: Actions,
      private store: Store<IRootState>
    ) { }

  createUserProfile$ = createEffect(() => this.actions$.pipe
    (
      ofType(createUserProfile),
      concatMap(action => of(action).pipe
        (
          withLatestFrom
            (
              // basicInformationModel
              this.store.pipe(select(getUserProfile))
            )
        )),
      filter(([action, userProfileModel]) => !userProfileModel),
      map((action) =>
      {
        const userProfileModel: UserProfileModel =
        {
          userId: uuidv4()
        };

        return userProfileReceived({ userProfileModel });
      })
    )
  );
}
