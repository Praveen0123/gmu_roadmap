import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { NavLinkModel } from '../../models';

@Component({
  selector: 'gmu-header-small',
  templateUrl: './header-small.component.html',
  styleUrls: ['./header-small.component.scss']
})
export class HeaderSmallComponent implements OnInit
{
  constructor
    (
      private navigationService: NavigationService
    ) { }

  ngOnInit(): void
  {
  }

  onClickAdvance()
  {
    this.navigationService.goToHomePage();
  }

}
