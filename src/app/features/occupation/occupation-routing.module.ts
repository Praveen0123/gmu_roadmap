import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OccupationListComponent } from './containers/occupation-list/occupation-list.component';
import { OccupationProfileComponent } from './containers/occupation-profile/occupation-profile.component';
import { OccupationProfileResolverService } from './services/resolvers/occupation-profile-resolver.service';


const routes: Routes =
  [
    {
      path: '',
      component: OccupationListComponent,
    },

    {
      path: ':id',
      component: OccupationProfileComponent,
      resolve: { resolver: OccupationProfileResolverService }
    }
  ];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class OccupationRoutingModule { }
