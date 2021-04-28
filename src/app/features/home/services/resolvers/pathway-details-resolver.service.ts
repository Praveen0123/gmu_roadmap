import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { PathwayFacadeService } from '@app/root-store/pathway-store/pathway-facade.service';
import { OccupationFacadeService } from '@app/root-store/occupation-store/occupation-facade.service';


@Injectable({
  providedIn: 'root'
})
export class PathwayDetailsResolverService implements Resolve<void>
{
  constructor
    (
      private occupationFacadeService: OccupationFacadeService,
      private pathwayFacadeService: PathwayFacadeService
    ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): void
  {
    const pathwayId: string = route.params.id;

    this.pathwayFacadeService.requestDetailsFromPathwayDetailsPage(pathwayId);
  }
}
