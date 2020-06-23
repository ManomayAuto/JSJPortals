import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSnackBar } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import {MatSort} from '@angular/material/sort';


export interface PeriodicElement {
  name: string;
  dob: string;
  product: string;
  quoteid: string;
  edit: string;
}





@Component({
  selector: 'app-searchtable',
  templateUrl: './searchtable.component.html',
  styleUrls: ['./searchtable.component.css']
})
export class SearchtableComponent implements OnInit {
  @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['ClientName', 'QuoteIssuanceDate', 'QuoteStatus', 'QuoteID', 'edit'];
  dataSource;

  
  nameFilter = new FormControl();
  dobFilter = new FormControl();
  productFilter = new FormControl();
  quoteidFilter = new FormControl();
  filteredValues = { name:'', dob:'',product:'',
  quoteid:'', edit:''};
  name: string;
  dob: any;
  quote: any;
  SearchForm: any;
  days: string;
  sta: boolean;
  userrole: string;
  //nameFilter : string;
 
  constructor(private http:HttpClient,public datepipe: DatePipe,private router : Router,public snackBar: MatSnackBar,) { }
ngOnInit() {
  this.userrole = localStorage.getItem('Role');
}

  onSearch1(){
    this.datepipe = new DatePipe('en-Us');
    console.log("name1",this.nameFilter.value);
    console.log("name2",this.dobFilter.value);
    console.log("name3",this.quoteidFilter.value);
    let day=this.dobFilter.value;
    console.log("name23",day);
    this.days = this.datepipe.transform(day, 'yyyy-MM-dd');
    console.log("name3",this.days);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log("searchdone");
    this.http.post<any>(environment.URL + `/searchquote`, {name:this.nameFilter.value,quote:this.quoteidFilter.value,DOB:this.days},
    httpOptions).subscribe((result) => { 
      console.log("searchdone!!!!",result);
      this.dataSource = new MatTableDataSource(result);
      console.log("searchdone!!!!",this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // if(result.QuoteStatus=="For Review"){
      //   console.log("rev")
      //   this.sta = true;
      //  }else{
      //   this.sta = false;
      // }
    });  
    console.log("searchdone!!!!");
  }
  reset(){
    console.log("searchdone!!!!");
    this.nameFilter.reset();
    this.dobFilter.reset();
    this.quoteidFilter.reset();
    this.dataSource='';
  }

  getRed(QuoteID){ 
    this.router.navigate(['/quotepage/new',{view:QuoteID}]);
  }
  
  getRecord(QuoteID,QuoteStatus){ 
    console.log(QuoteStatus);
    if(QuoteStatus != 'Declined'){
    if(this.userrole=="cs"){
    if(QuoteStatus == 'Active'){
    this.router.navigate(['/quotepage/new',{title:QuoteID,edit:'Active'}]);
    }else{
    this.router.navigate(['/quotepage/new',{title:QuoteID}]);
    }
  }else{
    this.router.navigate(['/quotepage/new',{title:QuoteID}]);
  }
}
else{
   this.snackBar.open("Cannot edit a Declined quote", "Dismiss", {
    duration: 1000,
  }); }
  }
}
