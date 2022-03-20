import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../materialModule/custom-snackbar/custom-snackbar.component';

@Injectable()
export class SnackbarService {

  constructor(
    public snackBar: MatSnackBar,
  ) { }

  successToaster(msg: any, action: any) {
    // this.snackBar.open(msg, action, {
    //   extraClasses: ['custom-success-toaster'],
    //   duration: 2000,
    //   verticalPosition: 'top',
    // });
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      panelClass: ['theme-bg-color', 'text-white'],
      duration: 2000,
      verticalPosition: 'top',
      data: { message: msg, faIcon: 'fa fa-check' },
    });
  }

  errorToaster(msg: any, action: any) {
    // this.snackBar.open(msg, action, {
    //   extraClasses: ['custom-error-toaster'],
    //   duration: 2000,
    //   verticalPosition: 'top',
    // });
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      panelClass: ['theme-bg-color', 'text-white'],
      duration: 2000,
      verticalPosition: 'top',
      data: { message: msg, faIcon: 'fa fa-times' },
    });
  }

  warningToaster(msg: any, action: any) {
    // this.snackBar.open(msg, action, {
    //   extraClasses: ['custom-warning-toaster'],
    //   duration: 2000,
    //   verticalPosition: 'top',
    // });
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      panelClass: ['theme-bg-color', 'text-white'],
      duration: 2000,
      verticalPosition: 'top',
      data: { message: msg, faIcon: 'fa fa-exclamation-circle' },
    });
  }
}
