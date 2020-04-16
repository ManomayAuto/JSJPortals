
import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';

import {MatPaginator, MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DriverdialogComponent } from '../driverdialog/driverdialog.component';

export interface driverdata {

  DriverName: string,

  DOB: string,

  LicenseIssueDate:string,

  LicenseNumber: number,

  Actions: string,

}

@Component({

  selector: 'app-drivertable',

  templateUrl: './drivertable.component.html',

  styleUrls: ['./drivertable.component.css']

})

export class DrivertableComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  driverdata: driverdata[] = [];

  message: string = 'Snack Bar opened.';
  action :string='close';
  constructor(public dialog: MatDialog,public snackBar: MatSnackBar) { }

 

  ngOnInit() {

    this.dataSource = new MatTableDataSource(this.driverdata); 
    // console.log("test3",driverdata  );

  }

  displayedColumns = ['DriverName', 'DOB', 'LicenseIssueDate', 'LicenseNumber', 'Actions'];

  @Output() data = new EventEmitter<any>();

 // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  openDialog(): void {

    const dialogRef = this.dialog.open(DriverdialogComponent, {

      width: '1350px',

      height: '600px',

    });

  

    dialogRef.afterClosed().subscribe(result => {

      console.log("test2",result);
      if(result){
      this.driverdata.push(result);
      if(this.driverdata.length<=5){
      this.dataSource = new MatTableDataSource(this.driverdata); 
      console.log("test3l",this.driverdata.length );
      console.log("test3",this.driverdata );
      }
    else{
      this.snackBar.open(this.message,this.action, {
        duration: 1000,
      });
    }}
    })
   
    // this.data.emit(this.driverdata);
    console.log("test4",this.driverdata);
    
    
}

}