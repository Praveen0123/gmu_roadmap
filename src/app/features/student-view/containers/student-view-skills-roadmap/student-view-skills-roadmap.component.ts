
import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { Occupation, AreaOfStudy, Pathway } from '@gql';
import { OccupationFacadeService } from '@app/root-store/occupation-store/occupation-facade.service';

import { SkillsRoadmapFacadeService } from '@app/root-store/student-skills-roadmap-store/skills-roadmap-facade.service';

import { AreaOfStudyFacadeService } from '@app/root-store/area-of-study-store/area-of-study-facade.service';
import { SkillsRoadmapModel } from '@app/root-store/student-skills-roadmap-store/skills-roadmap-state';
import { PathwayFacadeService } from '@app/root-store/pathway-store/pathway-facade.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';



@Component({
  selector: 'gmu-student-view-skills-roadmap',
  templateUrl: './student-view-skills-roadmap.component.html',
  styleUrls: ['./student-view-skills-roadmap.component.scss']
})
export class StudentViewSkillsRoadmapComponent implements OnInit
{
  occupationProfileModel$: Observable<Occupation>;
  areaOfStudyList$: Observable<AreaOfStudy[]>;
  pathway$: Observable<Pathway>;

  skillRoadmap$: Observable<SkillsRoadmapModel[]>;
  text1Class: string;
  text2Class: string;
  highlightedDiv: number;
  highlightedDiv2: number;
  selectedSkillType: string;
  constructor(
    private occupationFacadeService: OccupationFacadeService,
    private areaOfStudyFacadeService: AreaOfStudyFacadeService,
    private navigationService: NavigationService,
    private SkillsRoadmapFacadeService: SkillsRoadmapFacadeService,
    private pathwayFacadeService: PathwayFacadeService,
    private bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void
  {
    this.selectedSkillType = 'Skills View';
    this.occupationProfileModel$ = this.occupationFacadeService.getOccupationDetails();
    console.log(" console.log(   this.occupationProfileModel$)", this.occupationProfileModel$);
    this.areaOfStudyList$ = this.areaOfStudyFacadeService.getAreaOfStudyList();
    console.log("   this.areaOfStudyListforcardsss$)", this.areaOfStudyList$);
    this.skillRoadmap$ = this.SkillsRoadmapFacadeService.getskillRoadmapList();
    console.log("   this.skillRoadmap$)", this.skillRoadmap$);
    this.pathway$ = this.pathwayFacadeService.getPathway();
    console.log("pathway  for student", this.pathway$);
  }
  onAreaOfStudyClick(areaOfStudy: AreaOfStudy)
  {
    this.areaOfStudyFacadeService.setSelectedAreaOfStudy(areaOfStudy);
    this.navigationService.goToAreaOfStudyOccupationList(areaOfStudy);
  }

  onOccupationClick(occupation: Occupation)
  {
    this.navigationService.goToOccupationDetailPage(occupation.vpOccupationId);
  }



  toggleHighlight(newValue: number)
  {
    if (this.highlightedDiv === newValue)
    {
      this.highlightedDiv = 0;
    }
    else
    {
      this.highlightedDiv = newValue;
    }
  }
  toggleHighlight2(newValue: number)
  {
    if (this.highlightedDiv2 === newValue)
    {
      this.highlightedDiv2 = 0;
    }
    else
    {
      this.highlightedDiv2 = newValue;
    }
  }

  changeSkillType(value)
  {
    this.selectedSkillType = value;
  }

}
