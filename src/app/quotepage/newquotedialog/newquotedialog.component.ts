import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-newquotedialog',
  templateUrl: './newquotedialog.component.html',
  styleUrls: ['./newquotedialog.component.css']
})
export class NewquotedialogComponent implements OnInit {
  qid: string = ""
  qs: string = ""
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,public dialogRef :MatDialogRef<NewquotedialogComponent>) {
    if (data) {
      this.qid = data['quoteid'] || this.qid;
      this.qs = data['quotestatus'] || this.qs;
      console.log(data['quotestatus'])
      }
   }

  ngOnInit() {
  }
  yes(data){
    console.log(data);
    this.dialogRef.close(data);
    }
    
}
