import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers :[AuthenticationService]
})
export class MenuComponent implements OnInit {
  per: string;

  constructor( private router : Router) {
    this.per = localStorage.getItem("permission");
    console.log("inside",this.per);
  }
  
  ngOnInit() {
    console.log("ng",this.per);
  }
  hi(){
    if (this.per.includes('QI') || this.per.includes('QRU')||this.per.includes('QRM')) { 
      this.router.navigate(['/home']);
    }
  }
  clickMe() {
     console.log("sssng",this.per.includes('DR') && this.per.includes('DF'));
    console.log("nsssg",this.per);
    if (this.per.includes('DR') && this.per.includes('DF')) { 
     this.router.navigate(['/ae']);
   }
   else if (this.per.includes('DF')){
    this.router.navigate(['/call']);
}

else if (this.per.includes('DR')){
    this.router.navigate(['/reduced']);
}
}
}