import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FormDialogComponent } from './form-dialog.component';
@Injectable()
export class FormDialogService {
  constructor(private dialog: MatDialog) {}
  dialogRef: MatDialogRef<FormDialogComponent>;

  public open(options) {
    this.dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText,
      },
    });
  }
  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(
      take(1),
      map((res) => {
        return res;
      })
    );
  }
}