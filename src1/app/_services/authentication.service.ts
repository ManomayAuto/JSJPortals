import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../models/user.model";
import { Observable, BehaviorSubject } from "rxjs";
import { Router } from '@angular/router';
import { SecureLocalStorageService } from './secure-local-storage.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService{
    Name: any;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
  localStorage: any;
    
  constructor(private http:HttpClient, private router : Router,private securestore: SecureLocalStorageService,) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.securestore.getitem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
  }


  login(email, password){
    this.http.post(environment.URL + `/login`,
     {"email":email,"password":password}) 
   .subscribe(
      (data:any) => {
        console.log("direct en",data); 
        console.log("data",data); 
        this.Name = data.Name;
       
        // console.log("cccc",data.permissions.includes('DR') && data.permissions.includes('DF'))// console.log("cDR",data.permissions.includes('DR')) // console.log("ccDF",data.permissions.includes('DF'))
        if (data.permissions.includes('DR') || data.permissions.includes('DF') ||
         data.permissions.includes('ARRP')) { 
          console.log("DRDF"+ this.Name);
          this.router.navigate(['/menu']);
        }
        
        
        
        // console.log(JSON.parse(this.securestore.getitem('currentUser');
        this.securestore.setitem('currentUser',JSON.stringify(data.Token));
        localStorage.setItem("name", data.Name);
        localStorage.setItem("permission", data.permissions);
      }, error =>{
        console.log("Back",error);
      }
      
    );
    
    
  }
  public get currentUserValue(): User {
    // console.log(this.securestore.getitem('currentUser'));
    // console.log(this.currentUserSubject.value)
    return this.securestore.getitem('currentUser');
}


  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('permission');
    localStorage.removeItem('NonAEcall');
    localStorage.removeItem('NonAEred');
    localStorage.removeItem('AE');
    this.router.navigate(['login']);
}
  public get getCurrentUser(){
      return this.Name;
  }
}


