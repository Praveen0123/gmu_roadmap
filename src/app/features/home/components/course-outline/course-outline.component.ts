import { Component, OnInit, Input } from '@angular/core';
import { Degree, Course, Skill } from '@gql';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

import { DegreeDetailsSkillDefinitionComponent } from '../degree-details-skill-definition/degree-details-skill-definition.component';


@Component({
  selector: 'gmu-course-outline',
  templateUrl: './course-outline.component.html',
  styleUrls: ['./course-outline.component.scss']
})
export class CourseOutlineComponent implements OnInit
{
  @Input() title: string;
  @Input() degreeModel: Degree;

  totalCourseCredits: number = 0;

  constructor
    (
      private bottomSheet: MatBottomSheet
    ) { }

  ngOnInit(): void
  {
    if (this.degreeModel && this.degreeModel.courses)
    {
      this.totalCourseCredits = this.degreeModel.courses.reduce((accumulaor, item: Course) => accumulaor + item.credits, 0);
    }
  }

  onClickSkill(selectedSkill: Skill)
  {
    this.bottomSheet.open(DegreeDetailsSkillDefinitionComponent,
      {
        data: selectedSkill,
        panelClass: 'my-component-bottom-sheet'
      });
  }
}
