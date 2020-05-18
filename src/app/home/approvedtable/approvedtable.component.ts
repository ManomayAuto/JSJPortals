import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SimpleNotificationsComponent } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
import {MatPaginator, MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';
import { QtableService } from 'src/app/_services/qtable.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';

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
  allSource: MatTableDataSource<import("c:/Users/consultants1/git us/JSJPortals/src/app/models/user.model").User>;

  constructor(private userService : QtableService,
    @Inject(DOCUMENT) private _document: Document,
    private http:HttpClient, private router : Router,public snackBar: MatSnackBar) { }

 
  displayedColumns = ['quoteid', 'initiatedusername','Add',];
  
  dataSource;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngOnInit(){
 
    this.userService.getUser().subscribe(results => {
     //console.log("Qtable",results);
      this.dataSource = new MatTableDataSource(results);
      const filterred = "Completed";
    const result0 = results.filter(user => {
      return user.reviewstatus == filterred;
    }); 
    console.log("trial",result0)
    this.allSource = new MatTableDataSource(result0);
    this.allSource.paginator = this.paginator;
    this.allSource.sort = this.sort;
    }, error =>{
        console.log(error);
    })
  }
  getRecord(quoteid){ 
    this.router.navigate(['/quotepage',{title:quoteid}]);
  }
}
