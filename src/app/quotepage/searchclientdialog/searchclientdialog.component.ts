import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-searchclientdialog',
  templateUrl: './searchclientdialog.component.html',
  styleUrls: ['./searchclientdialog.component.css']
})
export class SearchclientdialogComponent implements OnInit {
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['name','lname','dob','idtype','idno','mno','address','street','country','zipcode','town','action'];
  elements: any;
  // dialogRef: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef :MatDialogRef<SearchclientdialogComponent>,
  ) { }

  ngOnInit() {
    console.log(this.data.abcd)
    this.elements = this.data.abcd
    
    console.log(typeof(this.elements))
    this.dataSource = new MatTableDataSource(this.data.abcd);
    console.log("try",this.dataSource);
  }

  onSelect(selectedelement: any) {
    console.log("Selected item Id: ", selectedelement); // You get the Id of the selected item here
    this.dialogRef.close(selectedelement);
}
}
