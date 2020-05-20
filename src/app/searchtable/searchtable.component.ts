import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';


export interface PeriodicElement {
  name: string;
  dob: string;
  product: string;
  quoteid: string;
  edit: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'John Smith', dob: 'QPV1003' , product: '01/01/2020', quoteid: 'Active', edit: 'x'},
    { name: 'Phil Doey', dob:'QPV1004' , product: '08/02/2020', quoteid: 'Declined', edit: 'x' },
];



@Component({
  selector: 'app-searchtable',
  templateUrl: './searchtable.component.html',
  styleUrls: ['./searchtable.component.css']
})
export class SearchtableComponent implements OnInit {

  displayedColumns: string[] = ['name', 'dob', 'product', 'quoteid', 'edit'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  
  nameFilter = new FormControl();
  dobFilter = new FormControl();
  productFilter = new FormControl();
  quoteidFilter = new FormControl();
  filteredValues = { name:'', dob:'',product:'',
  quoteid:'', edit:''};
  //SearchForm: FormGroup;
 
  constructor(private http:HttpClient) { }
ngOnInit() {
 
  this.nameFilter.valueChanges.subscribe((nameFilterValue)        => {
    this.filteredValues['name'] = nameFilterValue;
    this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.dobFilter.valueChanges.subscribe((dobFilterValue) => {
      this.filteredValues['dob'] = dobFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.productFilter.valueChanges.subscribe((productFilterValue) => {
      this.filteredValues['product'] = productFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });

    this.quoteidFilter.valueChanges.subscribe((quoteidFilterValue) => {
      this.filteredValues['quoteid'] = quoteidFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
    this.quoteidFilter.valueChanges.subscribe((quoteidFilterValue) => {
      this.filteredValues['edit'] = quoteidFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
    });
  this.dataSource.filterPredicate = this.customFilterPredicate();
  
}

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  // numFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   this.dataSource.filterPredicate = (data: any, fitlerString: string) => {

  //       return data.position == filterValue;
  //   };
  //   this.dataSource.filter = filterValue;
  // }

  customFilterPredicate() {
    const myFilterPredicate = function(data:PeriodicElement,filter:string) :boolean {
      let searchString = JSON.parse(filter);
      return data.quoteid.toString().trim().indexOf      (searchString.quoteid) !== -1 && 
    data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1;
    }
    return myFilterPredicate;
  }
 

  onSearch1(){
    
    console.log("name",this.nameFilter.value,this.quoteidFilter.value,this.dobFilter.value);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    console.log("searchdone");
    this.http.post<any>(environment.URL + `/searchquote`, {name:this.nameFilter.value,quote:this.quoteidFilter.value,DOB:this.dobFilter.value },httpOptions).subscribe((result) => { 
      console.log("searchdone!!!!",result)
    });  
    console.log("searchdone!!!!");
  }
}
