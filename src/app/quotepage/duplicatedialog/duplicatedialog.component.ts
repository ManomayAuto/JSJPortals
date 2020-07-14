import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-duplicatedialog',
  templateUrl: './duplicatedialog.component.html',
  styleUrls: ['./duplicatedialog.component.css']
})
export class DuplicatedialogComponent implements OnInit {
  qd: string = ""
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,public dialogRef :MatDialogRef<DuplicatedialogComponent>) { 
if (data) {
    this.qd = data['quotedata']['result'] || this.qd;
    }
    console.log(data['quotedata']['result']);
    console.log(data['quotedata']);

  }

  ngOnInit() {
  }
  dupquotedata(){
    this.dialogRef.close(this.data);
}
yes(data){
  console.log(data);
  this.dialogRef.close(data);
  }
}
