import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DegreeDetailsSkillDefinitionComponent } from '@app/features/home/components/degree-details-skill-definition/degree-details-skill-definition.component';
import { Skill, Occupation } from '@gql';
import { PathwayService } from '@app/root-store/pathway-store/pathway.service';
import { SkillTypeEnum } from '@app/root-store/pathway-store/pathway.state';
import { CONFIG } from '@env/config';

@Component({
  selector: 'gmu-top-skills-at-occupation',
  templateUrl: './top-skills-at-occupation.component.html',
  styleUrls: ['./top-skills-at-occupation.component.scss']
})
export class TopSkillsAtOccupationComponent implements OnInit, OnChanges
{
  topSkillsDescription: string = CONFIG.MESSAGING.OCCUPATIONS.DESCRIPTIONS.TOP_SKILLS;
  essentialSkillList: Skill[];
  technicalSkillList: Skill[];

  @Input() occupationProfileDetails: Occupation;

  constructor(
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
      this.essentialSkillList = PathwayService.findSkillsBySkillType(this.occupationProfileDetails.skills, SkillTypeEnum.Essential);
      this.technicalSkillList = PathwayService.findSkillsBySkillType(this.occupationProfileDetails.skills, SkillTypeEnum.Technical);
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
