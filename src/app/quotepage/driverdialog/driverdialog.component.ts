import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-driverdialog',
  templateUrl: './driverdialog.component.html',
  styleUrls: ['./driverdialog.component.css']
})
export class DriverdialogComponent implements OnInit {
  driverForm : FormGroup;
  public breakpoint: number;
  datePipe = new DatePipe('en-US'); 
  wasFormChanged = false;
  constructor(private formBuilder: FormBuilder,public dialogRef :MatDialogRef<DriverdialogComponent>,) {

    this.driverForm = new FormGroup({
      DriverName:  new FormControl(),
      Driverwar: new FormControl(),
      DOB: new FormControl(),
      LicenseIssueDate: new FormControl(),
      LicenseNumber: new FormControl(),
    });
   }

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 790 ? 1 : 2; //
  }
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 590 ? 1 : 2
  }
  public get driverform(){
    return this.driverForm.controls;
  }
  // public onSubmit() {
  //   console.log("driver",this.driverform.DriverName.value);
  // }
  dig(){
    let driverdata = {
      DriverName :this.driverform.DriverName.value,
      LicenseIssueDate :this.datePipe.transform(this.driverform.LicenseIssueDate.value,  'yyyy-MM-dd'),
      DOB : this.datePipe.transform(this.driverform.DOB.value,  'yyyy-MM-dd'),
      LicenseNumber :this.driverform.LicenseNumber.value,
      // Driverwar : this.datePipe.transform(this.driverform.Driverwar.value,  'yyyy-MM-dd')
    }
    this.dialogRef.close(driverdata);
  }
}
