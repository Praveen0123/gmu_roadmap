import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Occupation, AreaOfStudy, Pathway } from '@gql';
import { SkillsRoadmapModel } from '@app/root-store/student-skills-roadmap-store/skills-roadmap-state';

@Component({
  selector: 'gmu-student-view-skill-roadmap-shared',
  templateUrl: './student-view-skill-roadmap-shared.component.html',
  styleUrls: ['./student-view-skill-roadmap-shared.component.scss']
})
export class StudentViewSkillRoadmapSharedComponent implements OnInit
{

  @Input() areaOfStudyList: AreaOfStudy[];
  @Input() skillRoadmap: SkillsRoadmapModel[];
  @Input() pathway: Pathway;

  @Output('onAreaOfStudyClick') areaOfStudyClickEventEmitter = new EventEmitter<AreaOfStudy>();
  @Output('onOccupationClick') occupationClickEventEmitter = new EventEmitter<Occupation>();
  // @Input() areaOfStudy: AreaOfStudy;
  // @Output('onOccupationClick') occupationClickEventEmitter = new EventEmitter<Occupation>();

  // sortTypes: string[] = ['Salary', 'Demand'];
  // sortByAreaOfStudy = new FormControl('Salary');


  constructor
    (

    ) { }


  ngOnInit(): void
  {
    // console.log("pathway121212121212", this.pathway);
    console.log("skillRoadmapllllllll", this.skillRoadmap);
  }


  // onOccupationClick(occupation: Occupation)
  // {
  //   if (this.occupationClickEventEmitter.observers.length > 0)
  //   {
  //     this.occupationClickEventEmitter.emit(occupation);
  //   }
  // }
  onAreaOfStudyClick(areaOfStudy: AreaOfStudy)
  {
    if (this.areaOfStudyClickEventEmitter.observers.length > 0)
    {
      this.areaOfStudyClickEventEmitter.emit(areaOfStudy);
    }
  }

  onOccupationClick(occupation: Occupation)
  {
    if (this.occupationClickEventEmitter.observers.length > 0)
    {
      this.occupationClickEventEmitter.emit(occupation);
    }
  }

}
