import { Component, OnInit, ViewChild } from '@angular/core';
import { SimpleNotificationsComponent } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
export interface PeriodicElement {
  Sno: number,
  QuoteID: string,
  INBClientCode:string,
  INBIssuanceOrderNumber:string,
}
const ELEMENT_DATA: PeriodicElement[] = [

];
@Component({
  selector: 'app-inbrokerquotetable',
  templateUrl: './inbrokerquotetable.component.html',
  styleUrls: ['./inbrokerquotetable.component.css']
})
export class InbrokerquotetableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  displayedColumns = ['Sno', 'QuoteID', 'INBClientCode', 'INBIssuanceOrderNumber'];
  dataSource= ELEMENT_DATA;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
}
