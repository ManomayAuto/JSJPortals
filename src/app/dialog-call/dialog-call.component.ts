  
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { environment } from '../../environments/environment'; 

@Component({
  selector: 'app-dialog-call',
  templateUrl: './dialog-call.component.html',
  styleUrls: ['./dialog-call.component.css']
})
export class DialogCallComponent implements OnInit {

  ClientForm : FormGroup;
  ReductionForm = new FormGroup({
  Check:new FormControl(),
  Transitionid: new FormControl(),
 })

  FormService: any;                               
  dialog: any;
  today: Date = new Date();
  myFormattedDate: string; // this.datepipe.transform(this.today, 'short');
  modess: string;
  Uname: string;
  Exd: any;
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private http: HttpClient ,
    private formBuilder: FormBuilder,
    public dialogRef :MatDialogRef<DialogCallComponent>,
    public datepipe: DatePipe,
  ) { 
    this.ClientForm = new FormGroup({
      ClientName: new FormControl(this.data.ClientName),
      policyid: new FormControl(this.data.policy),
      EmailId: new FormControl(this.data.EmailId),
      PhnNum1: new FormControl(this.data.PhnNum1),
      PhnNum2: new FormControl(this.data.PhnNum2),
      PhnNum3: new FormControl(this.data.PhnNum3),
      comment: new FormControl(this.data.comment),
      mode: new FormControl(),
      note: new FormControl('',Validators.pattern(".*\\S.*[a-zA-z0-9!@#$%^&*+-’=]")), 
      picker: new FormControl(),

   });

  }
  minDate:Date = new Date();

  ngOnInit() {
    this.ReductionForm = this.formBuilder.group({
      Transitionid: ['', [Validators.required]],
      Check:['', [Validators.required]],
      picker:['',[ Validators.required] ] //this.checkDates]]
    });
  }
  // checkDates() {
  //   if (picker.value) {
  //     return { endDateLessThanStartDate: true }
  //   }
  //   return null;
  // }
  public get f(){
    return this.ClientForm.controls;
  }
  
  public onSubmit() {
    this.datepipe = new DatePipe('en-Us');
    this.myFormattedDate = this.datepipe.transform(this.today, 'M-d-yyyy HH:mm');
    this.modess ="call";
    console.log(this.modess);
    this.Uname=localStorage.getItem('name');
    //console.log("BackFDG",this.Uname);
    //ExpDate
   let day=new Date(this.f.picker.value).toString().slice(4,15);
   this.Exd = this.datepipe.transform(day, 'M-d-yyyy');
    console.log( this.data.policy,  this.data.Followups, "Followed up" , this.f.mode.value,this.f.note.value);
    this.http.post(environment.URL + `/Nonfollowup`, { Id : this.data.policy,Date: this.myFormattedDate , Followups: this.data.Followups, Status: "Followed up" , 
        Mode:this.modess,Note:this.f.note.value,ExpDate:this.Exd,Uname:this.Uname}) 
        
   .subscribe(
      (data:any) => {
        console.log("Comment",data);
        
      }, error =>{
        console.log("Back",error);
      }
    );
    
    this.dialogRef.close();
    }
}