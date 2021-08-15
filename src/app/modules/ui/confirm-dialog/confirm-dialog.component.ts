import {Component, Inject,} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  title: string;
  content: string;
  cancelText: string;
  acceptText: string;
  showAgain: boolean;
  tag: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

  noShowAgain: boolean | undefined;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    if (this.noShowAgain) {
      localStorage.setItem(this.data.tag, 'true');
    }
    this.dialogRef.close(true);
  }
}
