import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-duplicatedialog',
  templateUrl: './duplicatedialog.component.html',
  styleUrls: ['./duplicatedialog.component.css']
})
export class DuplicatedialogComponent implements OnInit {
  quotedata: string = ""
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,public dialogRef :MatDialogRef<DuplicatedialogComponent>) { 
    if (data) {
      this.quotedata = data.quotedata || this.quotedata;
    }
  }

  ngOnInit() {
  }

}
