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
  console.log(this.data['quotedata']['make']);
  console.log(this.data['quotedata']['make']['MakeModelCC']);
  if(this.data['quotedata']['make']){
    this.vehicle = this.data['quotedata']['make'];
  }
 if(this.data['quotedata']['make']['MakeModelCC']){
  this.vehicle = this.data['quotedata']['make']['MakeModelCC'];
 }
  console.log(this.vehicle);
  this.lospay= this.data['quotedata']['losspayee']['Description'];
  if(this.lospay == null || this.lospay == undefined || this.lospay == ""){
    this.lospay = "Not Applicable/Not Available"
  }
this.type=this.data['quotedata']['cover'];
this.deduct = this.data['quotedata']['deduct'];

if(this.deduct == null || this.deduct == undefined || this.deduct == ""){
  this.deduct = "0"
}
this.drivewar = this.data['quotedata']['driverwar'];

if(this.drivewar == "A"){
  this.drivewar = "Any Driver"
}
else if(this.drivewar == "B"){
  this.drivewar = "Insured Only"
}
else if(this.drivewar == "C"){
  this.drivewar = "Insured + One Named Driver"
}
else if(this.drivewar == "D"){
  this.drivewar = "Insured + Two Or More Named Drivers"
}
else if(this.drivewar == "E"){
  this.drivewar = "Named driver(s) excluding the Insured"
}
else if(this.drivewar == "F"){
  this.drivewar = "Anyone 21 yrs. & older with a licence for 2 yrs. or more"
}
else if(this.drivewar == "G"){
  this.drivewar = "Anyone 25 yrs. & older with a licence for 2 yrs. or more"
}
this.user = this.data['quotedata']['username'];
this.anp = this.data['quotedata']['anp'];
this.discp = this.data['quotedata']['discp'];
this.myFormattedDate = this.datepipe.transform(this.today, 'MMMM-d-yyyy');
this.vehval = this.data['quotedata']['vehval'];
if(this.type == "Third Party"){
  this.vehval = "Not Applicable"
}
else if(this.vehval == null || this.vehval == undefined || this.vehval == ""){
  this.vehval = "0"
}
  }
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 590 ? 1 : 2
  }
}