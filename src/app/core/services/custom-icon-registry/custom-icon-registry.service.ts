import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({
  providedIn: 'root',
})
export class CustomIconRegistryService
{
  private isInitialized = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  readonly iconNameToSoureMappings: { [iconName: string]: string; } =
    {
      ['icon-check-mark']: '/assets/icons/icon-check-mark.svg',
      ['icon_chevron_left']: '/assets/icons/icon_chevron_left.svg',
      ['icon_chevron_right']: '/assets/icons/icon_chevron_right.svg',
      ['icon-circle-checkmark']: '/assets/icons/icon-circle-check-mark.svg',
      ['icon-coach_w_bg']: '/assets/icons/Coach_Icon_w_background.svg',
      ['icon-degree-explorer']: '/assets/icons/icon-degree-explorer.svg',
      ['icon-feather']: '/assets/icons/Icon-feather-menu.svg',
      ['icon-gmu']: '/assets/icons/GMU_logo.svg',
      ['icon-login']: '/assets/icons/icon-login.svg',
      ['icon-nova']: '/assets/icons/NOVA_logo.svg',
      ['icon-occupations']: '/assets/icons/icon-occupations.svg',
      ['icon-shadow-checkmark']: '/assets/icons/icon-shadow-check-mark.svg',
      ['roadmap']: '/assets/roadmap/roadmap.svg',
      ['rooftop-blue']: '/assets/roadmap/rooftop-blue.svg',
      ['rooftop-green']: '/assets/roadmap/rooftop-green.svg',
      ['rooftop-orange']: '/assets/roadmap/rooftop-orange.svg',
      ['rooftop-yellow']: '/assets/roadmap/rooftop-yellow.svg',
      ['year-1-circle']: '/assets/roadmap/year-1-circle.svg',
      ['year-2-circle']: '/assets/roadmap/year-2-circle.svg',
      ['year-3-circle']: '/assets/roadmap/year-3-circle.svg',
      ['year-4-circle']: '/assets/roadmap/year-4-circle.svg',
      ['Grad_Icon_AdminView']: '/assets/student/Grad_Icon_AdminView.svg',
    };

  init()
  {
    if (this.isInitialized)
    {
      return;
    }

    Object.keys(this.iconNameToSoureMappings).forEach((iconName) =>
    {
      this.matIconRegistry.addSvgIcon(
        iconName,
        this.domSanitizer.bypassSecurityTrustResourceUrl(
          this.iconNameToSoureMappings[iconName]
        )
      );
    });

    this.isInitialized = true;
  }
}
