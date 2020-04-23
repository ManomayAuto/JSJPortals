
import { Component, OnInit, ViewChild, EventEmitter, Output, Inject } from '@angular/core';

import {MatPaginator, MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DriverdialogComponent } from '../driverdialog/driverdialog.component';
import { anl } from 'src/app/models/user.model';

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

  message: string = 'More than 5 drivers cant be added';
  action :string='close';
  user: any;
  constructor(public dialog: MatDialog,public snackBar: MatSnackBar) { }

 

  ngOnInit() {

    this.dataSource = new MatTableDataSource(this.driverdata); 
    // console.log("test3",driverdata  );

  }

  displayedColumns = ['DriverName', 'DOB', 'LicenseIssueDate', 'LicenseNumber', 'Actions'];

  @Output() data = new EventEmitter<any>();

 // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  openDialog(DriverName,DOB,LicenseIssueDate,LicenseNumber,Driverclient,Driverwar,physical,drunk,previous,claimhistory,lossclaim): void {
    //console.log("s",this.driverdata.length<6);

    if(this.driverdata.length<=4){
      console.log("traol",this.driverdata );
    const dialogRef = this.dialog.open(DriverdialogComponent, {

      width: '1350px',

      height: '600px',
    data:{DriverName:DriverName,DOB:DOB,LicenseIssueDate:LicenseIssueDate,LicenseNumber:LicenseNumber,Driverclient:Driverclient,
      Driverwar:Driverwar,physical:physical,drunk:drunk,previous:previous,claimhistory:claimhistory,lossclaim:lossclaim}
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
  else{
    this.snackBar.open(this.message,this.action, {
      duration: 1000,
    });
  }
}

// openDialogs(DriverName,DOB,LicenseIssueDate,LicenseNumber,Driverclient,Driverwar,physical,drunk,previous,claimhistory,lossclaim):void {
//   const DialogRef = this.dialog.open(DriverdialogComponent,{
//     width: '75%',
//     height:'590px',

//     data:{DriverName:DriverName,DOB:DOB,LicenseIssueDate:LicenseIssueDate,LicenseNumber:LicenseNumber,Driverclient:Driverclient,
//       Driverwar:Driverwar,physical:physical,drunk:drunk,previous:previous,claimhistory:claimhistory,lossclaim:lossclaim}
//   //  data:{ClientName:ClientName,policy:PolicyNum,comment:correspondence,Followups:Followups,PhnNum:PhnNum,EmailId:EmailId}

//   });
//   DialogRef.afterClosed().subscribe(result => {
//     console.log('The dialog was closed');
//     this.ngOnInit();
//   });
// }
removeAt(index: number) {
  const data = this.dataSource.data;
  data.splice( index, 1);

  this.dataSource.data = data;
  
}
editUser(user) {
  const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    width: '475px',
    height: '500px',
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

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: anl) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}