import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { withLatestFrom, map, switchMap, take } from 'rxjs/operators';

import { IRootState } from '../root-store';
import { requestToSaveConnectWithCoachForm, connectWithCoachReceivedFromServer } from './connect-with-coach.actions';
import { ConnectWithCoachInput, SaveConnectWithCoachGQL, ConnectWithCoach, DegreeInput } from '@gql';
import { NotificationService } from '@app/core/services/notification/notification.service';
import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { getUserProfile } from '../user-profile-store/user-profile.selectors';


@Injectable()
export class ConnectWithCoachEffects
{
  constructor
    (
      private actions$: Actions,
      private store: Store<IRootState>,
      private saveConnectWithCoachGQL: SaveConnectWithCoachGQL,
      private notificationService: NotificationService,
      private navigationService: NavigationService
    ) { }


  requestToSaveConnectWithCoachForm$ = createEffect(() => this.actions$.pipe
    (
      ofType(requestToSaveConnectWithCoachForm),
      withLatestFrom
        (
          this.store.pipe(select(getUserProfile))
        ),
      switchMap(([action, userProfileModel]) =>
      {
        let currentNovaProgramInput: DegreeInput = null;
        let desiredMasonProgramInput: DegreeInput = null;
        let desiredNovaProgramInput: DegreeInput = null;

        // CONVERT CURRENT NOVA PROGRAM TO DegreeInput
        if (action.connectWithCoach.currentNovaProgram != null)
        {
          currentNovaProgramInput =
          {
            id: action.connectWithCoach.currentNovaProgram.id,
            name: action.connectWithCoach.currentNovaProgram.name
          };
        }

        // CONVERT DESIRED MASON PROGRAM TO DegreeInput
        if (action.connectWithCoach.desiredMasonProgram != null)
        {
          desiredMasonProgramInput =
          {
            id: action.connectWithCoach.desiredMasonProgram.id,
            name: action.connectWithCoach.desiredMasonProgram.name
          };
        }

        // CONVERT CURRENT NOVA PROGRAM TO DegreeInput
        if (action.connectWithCoach.desiredNovaProgram != null)
        {
          desiredNovaProgramInput =
          {
            id: action.connectWithCoach.desiredNovaProgram.id,
            name: action.connectWithCoach.desiredNovaProgram.name
          };
        }


        const connectWithCoachInput: ConnectWithCoachInput =
        {
          userId: userProfileModel.userId,
          firstName: action.connectWithCoach.firstName,
          lastName: action.connectWithCoach.lastName,
          emailAddress: action.connectWithCoach.emailAddress,
          mobileNumber: action.connectWithCoach.mobileNumber,
          birthDate: action.connectWithCoach.birthDate,
          isCurrentNovaStudent: action.connectWithCoach.isCurrentNovaStudent,
          currentNovaProgram: currentNovaProgramInput,
          desiredMasonProgram: desiredMasonProgramInput,
          startingSemesterAtMason: action.connectWithCoach.startingSemesterAtMason,
          desiredNovaProgram: desiredNovaProgramInput,
          startingSemesterAtNova: action.connectWithCoach.startingSemesterAtNova
        };

        // console.log('EFFECT | SAVE CONNECT WITH COACH', connectWithCoachInput);

        return this.saveConnectWithCoachGQL
          .mutate({ connectWithCoachInput })
          .pipe
          (
            map(apolloMutationResults =>
            {
              const connectWithCoach: ConnectWithCoach = apolloMutationResults.data.saveConnectWithCoach;

              return connectWithCoachReceivedFromServer({ connectWithCoach });
            })
          );
      })
    )
  );


  connectWithCoachReceivedFromServer$ = createEffect(() => this.actions$.pipe
    (
      ofType(connectWithCoachReceivedFromServer),
      map((action) =>
      {
        this.notificationService.success('We received your submission. An ADVANCE Coach will be in contact with you soon! Please wait while we redirect you back to the previous page.')
          .afterDismissed()
          .pipe
          (
            take(1),
            map(() => this.navigationService.goToHomePage())
          )
          .subscribe();
      })
    )
    , { dispatch: false });

}
