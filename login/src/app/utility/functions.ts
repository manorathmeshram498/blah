import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {of} from 'rxjs';
import {ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {Observable} from 'rxjs';
import {MatDialogRef, MatDialog} from '@angular/material/dialog';


@Injectable()
export class Funcs {
  constructor(private snackbar: MatSnackBar, private dialog: MatDialog) {
  }

  handleError(error = 'check your internet Connection') {
    this.snackbar.open(error, '', {
      duration: 4000
    });
    return of(500);
  }

  assertion(message = 'Are you sure') {
     this.snackbar.open(message, '', {
       duration: 4000
     });
   }

   confirmDialog(title: string, message: string): Observable<boolean> {
     let dialogRef: MatDialogRef<ConfirmDialogComponent>;

     dialogRef = this.dialog.open(ConfirmDialogComponent);
     dialogRef.componentInstance.title = title;
     dialogRef.componentInstance.message = message;

     return dialogRef.afterClosed();
   }
}
