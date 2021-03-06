import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { SimpleNotificationsComponent } from 'angular2-notifications';
import { NotificationsService } from 'angular2-notifications';
import {MatPaginator, MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { AtableService } from 'src/app/_services/atable.service';

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
  userrole: string;

  constructor(private userService : AtableService,
    @Inject(DOCUMENT) private _document: Document,
    private http:HttpClient, private router : Router,public snackBar: MatSnackBar) { }

 
  displayedColumns = ['quoteid', 'reviewerusername','Add',];
  
  dataSource;
  
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  ngOnInit(){
    this.userrole = localStorage.getItem('Role');
    console.log("approved");
    this.userService.getUser().subscribe(results => {
     //console.log("Qtable",results);
      this.dataSource = new MatTableDataSource(results);
      const filterred = "Completed";
    const result0 = results.filter(user => {
      return user.reviewstatus == filterred;
    }); 
    console.log("trialapproved",result0)
    this.allSource = new MatTableDataSource(result0);
    this.allSource.paginator = this.paginator;
    this.allSource.sort = this.sort;
    }, error =>{
        console.log(error);
    })
  }
  getRecord(quoteid){ 
    if(this.userrole=='cs'){
      this.router.navigate(['/quotepage/new',{title:quoteid,edit:'Active'}]);
    }
    else{
    this.router.navigate(['/quotepage',{title:quoteid}]);
  }
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.allSource.filter = filterValue.trim().toLowerCase();
  }
}
