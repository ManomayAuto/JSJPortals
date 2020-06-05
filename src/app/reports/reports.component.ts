import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as FileSaver from 'file-saver';   

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  permission: string;

  constructor(public http: HttpClient) { }

  ngOnInit() {
    this.permission=localStorage.getItem('permission');
  }
  report1():void{
    console.log(this.permission);
    this.http.post<any>(environment.URL + "/quotetracker",
    {permission:this.permission},
      {responseType: "blob" as 'json'}).subscribe(data=>{
      FileSaver.saveAs(data, "quotetracker.xlsx");
      console.log(data);
   },
   error=>{
     console.log(error);
   });
   }
   report2():void{
    console.log(this.permission);
    this.http.post<any>(environment.URL + "/quotebycoverage",
    {permission:this.permission},
      {responseType: "blob" as 'json'}).subscribe(data=>{
      FileSaver.saveAs(data, "quotebycoverage.xlsx");
      console.log(data);
   },
   error=>{
     console.log(error);
   });
   }
   report3():void{
    console.log(this.permission);
    this.http.post<any>(environment.URL + "/quotefollowup",
    {permission:this.permission},
      {responseType: "blob" as 'json'}).subscribe(data=>{
      FileSaver.saveAs(data, "quotefollowup.xlsx");
      console.log(data);
   },
   error=>{
     console.log(error);
   });
   }
}
