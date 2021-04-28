import { Component, OnInit, Input, Output, EventEmitter, HostBinding, OnChanges, SimpleChanges } from '@angular/core';

import { Skill } from '@gql';
import { PathwayService } from '@app/root-store/pathway-store/pathway.service';



@Component({
  selector: 'gmu-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit, OnChanges
{
  @Input() title: string;
  @Input() subTitle: string;
  @Input() topX: number;
  @Input() skillList: Skill[];
  @Input() areSkillsDisplayedInGrid: boolean = false;
  @Input() isOccupationCardVisible: boolean = true;
  @Output('onClickSkill') skillSlickEventEmitter = new EventEmitter<Skill>();

  @HostBinding('class.has-skills-as-links') @Input() displaySkillsAsLinks: boolean = false;
  skillRoadmapVisible: boolean;

  skillListToDisplay: Skill[];
  gridClass: string;
  cellClass: string;

  constructor() { }

  ngOnInit(): void
  {
    this.initGridClasses();
    this.displaySkillsAsLinks = (this.displaySkillsAsLinks === undefined) ? false : this.displaySkillsAsLinks;

    if (this.skillList)
    {
      const sortedSkillsList: Skill[] = PathwayService.quickSortByDemandLevel(this.skillList);
      this.skillListToDisplay = (this.topX && this.topX > 0) ? sortedSkillsList.slice(0, this.topX) : sortedSkillsList;
    }
  }

  ngOnChanges(changes: SimpleChanges)
  {
    if (changes.areSkillsDisplayedInGrid && !changes.areSkillsDisplayedInGrid.firstChange)
    {
      this.initGridClasses();
    }
  }

  onClickSkill(skillModel: Skill)
  {
    if (this.skillSlickEventEmitter.observers.length > 0)
    {
      this.skillSlickEventEmitter.emit(skillModel);
    }
  }

  private initGridClasses()
  {
    this.gridClass = (this.areSkillsDisplayedInGrid) ? 'grid-x grid-margin-x grid-margin-y' : 'grid-y grid-margin-y';
    this.cellClass = (this.areSkillsDisplayedInGrid) ? 'xsmall-6 small-4 medium-12' : '';
  }


}

