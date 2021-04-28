import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { AreaOfStudy, Occupation } from '@gql';
import { AreaOfStudyFacadeService } from '@app/root-store/area-of-study-store/area-of-study-facade.service';


@Component({
  selector: 'gmu-occupations',
  templateUrl: './occupations.component.html',
  styleUrls: ['./occupations.component.scss'],
})
export class OccupationsComponent implements OnInit
{
  areaOfStudyList$: Observable<AreaOfStudy[]>;

  constructor
    (
      private areaOfStudyFacadeService: AreaOfStudyFacadeService,
      private navigationService: NavigationService
    ) { }

  ngOnInit(): void
  {
    this.areaOfStudyList$ = this.areaOfStudyFacadeService.getAreaOfStudyList();
  }

  onOccupationSearchTermSubmission(searchTerm: string)
  {
    console.log('OCCUPATION SEARCH TERM', searchTerm);
  }

  onAreaOfStudyClick(areaOfStudy: AreaOfStudy)
  {
    this.areaOfStudyFacadeService.setSelectedAreaOfStudy(areaOfStudy);
    this.navigationService.goToAreaOfStudyOccupationList(areaOfStudy);
  }

  onOccupationClick(occupation: Occupation)
  {
    this.navigationService.goToOccupationDetailPage(occupation.vpOccupationId);
  }
}
