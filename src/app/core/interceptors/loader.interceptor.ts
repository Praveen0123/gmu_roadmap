import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { SpinnerFacadeService } from '@app/root-store/spinner-store/spinner-facade.service';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor
{

  constructor
    (
      private spinnerFacadeService: SpinnerFacadeService
    ) { }


  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>>
  {
    const url: string = req.url;

    if (url.startsWith('/assets'))
    {
      return next.handle(req);
    }

    this.showLoader();

    return next.handle(req).pipe(finalize(() => this.onEnd()));
  }


  private onEnd(): void
  {
    this.hideLoader();
  }

  private showLoader(): void
  {
    this.spinnerFacadeService.showSpinner();
  }

  private hideLoader(): void
  {
    this.spinnerFacadeService.hideSpinner();
  }
}
