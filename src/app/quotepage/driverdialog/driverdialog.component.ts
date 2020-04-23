import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    public dialogRef :MatDialogRef<DriverdialogComponent>,) {

    this.driverForm = new FormGroup({
      DriverName:  new FormControl(),
      Driverwar: new FormControl(),
      DOB: new FormControl(),
      LicenseIssueDate: new FormControl(),
      LicenseNumber: new FormControl(),
      Driverclient: new FormControl(false),
      physical: new FormControl(false),
      drunk: new FormControl(false),
      previous: new FormControl(false),
      claimhistory: new FormControl(false),
      lossclaim: new FormControl(false),
    });
   }

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 790 ? 1 : 2; //
    console.log("popup ",this.data.DriverName);
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
      Driverwar : this.driverform.Driverwar.value,
      Driverclient : this.driverform.Driverclient.value,
      physical: this.driverform.physical.value,
      drunk: this.driverform.drunk.value,
      previous: this.driverform.previous.value,
      claimhistory: this.driverform.claimhistory.value,
      lossclaim: this.driverform.lossclaim.value,
    }
    this.dialogRef.close(driverdata);
  }
}
