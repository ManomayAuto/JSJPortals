import { Component, OnInit,ViewChild, Inject } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { Observable } from 'rxjs/internal/Observable';
import { MatSort,MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DOCUMENT } from '@angular/common';
import { RedService } from '../_services/red.service';
import { DialogRedComponent } from '../dialog-red/dialog-red.component';

@Component({
  selector: 'app-reduced',
  templateUrl: './reduced.component.html',
  styleUrls: ['./reduced.component.css']
})
export class ReducedComponent implements OnInit {
  @ViewChild("MatSort1",{static:true}) MatSort1: MatSort;
  @ViewChild("MatSort2",{static:true}) MatSort2: MatSort;
  filter:any;

  displayedColumns: string[] = ['ClientName', 'PolicyNum','PremDue','EquityDate','DTE','popup','DateCompleted'];
  allSource;
  dataSource;
  Completed;
  Expired;
  Today;
  constructor(public dialog: MatDialog, private userService : RedService,@Inject(DOCUMENT) private _document: Document) { }
  public ngOnInit() {
    this.userService.getUser().subscribe(results => {
      //console.log("all",results);
      if(!results){
        return;
      }
      this.dataSource = new MatTableDataSource(results);
      

  
      /* all function */

      const filterred = "Completed";
      const result0 = results.filter(user => {
        return user.Status != filterred;
      }); 
      this.allSource = new MatTableDataSource(result0);
      this.allSource.sort = this.MatSort1;
      // console.log(this.allSource);
      /* All*/
      const Alll = "Completed";
      const result1 = results.filter(user => {
        return user.Status == Alll;
      }); 
      this.Completed = new MatTableDataSource(result1);
      console.log(this.Completed);
      /*Expired*/

      const Expireded = "0";
      const result2 = result0.filter(user => {
        return user.DTE < Expireded;
      }); 
      this.Expired = new MatTableDataSource(result2);
      this.Expired.sort = this.MatSort2;        
      /*Today*/
      const Todays = "7";
      const result3 = result0.filter(user => {
        return user.DTE == Todays;
      }); 
      this.Today = new MatTableDataSource(result3);
      }, error =>{
      console.log(error);
    })   

    
  }
  openDialog(ClientName,PolicyNum,correspondence,Followups,PhnNum,EmailId):void {
    const DialogRef = this.dialog.open(DialogRedComponent,{
      width: '85%',
      height:'370px',

      data:{ClientName:ClientName,policy:PolicyNum,comment:correspondence,Followups:Followups,PhnNum:PhnNum,EmailId:EmailId}
    
    });
    DialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.ngOnInit();
    });
  }

}

