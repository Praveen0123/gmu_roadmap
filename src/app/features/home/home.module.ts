import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';

import { CareerOccupationsComponent } from './components/career-occupations/career-occupations.component';
import { CareerOpportunitiesComponent } from './components/career-opportunities/career-opportunities.component';
import { CourseOutlineBottomSheetComponent } from './components/course-outline-bottom-sheet/course-outline-bottom-sheet.component';
import { CourseOutlineComponent } from './components/course-outline/course-outline.component';
import { CourseWorkAtGlanceComponent } from './components/course-work-at-glance/course-work-at-glance.component';
import { DegreeDetailsSkillDefinitionComponent } from './components/degree-details-skill-definition/degree-details-skill-definition.component';
import { DegreeDetailsTopSkillsComponent } from './components/degree-details-top-skills/degree-details-top-skills.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderMediumComponent } from './components/header-medium/header-medium.component';
import { HeaderSmallComponent } from './components/header-small/header-small.component';
import { HomeComponent } from './containers/home/home.component';
import { NavTabsComponent } from './components/nav-tabs/nav-tabs.component';
import { OccupationListByAreaOfStudyComponent } from './components/occupation-list-by-area-of-study/occupation-list-by-area-of-study.component';
import { OccupationsComponent } from './containers/occupations/occupations.component';
import { OccupationSearchBoxFormComponent } from './components/occupation-search-box-form/occupation-search-box-form.component';
import { PathwayDetailsComponent } from './containers/pathway-details/pathway-details.component';
import { PathwayExplorerComponent } from './containers/pathway-explorer/pathway-explorer.component';
import { SharedModule } from '@app/shared/shared.module';
import { WelcomeComponent } from './containers/welcome/welcome.component';


@NgModule({
  imports:
    [
      CommonModule,
      HomeRoutingModule,
      SharedModule,
      FormsModule,
      ReactiveFormsModule
    ],
  declarations:
    [
      CareerOccupationsComponent,
      CareerOpportunitiesComponent,
      CourseOutlineBottomSheetComponent,
      CourseOutlineComponent,
      CourseWorkAtGlanceComponent,
      DegreeDetailsSkillDefinitionComponent,
      DegreeDetailsTopSkillsComponent,
      FooterComponent,
      HeaderMediumComponent,
      HeaderSmallComponent,
      HomeComponent,
      NavTabsComponent,
      OccupationListByAreaOfStudyComponent,
      OccupationsComponent,
      OccupationSearchBoxFormComponent,
      PathwayDetailsComponent,
      PathwayExplorerComponent,
      WelcomeComponent
    ],
  exports:
    [
      FooterComponent,
      HeaderMediumComponent,
      HeaderSmallComponent,
      WelcomeComponent,
      DegreeDetailsTopSkillsComponent
    ],
  providers:
    [
      CurrencyPipe
    ]
})
export class HomeModule { }
