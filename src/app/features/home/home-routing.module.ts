import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './containers/home/home.component';
import { PathwayExplorerComponent } from './containers/pathway-explorer/pathway-explorer.component';
import { OccupationsComponent } from './containers/occupations/occupations.component';
import { WelcomeComponent } from './containers/welcome/welcome.component';
import { AreaOfStudyListResolverService } from './services/resolvers/area-of-study-list-resolver.service';
import { PathwayListResolverService } from './services/resolvers/pathway-list-resolver.service';
import { PathwayDetailsComponent } from './containers/pathway-details/pathway-details.component';
import { PathwayDetailsResolverService } from './services/resolvers/pathway-details-resolver.service';


const routes: Routes =
  [
    {
      path: '',
      component: HomeComponent,
      children:
        [
          {
            path: '',
            redirectTo: 'pathway',
            pathMatch: 'full',
            resolve:
            {
              pathwayList: PathwayListResolverService,
              areaOfStudyList: AreaOfStudyListResolverService
            }
          },
          {
            path: 'pathway',
            component: PathwayExplorerComponent,
            resolve:
            {
              pathwayList: PathwayListResolverService,
              areaOfStudyList: AreaOfStudyListResolverService
            }
          },
          {
            path: 'pathway/:id',
            component: PathwayDetailsComponent,
            resolve: { resolver: PathwayDetailsResolverService }
          },
          {
            path: 'occupations',
            component: OccupationsComponent,
            children: [],
            resolve:
            {
              pathwayList: PathwayListResolverService,
              areaOfStudyList: AreaOfStudyListResolverService
            }
          }
        ]
    },
    {
      path: 'welcome',
      component: WelcomeComponent
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
