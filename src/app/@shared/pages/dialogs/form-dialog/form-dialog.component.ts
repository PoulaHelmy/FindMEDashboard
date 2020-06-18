import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Inject,
  Output,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styles: ['./form-dialog.component.scss'],
})
export class FormDialogComponent implements OnInit {
  form: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cancelText: string;
      confirmText: string;
      message: string;
      title: string;
    },
    private mdDialogRef: MatDialogRef<FormDialogComponent>,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.form = this.formBuilder.group({
      filename: '',
    });
  }
  submit(form) {
    this.mdDialogRef.close(`${form.value.filename}`);
  }
  public cancel() {
    this.close(false);
  }
  public close(value) {
    this.mdDialogRef.close(value);
  }
  public confirm() {
    this.close(true);
  }
  @HostListener('keydown.esc')
  public onEsc() {
    this.close(false);
  }
  @HostListener('keydown.enter')
  public onEnter() {
    this.close(true);
  }
}
