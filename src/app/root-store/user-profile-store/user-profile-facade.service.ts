import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { UserProfileStore, IRootState } from '../root-store';


@Injectable({
  providedIn: 'root'
})
export class UserProfileFacadeService
{
  constructor
    (
      private store: Store<IRootState>
    ) { }

  createUserProfile()
  {
    return this.store.dispatch(UserProfileStore.Actions.createUserProfile());
  }
}
