import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router,RouterModule, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { AuthGuard } from "../_guards/auth.guard";
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-layout1',
  templateUrl: './layout1.component.html',
  styleUrls: ['./layout1.component.css']
})
export class Layout1Component implements OnInit {

  wasFormChanged = false;
  public breakpoint: number;
  mobileQuery: MediaQueryList;
  router: string;


  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  private _mobileQueryListener: () => void;
  name: string;
  role: string;  
  Branch: string;

  per: string;
  display: string;

  public ngOnInit(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    this.breakpoint = window.innerWidth <= 790 ? 1 : 2;
  }
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 790 ? 1 : 2;
  }
  formChanged() {
    this.wasFormChanged = true;
  }
open(r){
  console.log("opened")
}
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _router: Router,private snackBar: MatSnackBar,
     private  authenticationService : AuthenticationService,private route:ActivatedRoute) {
      this.per = localStorage.getItem("permission");
      if(this.per=='QI,QRU,QRP,DF,DR' || this.per=='QI,QRU,QRP,DF,DR,ARRP')
      {this.display="UW/AE"}
      else if(this.per=='QI,QRU,QRM,QRP,DF,DR,ARRP'||this.per=='QI,QRU,QRM,QRP,DF,DR')
      {this.display="UW Manager/AE"}
      else if(this.per=='QI,DR'){this.display="CS/NonAE"}
      else if(this.per=='QI,QRU,QRP,DR'){this.display="UW/Non AE"}
      else if(this.per=='DF'||this.per=='DF,ARRP'){this.display="Non AE"}
      else if(this.per=='DF,DR'||this.per=='DF,DR,ARRP'){this.display="AE"}
      else if(this.per=='DR'||this.per=='DR,ARRP'){this.display="Non AE"}
      else if(this.per=='QI'){this.display="CS"}
      else if(this.per=='QI,QRU'||this.per=='QI,QRU,QRP'){this.display="UW"}
      else if(this.per=='QI,QRU,QRM'||this.per=='QI,QRU,QRM,QRP'){this.display="UW Manager"}

      this.name=localStorage.getItem('name');
      this.Branch=localStorage.getItem('Branch');
      this.role=localStorage.getItem('Role');
      if(this.role == "cs"){
        this.role = "CS"
      }
      else if(this.role == "uw"){
        this.role = "Underwriter"
      }
      else if(this.role == "uw Manager"){
        this.role = "UW Manager"
      }
      console.log("ass",this.name);
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.router = _router.url;
  }
  logout(){
    this.authenticationService.logout();
 
  }
  hi(){
    if (this.per.includes('QI') || this.per.includes('QRU')||this.per.includes('QRM')) { 
      this._router.navigate(['/home']);
    }
    else{
      this.snackBar.open("You don't have valid permissions","close", {
        duration: 1000,
      });
    }
  }
  his(){
    if (this.per.includes('QI') || this.per.includes('QRU')||this.per.includes('QRM')) { 
      this._router.navigate(['/quotepage']);
    }
    else{
      this.snackBar.open("You don't have valid permissions","close", {
        duration: 1000,
      });
    }
  }
  rep(){
    if (this.per.includes('ARRP')) { 
      this._router.navigate(['/reports']);
    }
    else{
      this.snackBar.open("You don't have valid permissions","close", {
        duration: 1000,
      });
    }
  }

reps(){
  if (this.per.includes('QRP')) { 
    this._router.navigate(['/QuoteReports']);
  }
  else{
    this.snackBar.open("You don't have valid permissions","close", {
      duration: 1000,
    });
  }
}
  clickMe() {
    console.log("sssng",this.per.includes('DR') && this.per.includes('DF'));
   console.log("nsssg",this.per);
   if (this.per.includes('DR') && this.per.includes('DF')) { 
    this._router.navigate(['/ae']);
  }
  else if (this.per.includes('DF')){
   this._router.navigate(['/call']);
}

else if (this.per.includes('DR')){
   this._router.navigate(['/reduced']);
}
else{
  this.snackBar.open("You don't have valid permissions","close", {
    duration: 1000,
  });
}
}

}


