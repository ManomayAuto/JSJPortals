import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dialog-content-example',
  templateUrl: './dialog-content-example.component.html',
  styleUrls: ['./dialog-content-example.component.css'],
  

})
export class DialogContentExampleComponent implements OnInit {

  ClientForm : FormGroup;
  ReductionForm = new FormGroup({
  Check:new FormControl(),
  Transitionid: new FormControl(),
 })

  FormService: any;                               
  dialog: any;
  today: Date = new Date();
  myFormattedDate: string; // this.datepipe.transform(this.today, 'short');
  Exd: any;
  Uname: string;
  Unames: string;
  
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private http: HttpClient ,
    private formBuilder: FormBuilder,
    public dialogRef :MatDialogRef<DialogContentExampleComponent>,
    public datepipe: DatePipe,
  ) { 
    this.ClientForm = new FormGroup({
      ClientName: new FormControl(this.data.ClientName),
      policyid: new FormControl(this.data.policy),
      EmailId: new FormControl(this.data.EmailId),
      PhnNum: new FormControl(this.data.PhnNum),
      comment: new FormControl(this.data.comment),
      mode: new FormControl(),
      note: new FormControl(), 
      picker: new FormControl(),
   });

  }

  minDate:Date = new Date();

  ngOnInit() {
    this.ReductionForm = this.formBuilder.group({
      Transitionid: ['', [Validators.required]],
      Check:['', [Validators.required]]
    });
  
  }

  public get f(){
    return this.ClientForm.controls;
  }

  public onSubmit() {

   this.datepipe = new DatePipe('en-Us');
   this.myFormattedDate = this.datepipe.transform(this.today, 'M-d-yyyy HH:mm');
   this.Uname=localStorage.getItem('name');
  //ExpDate
   let day=new Date(this.f.picker.value).toString().slice(4,15);
   this.Exd = this.datepipe.transform(day, 'M-d-yyyy');
  //  console.log("Dayu", day);    
   console.log("Day", this.Exd);
   console.log("BackFDG", this.f.picker.value, this.data.policy,  this.data.Followups,  "Followed up" , this.myFormattedDate ,
   this.f.comment.value, this.f.mode.value,this.f.note.value,this.Exd);
    this.http.post(environment.URL + `/followup`, { Id : this.data.policy, Followups: this.data.Followups, Status: "Followed up" , 
      Date: this.myFormattedDate , Comment:this.f.comment.value, Mode:this.f.mode.value,Note:this.f.note.value,ExpDate:this.Exd,Uname:this.Uname}) 
   .subscribe(
      (data:any) => {
        console.log("Comment",data);
        
      }, error =>{
        console.log("Back",error);
      }
    );
    
    this.dialogRef.close();
    }
  public get r(){
    return this.ReductionForm.controls;
    }
  public onhi() {
    this.Unames=localStorage.getItem('name');
    this.datepipe = new DatePipe('en-Us');
    this.myFormattedDate = this.datepipe.transform(this.today, 'M-d-yyyy HH:mm');
    this.http.post(environment.URL +`/followup`,{Id:this.data.policy, Date: this.myFormattedDate , Status: "Completed",
     Checked: this.r.Check.value, TransactionId : this.r.Transitionid.value,Uname:this.Unames}) 
    .subscribe(
      (data:any) => {
        console.log("Backend data",data);
        
      }, error =>{
        console.log("Back",error);
      }
    );
    
    this.dialogRef.close();
           
    }


  }

