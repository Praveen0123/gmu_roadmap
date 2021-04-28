import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, concatMap, withLatestFrom, filter } from 'rxjs/operators';
import { of } from 'rxjs';

import { OccupationService } from './occupation.service';
import { requestOccupationDetails, occupationDetailsFailure, occupationDetailsReceived, occupationCardsFailure } from './occupation.actions';
import { Occupation } from '@gql';
import { Store, select } from '@ngrx/store';
import { IRootState } from '../root-store';
import { getOccupationDetails } from './occupation.selectors';


@Injectable()
export class OccupationEffects
{

  constructor
    (
      private actions$: Actions,
      private store: Store<IRootState>,
      private occupationService: OccupationService
    ) { }

  requestOccupationDetails$ = createEffect(() => this.actions$.pipe
    (
      ofType(requestOccupationDetails),
      concatMap(action => of(action).pipe
        (
          withLatestFrom
            (
              this.store.pipe(select(getOccupationDetails))
            )
        )),
      filter(([action, selectedOccupation]) =>
      {
        if (selectedOccupation)
        {
          return (selectedOccupation.vpOccupationId !== action.occupationId);
        }

        return true;
      }),
      switchMap(([action, selectedOccupation]) =>
      {
        return this.occupationService.getOccupationDetails(action.occupationId)
          .pipe
          (
            map((occupationModel: Occupation) => occupationDetailsReceived({ occupationModel }))
          );
      }),
      catchError(error => of(occupationDetailsFailure({ error })))
    )
  );

}
