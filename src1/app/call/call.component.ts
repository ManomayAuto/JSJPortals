import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { NonService } from "../_services/non.service";
import { MatSort,MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DOCUMENT } from '@angular/common';
import { DialogCallComponent } from '../dialog-call/dialog-call.component';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css']
})
export class CallComponent implements OnInit {
 
  @ViewChild("MatSort1",{static:true}) MatSort1: MatSort;
  @ViewChild("MatSort2",{static:true}) MatSort2: MatSort;
  @ViewChild('pen', { read: MatSort, static: true }) sort1: MatSort;
  filter:any;

  displayedColumns: string[] = ['ClientName', 'PolicyNum','PremDue','EquityDate','DTE','popup','DateCompleted'];
  allSource;
  // dataSource;
  FollowDone;
  pen: any;
  Today;
  All;
  constructor(public dialog: MatDialog, private userService : NonService,@Inject(DOCUMENT) private _document: Document) { }
  public ngOnInit() {
    this.userService.getUser().subscribe(results => {
      //console.log("all",results);
      if(!results){
        return;
      }
      // this.dataSource = new MatTableDataSource(results);
      // this.dataSource.sort = this.sort;

  
      /* all function */

      const filterred = "Completed";
      const result0 = results.filter(user => {
        return user.Status != filterred;
      }); 
      this.allSource = new MatTableDataSource(result0);
      // this.allSource.sort = this.sort;
      //console.log(this.allSource);

      /* expired function */
      const filterValue = "Followed up";
      const result1 = result0.filter(user => {
        return user.Status == filterValue;
      }); 
      this.FollowDone = new MatTableDataSource(result1);
      // this.FollowDone.sort = this.sort;
      //console.log("expiredSource",this.expiredSource);

    /* All function */
       const filterValu = "Followed up";
       const result12 = result0.filter(user => {
       return user.Status != filterValu;
       }); 
       this.All = new MatTableDataSource(result12);
       this.All.sort = this.MatSort1;       
       console.log("All",this.All); 

    /* Today function */
      const filterValuee = "45";
      const result13 = result12.filter(user => {
      return user.DTE == filterValuee;
      }); 
      this.Today = new MatTableDataSource(result13);    
      // this.Today.sort = this.sort;  

      /*Pending function */
      const filterValuees = "38";
      const result14 = result12.filter(user => {
      return user.DTE < filterValuees;
      }); 
      this.pen= new MatTableDataSource(result14);   
      this.pen.sort = this.MatSort2;    
      
      }, error =>{
      console.log(error);
    })   

    
  }
  openDialog(ClientName,PolicyNum,correspondence,Followups,PhnNum,EmailId):void {
    const DialogRef = this.dialog.open(DialogCallComponent,{
      width: '82%',
      height:'480px',

      data:{ClientName:ClientName,policy:PolicyNum,comment:correspondence,Followups:Followups,PhnNum:PhnNum,EmailId:EmailId}
    
    });
    DialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

}

