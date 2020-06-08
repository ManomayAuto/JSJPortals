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
  
// report-1
report1():void{
  console.log(this.permission);
  this.http.post<any>(environment.URL + "/InstalmentReminderFailedReport",
  {permission:this.permission},
    {responseType: "blob" as 'json'}).subscribe(data=>{
    FileSaver.saveAs(data, "InstalmentReminderFailedReport.xlsx");
    console.log(data);
 },
 error=>{
   console.log(error);
 });
 }

// report-2
report2():void{
  console.log(this.permission);
  this.http.post<any>(environment.URL + "/EmailFollowUps",
  {permission:this.permission},
    {responseType: "blob" as 'json'}).subscribe(data=>{
    FileSaver.saveAs(data, "EmailFollowUps.xlsx");
    console.log(data);
 },
 error=>{
   console.log(error);
 });
 }

// report-3
   report3():void{
    console.log(this.permission);
    this.http.post<any>(environment.URL + "/ConsolidatedActivityReport",
    {permission:this.permission},
      {responseType: "blob" as 'json'}).subscribe(data=>{
      FileSaver.saveAs(data, "ConsolidatedActivityReport.xlsx");
      console.log(data);
   },
   error=>{
     console.log(error);
   });
   }

  //  report-4
  report4():void{
    console.log(this.permission);
    this.http.post<any>(environment.URL + "/AEEscalation",
    {permission:this.permission},
      {responseType: "blob" as 'json'}).subscribe(data=>{
      FileSaver.saveAs(data, "AEEscalation.xlsx");
      console.log(data);
  },
  error=>{
    console.log(error);
  });
  }

  //  report-5
  report5():void{
    console.log(this.permission);
    this.http.post<any>(environment.URL + "/NONAEEscalation",
    {permission:this.permission},
      {responseType: "blob" as 'json'}).subscribe(data=>{
      FileSaver.saveAs(data, "NONAEEscalation.xlsx");
      console.log(data);
  },
  error=>{
    console.log(error);
  });
  }

  //  report-6
  report6():void{
    console.log(this.permission);
    this.http.post<any>(environment.URL + "/PendingWriteoff",
    {permission:this.permission},
      {responseType: "blob" as 'json'}).subscribe(data=>{
      FileSaver.saveAs(data, "PendingWriteoff.xlsx");
      console.log(data);
  },
  error=>{
    console.log(error);
  });
  }

  //report-7
  report7():void{
    console.log(this.permission);
    this.http.post<any>(environment.URL + "/ExpiredPolicies",
    {permission:this.permission},
      {responseType: "blob" as 'json'}).subscribe(data=>{
      FileSaver.saveAs(data, "ExpiredPolicies.xlsx");
      console.log(data);
  },
  error=>{
    console.log(error);
  });
  }
}
