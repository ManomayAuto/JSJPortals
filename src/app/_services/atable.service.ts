import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from "../models/user.model";
import { Observable } from "rxjs";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtableService {
  private serviceUrl = environment.URL + "/approvedquotes";
  localStorage: any;
  role: string;

  constructor(private http:HttpClient) { }

  getUser():Observable<User[]>{
 
    return this.http.get<User[]>(this.serviceUrl);
  }
}
