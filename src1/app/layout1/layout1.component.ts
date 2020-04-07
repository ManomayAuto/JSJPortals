import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router,RouterModule, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { AuthGuard } from "../_guards/auth.guard";
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
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private _router: Router, 
     private  authenticationService : AuthenticationService,private route:ActivatedRoute) {
      this.name=localStorage.getItem('name');
      console.log("ass",this.name);
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.router = _router.url;
  }
  logout(){
    this.authenticationService.logout();
 
  }
}


