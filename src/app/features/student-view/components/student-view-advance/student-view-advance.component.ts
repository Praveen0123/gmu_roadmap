import { Component, OnInit, Input } from '@angular/core';
import { SkillsRoadmapModel } from '@app/root-store/student-skills-roadmap-store/skills-roadmap-state';

@Component({
  selector: 'gmu-student-view-advance',
  templateUrl: './student-view-advance.component.html',
  styleUrls: ['./student-view-advance.component.scss']
})
export class StudentViewAdvanceComponent implements OnInit
{
  @Input() skillRoadmap: SkillsRoadmapModel;
  constructor() { }

  ngOnInit(): void
  {
    console.log("skilladvace", this.skillRoadmap);
    const skills = Object.assign({}, this.skillRoadmap);
    // const obj = Object.fromEntries(this.skillRoadmap);
    console.log(Object.entries(this.skillRoadmap));
    console.log("skills", skills);
  }

}
