import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import {dataformservice} from '../quotepage.component';
import {driverservice} from '../quotepage.component';

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
  driverdata: any;
  abc: any;
  ngModelChecked = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private dataformservice:dataformservice,
    private driverservice: driverservice,
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
    //console.log("popup ");
    this.dataformservice.$datas.subscribe((data)=>{
      var con = data;
     // console.log("popup",con);
    });
  }
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 590 ? 1 : 2
  }
  public get driverform(){
    return this.driverForm.controls;
  }
  

  onNgModelChangeEvent(e) {
    // e is a boolean, true if checked, otherwise false
    this.ngModelChecked = e;

    if (this.ngModelChecked) {
      var abc= this.dataformservice.dataform;
      var name = abc.value.firstName+ " " + abc.value.lastName;
      this.driverForm.get('DriverName').setValue([name]);
      this.driverForm.get('DOB').setValue(abc['value']['dab']);
      //localStorage.setItem("permission", "sd");
    }
    else{
      console.log("popupgood"); 
      this.driverForm.get('DriverName').setValue([""]);
      this.driverForm.get('DOB').setValue([""]);
    }
  }

  dig(){
    this.dataformservice.$datas.subscribe((data)=>{
      var con = data;
      console.log("popup",con);
    });
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
