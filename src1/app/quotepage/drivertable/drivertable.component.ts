import { Component, OnInit, ViewChild } from '@angular/core';
import { SimpleNotificationsComponent } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DriverdialogComponent } from '../driverdialog/driverdialog.component';
export interface PeriodicElement {
  DriverName: string,
  DOB: string,
  LicenseIssueDate:string,
  LicenseNumber: number,
  Actions: string,
}
const ELEMENT_DATA: PeriodicElement[] = [
  {DriverName: 'Joey Felin', DOB: '02/12/1996', LicenseIssueDate: '02/15/2019', LicenseNumber: 865478822333, Actions: 'Edit'},
  {DriverName: 'Van Helsing', DOB: '01/25/1965', LicenseIssueDate: '02/11/2017', LicenseNumber: 465471825243, Actions: 'Edit' },
];
@Component({
  selector: 'app-drivertable',
  templateUrl: './drivertable.component.html',
  styleUrls: ['./drivertable.component.css']
})
export class DrivertableComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  displayedColumns = ['DriverName', 'DOB', 'LicenseIssueDate', 'LicenseNumber', 'Actions'];
  dataSource= ELEMENT_DATA;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  openDialog(): void {
    const dialogRef = this.dialog.open(DriverdialogComponent, {
      width: '1350px',
      height: '600px',
    });
  }
}
