import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CustomMaterialModule } from '../material/custom-material.module';

import { BackButtonComponent } from './buttons/back-button/back-button.component';
import { ConnectWithCoachComponent } from './connect-with-coach/connect-with-coach.component';
import { DialogComponent } from './dialog/dialog.component';
import { OccupationCardComponent } from './occupation-card/occupation-card.component';
import { OccupationListScrollComponent } from './occupation-list-scroll/occupation-list-scroll.component';
import { PathwayExplorerFormComponent } from './pathway-explorer-form/pathway-explorer-form.component';
import { PipesModule } from '../pipes/pipes.module';
import { RoadmapMediumComponent } from './roadmap/roadmap-medium/roadmap-medium.component';
import { RoadmapSmallComponent } from './roadmap/roadmap-small/roadmap-small.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SectionHeaderComponent } from './section-header/section-header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { VideoComponent } from './video/video.component';
import { AspectRatioComponent } from './aspect-ratio/aspect-ratio.component';
import { ReadMoreLessComponent } from './read-more-less/read-more-less.component';

import { StudentViewSkillRoadmapSharedComponent } from './student-view-skill-roadmap-shared/student-view-skill-roadmap-shared.component';


@NgModule({
  imports:
    [
      CommonModule,
      CustomMaterialModule,
      FormsModule,
      PipesModule,
      ReactiveFormsModule,
      ScrollingModule
    ],
  declarations:
    [
      BackButtonComponent,
      ConnectWithCoachComponent,
      DialogComponent,
      OccupationCardComponent,
      OccupationListScrollComponent,
      PathwayExplorerFormComponent,
      RoadmapMediumComponent,
      RoadmapSmallComponent,
      SectionHeaderComponent,
      SidenavComponent,
      SkillListComponent,
      SpinnerComponent,
      VideoComponent,
      AspectRatioComponent,
      ReadMoreLessComponent,

      StudentViewSkillRoadmapSharedComponent
    ],
  exports:
    [
      BackButtonComponent,
      ConnectWithCoachComponent,
      DialogComponent,
      OccupationCardComponent,
      OccupationListScrollComponent,
      PathwayExplorerFormComponent,
      RoadmapMediumComponent,
      RoadmapSmallComponent,
      SectionHeaderComponent,
      SidenavComponent,
      SkillListComponent,
      SpinnerComponent,
      VideoComponent,
      AspectRatioComponent,
      ReadMoreLessComponent,
      StudentViewSkillRoadmapSharedComponent

    ]
})
export class ComponentsModule { }
