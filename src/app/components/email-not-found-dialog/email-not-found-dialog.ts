import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
@Component({
  selector: 'app-email-not-found-dialog',
  imports: [],
  templateUrl: './email-not-found-dialog.html',
  styleUrl: './email-not-found-dialog.css',
})
export class EmailNotFoundDialog {
  constructor(
    public dialogRef:MatDialogRef<EmailNotFoundDialog>,
    @Inject(MAT_DIALOG_DATA) public data:{message:string} 
  ){}
  close(){
    this.dialogRef.close();
  }
}
