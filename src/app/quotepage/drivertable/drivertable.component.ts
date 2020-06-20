
import { Component, OnInit, ViewChild, EventEmitter, Output, Inject, Input } from '@angular/core';


import {MatPaginator, MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DriverdialogComponent } from '../driverdialog/driverdialog.component';
import { anl } from 'src/app/models/user.model';
import {driverservice} from '../quotepage.component';
import {dataformservice} from '../quotepage.component';
import { ActivatedRoute } from '@angular/router';

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
  view: boolean;
  length: any;
  and: any;
  trail: any;
  date: Date;
  constructor(private driverservice: driverservice,private dataformservice:dataformservice,public dialog: MatDialog,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,private asp : dataformservice,) {
      this.date = new Date();
     }

 

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.driverdata); 
    
  }
  ngAfterViewInit() {
    this.driverservice.$data.subscribe((data)=>{
      let quoteid =  this.route.snapshot.paramMap.get('view');
      console.log("view driver",quoteid);
      let act =  this.route.snapshot.paramMap.get('edit');
      if(quoteid != null||quoteid != undefined){
        console.log("vi111",quoteid);
        this.view=true;
      }
      if(act != null||act != undefined){
       
        this.view=true;
      }
      this.driverdata = data
      console.log("in driver table now ng after view");
      console.log(this.driverdata);
     
      this.dataSource = new MatTableDataSource(this.driverdata.filter(value => Object.keys(value).length !== 0));
      // this.length=this.dataSource;
      // this.and=this.length.length;
      console.log("length of data source",this.and);
          });
          
  }
  displayedColumns = ['DriverName', 'DOB', 'LicenseIssueDate', 'LicenseNumber', 'Actions'];

  @Output() data = new EventEmitter<any>();

 // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  openDialog(dataSource): void {
    console.log("s",this.driverdata.length);
    console.log("trick",dataSource);
    this.trail=dataSource.filteredData;
    this.driverdata=this.driverdata.filter(value => Object.keys(value).length !== 0)
    console.log(this.trail.length);

    if(this.trail.length<=4){
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
      console.log("if",this.driverdata.length);
      // if(this.driverdata.length<=5){
      this.dataSource = new MatTableDataSource(this.driverdata); 
      console.log("test3l",this.driverdata.length );
      this.asp.dataforms = this.driverdata;
      // }
    // else{
    //   console.log("one");
    //   this.snackBar.open(this.message,this.action, {
    //     duration: 1000,
    //   });
    // }
  }
    })
   
    // this.data.emit(this.driverdata);
    console.log("if",this.driverdata);
  } 
  else{
    console.log("else");
    this.snackBar.open(this.message,this.action, {
      duration: 1000,
    });
  }
}


removeAt(i: number,element):void {
 // console.log(this.dataSource.data.findIndex(element));
 console.log(i)
  const data = this.dataSource.data;
  data.splice(i,1);

  this.dataSource.data = data;
  console.log("delete",this.dataSource.data)
  this.dataSource = new MatTableDataSource(this.dataSource.data);//new
  console.log("deleteafter",this.dataSource)//new
  this.driverdata=this.dataSource.data;//new
  
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
  date: Date;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: anl) {
      this.date = new Date();
    }

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