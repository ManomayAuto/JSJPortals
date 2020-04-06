import { Component, OnInit, ViewChild } from '@angular/core';
import { SimpleNotificationsComponent } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  Sno: number,
  QuoteID: string,
  Add:string,
}
const ELEMENT_DATA: PeriodicElement[] = [
  {Sno: 1, QuoteID: 'QPV1003', Add: 'Add Details',},
  {Sno: 2, QuoteID: 'QPV1006', Add: 'Add Details', },
];
@Component({
  selector: 'app-approvedtable',
  templateUrl: './approvedtable.component.html',
  styleUrls: ['./approvedtable.component.css']
})
export class ApprovedtableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  displayedColumns = ['Sno', 'QuoteID', 'Add',];
  dataSource= ELEMENT_DATA;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
}
