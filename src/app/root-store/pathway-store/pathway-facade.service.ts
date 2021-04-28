import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IRootState, PathwayStore } from '../root-store';
import { Pathway } from '@gql';


@Injectable({
  providedIn: 'root',
})
export class PathwayFacadeService
{

  constructor
    (
      private store: Store<IRootState>
    ) { }


  requestPathwayListFromHomePage()
  {
    return this.store.dispatch(PathwayStore.Actions.requestPathwayListFromHomePage());
  }

  requestPathwayListFromConnectWithCoachPage()
  {
    return this.store.dispatch(PathwayStore.Actions.requestPathwayListFromConnectWithCoachPage());
  }

  requestDetailsFromPathwayDetailsPage(pathwayId: string)
  {
    return this.store.dispatch(PathwayStore.Actions.requestDetailsFromPathwayDetailsPage({ pathwayId }));
  }

  getPathwayList(): Observable<Pathway[]>
  {
    return this.store.pipe(select(PathwayStore.Selectors.getPathwayList));
  }

  getPathway(): Observable<Pathway>
  {
    return this.store.pipe(select(PathwayStore.Selectors.getPathway));
  }

  requestClearSelectedPathway()
  {
    return this.store.dispatch(PathwayStore.Actions.requestClearSelectedPathway());
  }

}
