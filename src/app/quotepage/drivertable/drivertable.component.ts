
import { Component, OnInit, ViewChild, EventEmitter, Output, Inject, Input } from '@angular/core';


import {MatPaginator, MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DriverdialogComponent } from '../driverdialog/driverdialog.component';
import { anl } from 'src/app/models/user.model';
import {driverservice} from '../quotepage.component';
import {dataformservice} from '../quotepage.component';

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
  @Input() childMessage:any;
  dataSource: MatTableDataSource<any>;
  driverdata: driverdata[] = [];

  message: string = 'More than 5 drivers cant be added';
  action :string='close';
  user: any;
  constructor(private driverservice: driverservice,private dataformservice:dataformservice,public dialog: MatDialog,
    public snackBar: MatSnackBar,private asp : dataformservice,) { }

 

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.driverdata); 
    
  }
  ngAfterViewInit() {
    this.driverservice.$data.subscribe((data)=>{
      this.driverdata = data
      console.log("in driver table now ng after view");
      console.log(this.driverdata);
     
      this.dataSource = new MatTableDataSource(this.driverdata.filter(value => Object.keys(value).length !== 0));
          });
          
  }
  displayedColumns = ['DriverName', 'DOB', 'LicenseIssueDate', 'LicenseNumber', 'Actions'];

  @Output() data = new EventEmitter<any>();

 // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  openDialog(): void {
    console.log("s",this.driverdata.length);
    this.driverdata=this.driverdata.filter(value => Object.keys(value).length !== 0)
    console.log(this.driverdata);
    //   {console.log(projet)
    //   let entries = Object.entries(projet);
    //   entries = entries.filter(([key, value]) => value !== ""); 
    //   //return Object.fromEntries(entries);
    // }
    
    // );
    if(this.driverdata.length<=4){
      console.log("traol",this.driverdata );
   
    const dialogRef = this.dialog.open(DriverdialogComponent, {

      width: '1350px',

      height: '600px',
    //data:{}
    });

  

    dialogRef.afterClosed().subscribe(result => {

      console.log("testtable2",result);
      if(result){
      this.driverdata.push(result);
      if(this.driverdata.length<=5){
      this.dataSource = new MatTableDataSource(this.driverdata); 
      console.log("test3l",this.driverdata.length );
      console.log("test3",this.driverdata );
      this.asp.dataforms = this.driverdata;
      }
    else{
      console.log("one");
      this.snackBar.open(this.message,this.action, {
        duration: 1000,
      });
    }}
    })
   
    // this.data.emit(this.driverdata);
    console.log("test4",this.driverdata);
  } 
  else{
    console.log("two");
    this.snackBar.open(this.message,this.action, {
      duration: 1000,
    });
  }
}


removeAt(index: number) {
  const data = this.dataSource.data;
  data.splice( index, 1);

  this.dataSource.data = data;
  
}
editUser(user) {
  console.log(user);
  console.log(user.Driverclient);
  console.log(user.claimhistory);
  console.log(user.drunk);
  console.log(user.lossclaim);
  console.log(user.physical);
  console.log(user.previous);
  user.Driverclient = +user.Driverclient;
  user.claimhistory = +user.claimhistory;
  user.drunk = +user.drunk;
  user.lossclaim = +user.lossclaim;
  user.physical = +user.physical;
  user.previous = +user.previous;
  const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    width: '1350px',
    height: '600px',
    data: user
  
  });

  dialogRef.afterClosed().subscribe(result => {
    this.user = user;
  });
}

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog.html',
})
export class DialogOverviewExampleDialog {
  public breakpoint: number;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: anl) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.breakpoint = window.innerWidth <= 790 ? 1 : 2; //
  }
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 590 ? 1 : 2
  }
}