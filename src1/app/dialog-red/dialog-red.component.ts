import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-dialog-red',
  templateUrl: './dialog-red.component.html',
  styleUrls: ['./dialog-red.component.css']
})
export class DialogRedComponent implements OnInit {

  ClientForm : FormGroup;
  ReductionForm = new FormGroup({
  Check:new FormControl(),
  Transitionid: new FormControl(),
 })

  FormService: any;                               
  dialog: any;
  today: Date = new Date();
  myFormattedDate: string; // this.datepipe.transform(this.today, 'short');
  Uname: string;
  
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private http: HttpClient ,
    private formBuilder: FormBuilder,
    public dialogRef :MatDialogRef<DialogRedComponent>,
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

  ngOnInit() {
    this.ReductionForm = this.formBuilder.group({
      Transitionid: ['', [Validators.required]],
      Check:['', [Validators.required]]
    });
  }
  
  public get r(){
    return this.ReductionForm.controls;
    }
  public onhi() {
    this.Uname=localStorage.getItem('name');
    this.datepipe = new DatePipe('en-Us');
    this.myFormattedDate = this.datepipe.transform(this.today, 'M-d-yyyy HH:mm');
    this.http.post(environment.URL + `/Nonaereduction`,{Id:this.data.policy, Date: this.myFormattedDate , Status: "Completed",
     Checked: this.r.Check.value, TransactionId : this.r.Transitionid.value,Uname:this.Uname}) 
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

