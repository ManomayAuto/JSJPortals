import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SimpleNotificationsComponent } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
import {MatPaginator, MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';
import { QtableService } from 'src/app/_services/qtable.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DOCUMENT } from '@angular/common';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Router } from '@angular/router';

export interface PeriodicElement {
  Sno: number,
  QuoteID: string,
  Status:string,
  TypeofAction:string,
  Remarks:string,
  User:string,
  LastUpdatedAt:string,
  Action: string,
}

@Component({
  selector: 'app-reviewtable',
  templateUrl: './reviewtable.component.html',
  styleUrls: ['./reviewtable.component.css']
})
export class ReviewtableComponent implements OnInit {
  //name = 'Angular 5';
  displayedColumns = [ 'quoteid', 'reviewstatus', 'typeofaction', 'remarks', 'lastupdatedat', 'Action'];
  dataSource;

  
  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  role: string;
  name: string;
  message: string;

  constructor( private userService : QtableService,
    @Inject(DOCUMENT) private _document: Document,
    private http:HttpClient, private router : Router,public snackBar: MatSnackBar
    ) { }

ngOnInit(){
  this.role=localStorage.getItem('Role');
  console.log("role",this.role != 'cs');
  this.userService.getUser().subscribe(results => {
    console.log("Qtable",results);
    this.dataSource = new MatTableDataSource(results);
    this.dataSource.paginator = this.paginator;
  }, error =>{
      console.log(error);
  })
}


getRecord(quoteid,reviewerusername){
  this.name = localStorage.getItem('name');
  this.message="Quote is already picked up by " +reviewerusername;
  console.log(reviewerusername);
  console.log(this.name);
  if(reviewerusername == null || reviewerusername ==this.name){
  console.log("rev quoteid",quoteid);
  var reviewstatus = "In Progress"
  var userrole = localStorage.getItem('Role');
  var name = localStorage.getItem('name');
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  return this.http.post<any>(environment.URL + '/undquotestatus', {quoteid:quoteid,reviewstatus:reviewstatus,userrole:userrole,name:name},httpOptions ).
  subscribe((res: any) => {
    this.router.navigate(['/quotepage',{title:quoteid}]);
  });

  }
  else{
    this.snackBar.open(this.message, "Dismiss", {
      duration: 1000,
    }); 
  }

}



}






export interface PeriodicElement {

}
