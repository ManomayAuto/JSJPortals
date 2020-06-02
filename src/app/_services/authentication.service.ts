import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../models/user.model";
import { Observable, BehaviorSubject } from "rxjs";
import { Router } from '@angular/router';
import { SecureLocalStorageService } from './secure-local-storage.service';
import { environment } from '../../environments/environment';
import { DialogContentExampleComponent } from '../dialog-content-example/dialog-content-example.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Injectable()
export class AuthenticationService{
    Name: any;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
  localStorage: any;
  Naame: any;
  action :string='close';  
 
  constructor(private http:HttpClient, private router : Router,private securestore: SecureLocalStorageService,
    private modal: MatDialog,
    private snackBar: MatSnackBar) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.securestore.getitem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
  }


  login(email, password){
    this.http.post(environment.URL + `/login`,
     {"email":email,"password":password}) 
   .subscribe(
      (data:any) => { 
          
        console.log("asd",data); 
        console.log("data",data); 
        this.Naame=data
        this.Name = data.Name;
        console.log("datas",this.Naame); 
        
        if (data.permissions.includes('DR') || data.permissions.includes('DF') ||
         data.permissions.includes('ARRP')||data.permissions.includes('QRU')||data.permissions.includes('QI')
         ||data.permissions.includes('QRM')||data.permissions.includes('QRP')) { 
          console.log("DRDF"+ this.Name);
          this.router.navigate(['/menu']);
        }

        
        
        // console.log(JSON.parse(this.securestore.getitem('currentUser');
        this.securestore.setitem('currentUser',JSON.stringify(data.Token));
        localStorage.setItem("name", data.Name);
        localStorage.setItem("permission", data.permissions);
        localStorage.setItem("Branch", data.Branch);
        
        
     
      let Message1 = "uw Manager";
      if(data.permissions=='QI,QRU,QRM,QRP,DF,DR' || data.permissions == 'QI,QRU,QRM,QRP,DF,DR,ARRP'|| data.permissions == 'QI,QRU,QRM'||
       data.permissions == 'QI,QRU,QRM,QRP'){
        console.log("try sdad"); 
        localStorage.setItem("Role",Message1);
      }
      let Message2 = "uw";
      if(data.permissions=='QI,QRU,QRP,DF,DR,ARRP'||data.permissions=='QI,QRU,QRP,DF,DR'|| data.permissions == 'QI,QRU,QRP,DR'|| 
      data.permissions == 'QI,QRU'|| data.permissions == 'QI,QRU,QRP'){
        console.log("try sdsadad"); 
        localStorage.setItem("Role",Message2);
      }
      let Message3 = "cs";
      if(data.permissions=='QI'||data.permissions=='QI,DR'){
        console.log("cs"); 
        localStorage.setItem("Role",Message3);
      }
      }, 
      error =>{
        
        console.log("Back",error);
        this.snackBar.open(error,this.action,{
          duration: 1000,
        });
        
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
    localStorage.removeItem('name');
    localStorage.removeItem('Role');
    this.router.navigate(['login']);
    
}
  public get getCurrentUser(){
      return this.Name;
  }
}


