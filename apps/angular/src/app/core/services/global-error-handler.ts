import { ErrorHandler, Injectable, inject, NgZone } from '@angular/core';
import { GlobalErrorService } from './global-error';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private errorService = inject(GlobalErrorService);
  private ngZone = inject(NgZone);

  handleError(error: any): void {
    console.error('Global Error:', error);

    this.ngZone.run(() => {
      setTimeout(() => {
        this.errorService.show('Something went wrong. Please try again later.');
      });
    });
  }
}
