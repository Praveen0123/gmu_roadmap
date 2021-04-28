import { NgModule } from '@angular/core';

import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OccupationRoutingModule } from './occupation-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { MapOccupationHotspotsModule, MapOccupationAverageSalariesModule } from '@vantage-point/maps';

import { OccupationListComponent } from './containers/occupation-list/occupation-list.component';
import { OccupationProfileComponent } from './containers/occupation-profile/occupation-profile.component';
import { OccupationListViewComponent } from './components/occupation-list-view/occupation-list-view.component';
import { OccupationProfileViewComponent } from './components/occupation-profile-view/occupation-profile-view.component';
import { OccupationWhatTheyDoComponent } from './components/occupation-what-they-do/occupation-what-they-do.component';
import { OccupationHotSpotComponent } from './components/occupation-hot-spot/occupation-hot-spot.component';
import { OccupationAverageSalariesComponent } from './components/occupation-average-salaries/occupation-average-salaries.component';
import { OccupationSalaryComponent } from './components/occupation-salary/occupation-salary.component';
import { OccupationStatsComponent } from './components/occupation-stats/occupation-stats.component';
import { TopSkillsAtOccupationComponent } from './components/top-skills-at-occupation/top-skills-at-occupation.component';



@NgModule({
  imports:
    [
      CommonModule,
      FormsModule,
      MapOccupationAverageSalariesModule,
      MapOccupationHotspotsModule,
      OccupationRoutingModule,
      ReactiveFormsModule,
      SharedModule,

    ],
  declarations:
    [
      OccupationListComponent,
      OccupationProfileComponent,
      OccupationListViewComponent,
      OccupationProfileViewComponent,
      OccupationWhatTheyDoComponent,
      OccupationHotSpotComponent,
      OccupationAverageSalariesComponent,
      OccupationSalaryComponent,
      OccupationStatsComponent,
      TopSkillsAtOccupationComponent,

    ],
  providers:
    [
      CurrencyPipe
    ],

  exports:
    [
      OccupationWhatTheyDoComponent,

    ]


})
export class OccupationModule { }
