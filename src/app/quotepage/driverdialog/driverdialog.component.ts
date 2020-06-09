import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatePipe } from '@angular/common';
import {dataformservice} from '../quotepage.component';
import {driverservice} from '../quotepage.component';
import { elementAt } from 'rxjs/operators';

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
  abcd: any;
  authenticate: boolean;
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
    this.abcd=this.dataformservice.dataforms;
    console.log("table",this.abcd);
   // console.log("table-length",this.abcd.length);
    if(this.abcd){
      if(this.abcd[0] != undefined){
     if(this.abcd[0].Driverclient==false){//1
      this.authenticate = true;
      console.log("afs[0]",this.abcd[0].Driverclient);
        if(this.abcd.length>1){
            if(this.abcd[1].Driverclient==false){//2
              this.authenticate = true;
              console.log("afs[1]",this.abcd[1].Driverclient);
              if(this.abcd.length>2){
                if(this.abcd[2].Driverclient==false){//3
                  this.authenticate = true;
                  console.log("afs[2]",this.abcd[2].Driverclient);
                    if(this.abcd.length>3){
                      if(this.abcd[3].Driverclient==false){//4
                        this.authenticate = true;
                        console.log("afs[3]",this.abcd[3].Driverclient);
                          if(this.abcd.length>4){
                            if(this.abcd[4].Driverclient==false){//5
                              this.authenticate = true;
                              console.log("afs[4]",this.abcd[4].Driverclient);
                              }else{
                                this.authenticate = false;
                              }
                            }
                      }else{
                        this.authenticate = false;
                      }
                    }
                }else{
                  this.authenticate = false;
                }
              }
            }else{
              this.authenticate = false;
            }
        }
     }else{
      this.authenticate = false;
     }}
     else{
      this.authenticate = true;
     }
    }
    else{
      console.log("loft ");
      this.authenticate = true;
    }
    //console.log("table",this.abcd[0].Driverclient);
    this.breakpoint = window.innerWidth <= 790 ? 1 : 2; //
    //console.log("popup ");

    //  this.abcd.forEach(projet=>//console.log(projet.Driverclient)
    //  {
    //    let a= projet.Driverclient;
    //    if(a==false){
    //      this.authenticate = true;
    //      console.log("condtion",this.authenticate);
    //    }
    //    else{
    //      this.authenticate = false;
    //    }
    //  });
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
      console.log("name",abc); 
      var name = abc.value.firstName+ " " + abc.value.lastName;
      this.driverForm.get('DriverName').setValue(name);
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
   
    // var nams=JSON.stringify(this.driverform.DriverName.value);
    // console.log(nams);
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
