import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, concatMap, withLatestFrom, filter } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';

import { AreaOfStudy } from '@gql';
import { IRootState } from '../root-store';
import { AreaOfStudyService } from './area-of-study.service';
import { requestAreaOfStudyListFromHome, areaOfStudyListReceived, areaOfStudyFailure, requestAreaOfStudyById, areaOfStudyReceived } from './area-of-study.actions';
import { getAreaOfStudyList } from './area-of-study.selectors';


@Injectable()
export class AreaOfStudyEffects
{

  constructor
    (
      private actions$: Actions,
      private store: Store<IRootState>,
      private areaOfStudyService: AreaOfStudyService
    ) { }

  requestAreaOfStudyListFromHome$ = createEffect(() => this.actions$.pipe
    (
      ofType(requestAreaOfStudyListFromHome),
      concatMap(action => of(action).pipe
        (
          withLatestFrom
            (
              this.store.pipe(select(getAreaOfStudyList))
            )
        )),
      filter(([action, areaOfStudyList]) => !areaOfStudyList),
      switchMap((action) =>
      {
        return this.areaOfStudyService.getAreaOfStudyList()
          .pipe
          (
            map((areaOfStudyList: AreaOfStudy[]) => areaOfStudyListReceived({ areaOfStudyList }))
          );
      }),
      catchError(error => of(areaOfStudyFailure({ error })))
    )
  );


  requestAreaOfStudy$ = createEffect(() => this.actions$.pipe
    (
      ofType(requestAreaOfStudyById),
      switchMap((action) =>
      {
        return this.areaOfStudyService.getAreaOfStudyById(action.areaOfStudyId)
          .pipe
          (
            map((areaOfStudy: AreaOfStudy) => areaOfStudyReceived({ areaOfStudy }))
          );
      }),
      catchError(error => of(areaOfStudyFailure({ error })))
    )
  );
}
