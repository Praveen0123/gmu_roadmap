import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { AreaOfStudy } from '@gql';

@Injectable({
  providedIn: 'root'
})
export class NavigationService
{
  defaultNavigationExtras: NavigationExtras;

  ROUTES =
    {
      AreaOfStudy: '/area-of-study',
      ConnectWithCoach: '/connect-with-coach',
      Home: '/home',
      Example: '/example',
      Occupations: '/occupations',
      Welcome: '/welcome',
      Student: '/student-view',
    };

  constructor
    (
      private router: Router,
      private location: Location
    ) { }

  // CONNECT WITH COACH FORM
  goToConnectWithCoachForm()
  {
    const url = `${this.ROUTES.ConnectWithCoach}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }

  // BACK
  goBack()
  {
    this.location.back();
  }


  // HOME
  goToHomePage()
  {
    const url = `${this.ROUTES.Home}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }
  goToWelcomePage()
  {
    const url = `${this.ROUTES.Welcome}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }
  goToDegreeExplorerPage()
  {
    const url = `${this.ROUTES.Home}/pathway`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }
  goToPathwayDetails(id: string)
  {
    const url = `${this.ROUTES.Home}/pathway/${id}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }


  // OCCUPATIONS
  goToOccupationListPage()
  {
    const url = `${this.ROUTES.Occupations}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }
  goToOccupationDetailPage(occupationId: string)
  {
    const url = `${this.ROUTES.Occupations}/${occupationId}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }


  // AREA OF STUDY
  goToAreaOfStudyOccupationList(areaOfStudy: AreaOfStudy)
  {
    const url = `${this.ROUTES.AreaOfStudy}/occupation-list/${areaOfStudy.id}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }

  // Student View

  goToStudentViewPage()
  {
    const url = `${this.ROUTES.Student}`;
    this.router.navigate([url], this.defaultNavigationExtras);
  }
}
