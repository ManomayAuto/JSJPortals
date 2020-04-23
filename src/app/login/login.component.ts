import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators, FormControl  } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  dataSource: any;
  data: any;
  per: any;
  public Name : string;
 

  constructor(
    private http: HttpClient ,
    private router: Router,
    private as : AuthenticationService,
    private authenticationService: AuthenticationService,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),

   });
 
  }

  ngOnInit() {
  }
  public get l(){
    return this.loginForm.controls;
  }

  public onSubmit() {
  this.as.login(this.l.email.value, this.l.password.value);
   //this.loginForm.reset({email: '', password: ''}),delay(1000000);
    }

    // get getName(){
    //   if(this.data)
    //   return this.data;
    //   else return
    // }
}
