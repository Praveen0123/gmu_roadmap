import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@app/core/services/navigation/navigation.service';

@Component({
  selector: 'gmu-occupation-list',
  templateUrl: './occupation-list.component.html',
  styleUrls: ['./occupation-list.component.scss']
})
export class OccupationListComponent implements OnInit
{

  constructor
    (
      private navigationService: NavigationService
    ) { }

  getOccupationProfileDetails()
  {
    this.navigationService.goToOccupationDetailPage("OCC-1001");
  }

  ngOnInit(): void
  {
  }

}
