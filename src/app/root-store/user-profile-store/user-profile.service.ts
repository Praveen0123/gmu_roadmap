import { Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService
{

  constructor
    (
      private httpService: HttpService
    )
  {

  }

}
