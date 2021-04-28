import { Component, OnInit } from '@angular/core';
import { filter, takeWhile, map } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { NavLinkModel } from '@app/features/student-view/models/nav-links';
import { Pathway } from '@gql';
import { PathwayFacadeService } from '@app/root-store/pathway-store/pathway-facade.service';
import { SkillsRoadmapModel } from '@app/root-store/student-skills-roadmap-store/skills-roadmap-state';
import { Observable } from 'rxjs';
import { SkillsRoadmapFacadeService } from '@app/root-store/student-skills-roadmap-store/skills-roadmap-facade.service';


@Component({
  selector: 'gmu-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.scss']
})
export class StudentViewComponent implements OnInit
{

  skillRoadmap$: Observable<SkillsRoadmapModel[]>;


  private alive = true;


  description: string;
  navLinks: NavLinkModel[];

  selectedPathway: Pathway;


  constructor(private router: Router, private pathwayFacadeService: PathwayFacadeService,
    private SkillsRoadmapFacadeService: SkillsRoadmapFacadeService) { }

  ngOnInit(): void
  {

    this.skillRoadmap$ = this.SkillsRoadmapFacadeService.getskillRoadmapList();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeWhile(() => this.alive),
        map((event: NavigationEnd) =>
        {
          this.buildNavLinks();
        })
      ).subscribe();

    this.pathwayFacadeService.getPathway()
      .pipe
      (
        takeWhile(() => this.alive),
        map((item: Pathway) =>
        {
          this.selectedPathway = item;
          this.buildNavLinks();
        })
      ).subscribe();
  }

  ngOnDestroy(): void
  {
    this.alive = false;
  }

  private buildNavLinks(): void
  {
    const skillsTranscriptRoute = '/student-view/student-view-skills-transcript';
    const skillsRoadmapRoute = `/student-view/student-view-skills-roadmap`;
    const skillsProfileRoute = '/student-view/student-view-skills-profile';
    const skillsMilestonesRoute = '/student-view/student-view-skills-milestones';

    const navLinks: NavLinkModel[] = [
      {
        label: 'MILESTONES',
        path: skillsMilestonesRoute,
        icon: '',
        message: '',
        isActive: (skillsMilestonesRoute.includes(this.router.url))
      },
      {
        label: 'PLANNER',
        path: skillsProfileRoute,
        icon: '',
        message: '',
        isActive: (skillsProfileRoute.includes(this.router.url))
      },
      {
        label: 'ROADMAP',
        path: skillsRoadmapRoute,
        icon: '',
        message: '',
        isActive: (skillsRoadmapRoute.includes(this.router.url))
      },
      {
        label: 'TRANSCRIPT',
        path: skillsTranscriptRoute,
        icon: '',
        message: '',
        isActive: (skillsTranscriptRoute.includes(this.router.url))
      },
    ];

    this.navLinks = navLinks;
  }


}
