import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  Driverclient: boolean;
  constructor(private formBuilder: FormBuilder,public dialogRef :MatDialogRef<DriverdialogComponent>,) {


    this.driverForm = this.formBuilder.group({
      DriverName:  ['', Validators.required],
      Driverwar: ['', Validators.required],
      DOB: ['', Validators.required],
      LicenseIssueDate: ['', Validators.required],
      LicenseNumber: ['',Validators.required]

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
      console.log("drivSer",driverdata);
      this.dialogRef.close(driverdata);   

  }
}
