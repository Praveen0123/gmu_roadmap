import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

import { Occupation, Skill } from '@gql';
import { PathwayService } from '@app/root-store/pathway-store/pathway.service';
import { SkillTypeEnum } from '@app/root-store/pathway-store/pathway.state';
import { DegreeDetailsSkillDefinitionComponent } from '@app/features/home/components/degree-details-skill-definition/degree-details-skill-definition.component';
import { CONFIG } from '@env/config';
import { MatBottomSheet } from '@angular/material/bottom-sheet';


@Component({
  selector: 'gmu-roadmap-small',
  templateUrl: './roadmap-small.component.html',
  styleUrls: ['./roadmap-small.component.scss']
})
export class RoadmapSmallComponent implements OnInit
{
  @Input() occupationProfileDetails: Occupation;

  topSkillsDescription: string = CONFIG.MESSAGING.OCCUPATIONS.DESCRIPTIONS.TOP_SKILLS;
  skillListYear1: Skill[];
  skillListYear2: Skill[];
  skillListYear3: Skill[];
  skillListYear4: Skill[];

  constructor
    (
      private bottomSheet: MatBottomSheet
    ) { }

  ngOnInit(): void
  {
    this.buildSkillLists();
  }

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
