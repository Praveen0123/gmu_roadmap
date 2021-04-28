import { Component, OnInit, Input } from '@angular/core';

import { CONFIG } from '@env/config';
import { Occupation, Pathway, Skill } from '@gql';



import { PathwayService } from '@app/root-store/pathway-store/pathway.service';
import { SkillTypeEnum } from '@app/root-store/pathway-store/pathway.state';

@Component({
  selector: 'gmu-occupation-card',
  templateUrl: './occupation-card.component.html',
  styleUrls: ['./occupation-card.component.scss']
})
export class OccupationCardComponent implements OnInit
{
  @Input() occupation: Occupation;
  @Input() pathway: Pathway;
  @Input() isOccupationCardVisible: boolean = true;

  imageUrl: string;
  salary?: number;

  essentialSkillList: Skill[];
  technicalSkillList: Skill[];

  constructor() { }

  ngOnInit(): void
  {
    this.imageUrl = `${CONFIG.IMAGES.ONET_BASE_URL}${this.occupation.imageName}`;
    this.salary = this.occupation.preferredSalary?.minimumSalaryPerYear;

    // this.displayDescription();

    if (this.pathway && this.pathway.skills)
    {
      this.essentialSkillList = PathwayService.findSkillsBySkillType(this.pathway.skills, SkillTypeEnum.Essential);
      this.technicalSkillList = PathwayService.findSkillsBySkillType(this.pathway.skills, SkillTypeEnum.Technical);
    }

    console.log("pathwaytesting", this.pathway);
  }

}


