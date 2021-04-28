import { NgModule } from '@angular/core';
import { StudentViewComponent } from './containers/student-view/student-view.component';
import { StudentViewSkillsRoadmapComponent } from './containers/student-view-skills-roadmap/student-view-skills-roadmap.component';
import { StudentViewSkillsProfileComponent } from './containers/student-view-skills-profile/student-view-skills-profile.component';
import { StudentViewSkillsTranscriptComponent } from './containers/student-view-skills-transcript/student-view-skills-transcript.component';
import { StudentViewSkillsMilestonesComponent } from './containers/student-view-skills-milestones/student-view-skills-milestones.component';
import { RouterModule, Routes } from '@angular/router';

// import { OccupationProfileResolverService } from '../occupation/services/resolvers/occupation-profile-resolver.service';

const routes: Routes = [

  {
    path: '',
    component: StudentViewComponent,
    children: [
      {
        path: '',
        redirectTo: 'student-view-skills-milestones',
        pathMatch: 'full',
      },
      {
        path: 'student-view-skills-milestones',
        component: StudentViewSkillsMilestonesComponent,
      },

      {
        path: 'student-view-skills-roadmap',
        component: StudentViewSkillsRoadmapComponent,
        // resolve: { resolver: OccupationProfileResolverService }
      },
      {
        path: 'student-view-skills-profile',
        component: StudentViewSkillsProfileComponent,
      },
      {
        path: 'student-view-skills-transcript',
        component: StudentViewSkillsTranscriptComponent,
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})


export class StudentViewRoutingModule { }
