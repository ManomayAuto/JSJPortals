import { Injectable } from '@angular/core';
import * as secure from 'secure-ls';
@Injectable({
  providedIn: 'root'
})
export class SecureLocalStorageService {
  constructor() { }
  setitem(key: string, value: any) {
    const s = new secure({encodingType: 'des', isCompression: false, encryptionSecret: 'manomay'});
    s.set(key, value);
    // console.log(s);
  }
  getitem(key: string){
    try{
    const s = new secure({encodingType: 'des', isCompression: false, encryptionSecret: 'manomay'});
    if(s.get(key)){
    return(s.get(key));
    }
    else {
       return null
      }
    }
    catch(error){
      localStorage.removeItem(key);
    }
  }
} 