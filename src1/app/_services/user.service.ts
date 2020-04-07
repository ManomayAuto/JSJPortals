import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../models/user.model";
import { Observable } from "rxjs";
import { AuthenticationService } from '../_services/authentication.service';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

// var datalogin= localStorage.getItem('datalogin');
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'Authorization': datalogin
//   })
// };
// console.log(datalogin);
@Injectable()
export class UserService{
  
  private serviceUrl = environment.URL + "/ae";
  localStorage: any;
  
  constructor(private http:HttpClient) { }
  
  getUser():Observable<User[]>{
    return this.http.get<User[]>(this.serviceUrl);

  }
  
}


