import { Component, OnInit } from '@angular/core';
import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { IGoogleAnalyticEvent, GoogleAnalyticsService } from '@app/core/services/google-analytics/google-analytics.service';

@Component({
  selector: 'gmu-connect-with-coach',
  templateUrl: './connect-with-coach.component.html',
  styleUrls: ['./connect-with-coach.component.scss'],
})
export class ConnectWithCoachComponent implements OnInit
{

  constructor
    (
      private navigationService: NavigationService,
      private gas: GoogleAnalyticsService
    ) { }

  ngOnInit(): void { }

  openConnectWCoachForm(): void
  {
    this.navigationService.goToConnectWithCoachForm();

    // GOOGLE ANALYTICS
    const googleAnalyticEvent: IGoogleAnalyticEvent =
    {
      eventName: 'event',
      eventCategory: 'Connect With Coach',
      eventAction: 'CTA Clicked',
      eventLabel: 'YES',
      eventValue: null

    };

    this.gas.emitEvent(googleAnalyticEvent);
  }
}
