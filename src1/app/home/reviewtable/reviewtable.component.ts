import { Component, OnInit, ViewChild } from '@angular/core';
import { SimpleNotificationsComponent } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

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
const ELEMENT_DATA: PeriodicElement[] = [
  {Sno: 1, QuoteID: 'QPV1001', Status: 'To be reviewed', TypeofAction: 'Requote request', Remarks:'', User:'UW Managers', LastUpdatedAt:'', Action: 'Pickup for Review' },
  {Sno: 2, QuoteID: 'QPV1002', Status: 'In Progress', TypeofAction: 'Referral review', Remarks:'Info Requested', User:'RBrown', LastUpdatedAt:'03/03/2020 19:30', Action: 'Pickup for Review' },
];
@Component({
  selector: 'app-reviewtable',
  templateUrl: './reviewtable.component.html',
  styleUrls: ['./reviewtable.component.css']
})
export class ReviewtableComponent implements OnInit {
  name = 'Angular 5';
 
    constructor() {



}



ngOnInit(){

}

displayedColumns = ['Sno', 'QuoteID', 'Status', 'TypeofAction', 'Remarks', 'User', 'LastUpdatedAt', 'Action'];
dataSource= ELEMENT_DATA;

@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
@ViewChild(MatSort, {static: false}) sort: MatSort;

addbut(){
 window.alert("addbutton");
}
editbut(){
 window.alert("editbutton");
}


}






export interface PeriodicElement {

}
