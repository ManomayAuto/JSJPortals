import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

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

 
  constructor(private http:HttpClient,public datepipe: DatePipe,private router : Router) { }
ngOnInit() {
 
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
    this.http.post<any>(environment.URL + `/searchquote`, {name:this.nameFilter.value,quote:this.quoteidFilter.value,DOB:this.days},httpOptions).subscribe((result) => { 
      console.log("searchdone!!!!",result);
      this.dataSource = new MatTableDataSource(result);
      this.dataSource.paginator = this.paginator;
    });  
    console.log("searchdone!!!!");
  }
  getRecord(QuoteID){ 
    this.router.navigate(['/quotepage/new',{title:QuoteID}]);
  }
}
