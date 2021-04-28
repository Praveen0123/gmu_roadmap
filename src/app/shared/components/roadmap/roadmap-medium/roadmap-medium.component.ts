import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { Occupation, Skill } from '@gql';
import { CONFIG } from '@env/config';
import { PathwayService } from '@app/root-store/pathway-store/pathway.service';
import { SkillTypeEnum } from '@app/root-store/pathway-store/pathway.state';
import { DegreeDetailsSkillDefinitionComponent } from '@app/features/home/components/degree-details-skill-definition/degree-details-skill-definition.component';



@Component({
  selector: 'gmu-roadmap-medium',
  templateUrl: './roadmap-medium.component.html',
  styleUrls: ['./roadmap-medium.component.scss']
})
export class RoadmapMediumComponent implements OnInit
{
  @Input() occupationProfileDetails: Occupation;
  @Input() isSkillRoadmapVisible: boolean = true;
  topSkillsDescription: string = CONFIG.MESSAGING.OCCUPATIONS.DESCRIPTIONS.TOP_SKILLS;
  skillListYear1: Skill[];
  skillListYear2: Skill[];
  skillListYear3: Skill[];
  skillListYear4: Skill[];

  skill_1: string;
  skill222: string;
  constructor
    (
      private bottomSheet: MatBottomSheet,

  ) { }


  ngOnInit(): void
  {

    this.skill_1 = CONFIG.description.TOP_SKILLS
      ;
    this.skill222 = CONFIG.description.advance_degree;
    console.log("occupa", this.occupationProfileDetails);
    this.buildSkillLists();
    // this.displayDescription();

    // console.log(this.router.url);

  }

  // displayDescription()
  // {
  //   // if (this.router.url === '/student-view/student-view-skills-roadmap')
  //   // {
  //   //   this.isSkillRoadmapVisible = false;
  //   // } else
  //   // {
  //   //   this.isSkillRoadmapVisible = true;
  //   // }

  //   // this.isSkillRoadmapVisible = true;
  // }


  ngOnChanges(changes: SimpleChanges): void
  {
    if (changes.occupationProfileDetails && !changes.occupationProfileDetails.firstChange)
    {
      this.buildSkillLists();
    }
  }

  buildSkillLists(): void
  {
    if (this.occupationProfileDetails)
    {
      this.skillListYear1 = PathwayService.findSkillsBySkillType(this.occupationProfileDetails.skills, SkillTypeEnum.Essential);
      this.skillListYear2 = PathwayService.findSkillsBySkillType(this.occupationProfileDetails.skills, SkillTypeEnum.Technical);
      this.skillListYear3 = PathwayService.findSkillsBySkillType(this.occupationProfileDetails.skills, SkillTypeEnum.Essential);
      this.skillListYear4 = PathwayService.findSkillsBySkillType(this.occupationProfileDetails.skills, SkillTypeEnum.Technical);
    }
  }

  openBottomSheet(skillModel: Skill): void
  {
    this.bottomSheet.open(DegreeDetailsSkillDefinitionComponent,
      {
        data: skillModel,
        panelClass: 'my-component-bottom-sheet'
      });
  }

}
