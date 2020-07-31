import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { DialogContentExampleComponent } from '../dialog-content-example/dialog-content-example.component';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from "../_services/user.service";
import { MatSort,MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DOCUMENT } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { AuthenticationService } from '../_services/authentication.service';
import { MatTabGroup } from '@angular/material';


@Component({ 
  selector: 'app-ae',
  templateUrl: './ae.component.html', 
  styleUrls: ['./ae.component.css']
})
export class AEComponent implements OnInit {
  @ViewChild("MatSort1",{static:true}) MatSort1: MatSort;
  @ViewChild("MatSort2",{static:true}) MatSort2: MatSort;
  @ViewChild("MatSort0",{static:true}) MatSort0: MatSort;
  @ViewChild("MatSort3",{static:true}) MatSort3: MatSort;
  @ViewChild(LoginComponent ,{static:true}) child : LoginComponent;
  @ViewChild('tabGroup',{static:false}) tabGroup: MatTabGroup;

  filter:any;

  displayedColumns: string[] = ['ClientId','ClientName', 'PolicyNum','PremDue','EquityDate','DTE','Followups','LastFollowUp','ExpectedDate','DateCompleted','popup'];
  allSource;
  CompleteSource;
  dataSource;
  expiredSource;
  reductionSource;
  fifteenSource;
  thirtySource;
  fourSource;
  sixtySource;
  localStorage: any;
  datalogin: string;
  constructor(public dialog: MatDialog, private userService : UserService,
    @Inject(DOCUMENT) private _document: Document, private as : AuthenticationService) { }
  public ngOnInit() {
    
   // console.log("user",this.as.getCurrentUser);
    this.datalogin=localStorage.getItem('currentUser');
    console.log(localStorage.getItem('currentUser'));
        this.userService.getUser().subscribe(results => {
      //console.log("all",results); 
      console.log(results);
      if(!results){

        return;
      } 
      this.dataSource = new MatTableDataSource(results);
      // console.log("try",result.PhnNum1);
        /* Reduced function */

        const filtered = "Completed";
        const resultss = results.filter(user => {
          return user.Status == filtered;
        }); 
        this.CompleteSource = new MatTableDataSource(resultss);
        this.CompleteSource.sort = this.MatSort0;
        //console.log("expiredSource",this.CompleteSource);
  
      /* all function */

      const filterred = "Completed";
      const result0 = results.filter(user => {
        return user.Status != filterred;
      }); 
      this.allSource = new MatTableDataSource(result0);
      this.allSource.sort = this.MatSort1;
      console.log("All",this.allSource);

      /* expired function */
      const filterValue = "0";
      const result1 = result0.filter(user => {
        return user.DTE < filterValue;
      }); 
      this.expiredSource = new MatTableDataSource(result1);
      this.expiredSource.sort = this.MatSort2; 
      //console.log("expiredSource",this.expiredSource);

      // trial
      const result122 = result0.filter(user =>{
        return user.DTE > filterValue;
      })
      console.log(result122);
      /* reduction function */
      const filterReductions= 1;
      const result2 = result122.filter(user => {
        return +user.DTE == filterReductions;
        //user.DTE > filterValue && user.DTE <=filterReductions;
        
        
        
        //  user.DTE < filterReductions;
      }); 
      this.reductionSource = new MatTableDataSource(result2);
      this.reductionSource.sort = this.MatSort3;
     
      /* reduction15 function */
      const filter15= "15";
      const result3 = result0.filter(user => {
        return user.DTE == filter15;
      }); 
      this.fifteenSource = new MatTableDataSource(result3);
      //console.log("15Source ;",this.fifteenSource);

      /* reduction30 function */
      const filter30= "30";
      const result4 = result0.filter(user => {
        return user.DTE == filter30;
      }); 
      this. thirtySource = new MatTableDataSource(result4);
      //console.log(" 30Source;",this. thirtySource);

       /* reduction45 function */
      const filter45= "45";
      const result5 = result0.filter(user => {
        return user.DTE == filter45;
      }); 
      this. fourSource = new MatTableDataSource(result5);
      //console.log(" 45Source;",this. fourSource);
      
       /* reduction60 function */
      const filter60= "60";
      const result6 = result0.filter(user => {
        return user.DTE == filter60;
      }); 
      this. sixtySource = new MatTableDataSource(result6);
      //console.log(" 60Source;",this. sixtySource);
      }, error =>{
      console.log(error);
    })   

    
  }
  openDialog(ClientName,PolicyNum,correspondence,Followups,PhnNum1,PhnNum2,PhnNum3,EmailId):void {
    const DialogRef = this.dialog.open(DialogContentExampleComponent,{
      width: '75%',
      height:'590px',

      data:{ClientName:ClientName,policy:PolicyNum,comment:correspondence,Followups:Followups,PhnNum1:PhnNum1,PhnNum2:PhnNum2,PhnNum3:PhnNum3,EmailId:EmailId}
    
    });
    DialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

}