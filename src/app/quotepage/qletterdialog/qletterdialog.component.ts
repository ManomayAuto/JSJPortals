import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-qletterdialog',
  templateUrl: './qletterdialog.component.html',
  styleUrls: ['./qletterdialog.component.css']
})
export class QletterdialogComponent implements OnInit {
  
  public breakpoint: number;
  first: string;
  last: string;
  prod: string;
  vehicle:string;
  lospay:string;
  type:string;
  deduct:string;
  drivewar:string;
  user:string;
  anp:string;
  discp:string;
  vehval:string;
  today: Date = new Date();
  myFormattedDate: string; 
  constructor( @Inject(MAT_DIALOG_DATA) public data,public dialogRef :MatDialogRef<QletterdialogComponent>,public datepipe: DatePipe,) { }

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 790 ? 1 : 2; //
    console.log("quotedialoggg");
  console.log(this.data);
  console.log(this.data['quotedata']['first']);
  this.first = this.data['quotedata']['first'];
  this.last = this.data['quotedata']['last'];
  this.prod = this.data['quotedata']['prod'];
  this.vehicle = this.data['quotedata']['make']['MakeModelCC'];
  this.lospay= this.data['quotedata']['losspayee']['Description'];
this.type=this.data['quotedata']['cover'];
this.deduct = this.data['quotedata']['deduct'];
this.drivewar = this.data['quotedata']['driverwar'];
this.user = this.data['quotedata']['username'];
this.anp = this.data['quotedata']['anp'];
this.discp = this.data['quotedata']['discp'];
this.myFormattedDate = this.datepipe.transform(this.today, 'M-d-yyyy');
this.vehval = this.data['quotedata']['vehval'];
  }
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 590 ? 1 : 2
  }
}