import { Component, OnInit, Input } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { DegreeDetailsSkillDefinitionComponent } from '../degree-details-skill-definition/degree-details-skill-definition.component';
import { SkillTypeEnum } from '@app/root-store/pathway-store/pathway.state';
import { Pathway, Skill } from '@gql';
import { PathwayService } from '@app/root-store/pathway-store/pathway.service';


@Component({
  selector: 'gmu-degree-details-top-skills',
  templateUrl: './degree-details-top-skills.component.html',
  styleUrls: ['./degree-details-top-skills.component.scss']
})
export class DegreeDetailsTopSkillsComponent implements OnInit
{
  @Input() pathway: Pathway;

  essentialSkillList: Skill[];
  technicalSkillList: Skill[];

  constructor
    (
      private bottomSheet: MatBottomSheet
    ) { }

  ngOnInit(): void
  {
    if (this.pathway && this.pathway.skills)
    {
      this.essentialSkillList = PathwayService.findSkillsBySkillType(this.pathway.skills, SkillTypeEnum.Essential);
      this.technicalSkillList = PathwayService.findSkillsBySkillType(this.pathway.skills, SkillTypeEnum.Technical);
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
