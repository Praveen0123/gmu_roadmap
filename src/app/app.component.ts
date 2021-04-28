import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { takeWhile, map } from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner';

import { environment } from '@env/environment';
import { CustomIconRegistryService } from './core/services/custom-icon-registry/custom-icon-registry.service';
import { DeviceFacadeService } from './root-store/device-store/device-facade.service';
import { DeviceCharacteristics } from './root-store/device-store/device.state';
import { SpinnerFacadeService } from './root-store/spinner-store/spinner-facade.service';
import { UserProfileFacadeService } from './root-store/user-profile-store/user-profile-facade.service';

@Component({
  selector: 'gmu-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy
{
  private alive = true;
  private timer = null;


  deviceCharacteristics$: Observable<DeviceCharacteristics>;

  constructor
    (
      private customIconRegistryService: CustomIconRegistryService,
      private deviceFacadeService: DeviceFacadeService,
      private spinnerFacadeService: SpinnerFacadeService,
      private userProfileFacadeService: UserProfileFacadeService,
      private spinner: NgxSpinnerService
    )
  {
    this.customIconRegistryService.init();
  }

  ngOnInit(): void
  {
    this.deviceFacadeService.monitorDeviceCharacteristics$().pipe(takeWhile(() => this.alive)).subscribe();
    this.deviceCharacteristics$ = this.deviceFacadeService.getDeviceCharacteristics$();

    // establish user profile
    this.userProfileFacadeService.createUserProfile();


    // MONITOR SPINNER COUNT
    this.spinnerFacadeService.getSpinnerCount()
      .pipe
      (
        takeWhile(() => this.alive),
        map((spinnerCount: number) =>
        {
          clearTimeout(this.timer);

          this.timer = setTimeout(() =>
          {
            if (spinnerCount !== 0)
            {
              this.showSpinner();
            }
            else
            {
              this.hideSpinner();
            }
          }, (spinnerCount !== 0) ? 0 : 1000);

        })
      ).subscribe();

  }

  ngOnDestroy(): void
  {
    this.alive = false;
  }

  private showSpinner()
  {
    this.spinner.show(undefined,
      {
        bdColor: 'rgba(51,51,51,0.8)',
        color: 'white',
        fullScreen: true,
        size: 'large',
        type: 'square-jelly-box'
      }
    );
  }

  private hideSpinner()
  {
    this.spinner.hide();
  }
}
