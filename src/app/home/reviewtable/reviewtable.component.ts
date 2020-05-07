import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SimpleNotificationsComponent } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
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

  constructor( private userService : QtableService,
    @Inject(DOCUMENT) private _document: Document,
    private http:HttpClient, private router : Router
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


getRecord(quoteid){
  console.log("rev quoteid",quoteid);

  //  Set as(any)
  //   {
  //     this.dataService.SharedData = result;
  //   }
    this.router.navigate(['/quotepage',{title:quoteid}]);


}

}






export interface PeriodicElement {

}
