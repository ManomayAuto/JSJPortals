import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TotalroleService {
  permissions: string;

  constructor() {
    this.permissions=localStorage.getItem('permission');
    
   }
  
}
