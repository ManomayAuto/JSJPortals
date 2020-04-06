import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterLink } from '@angular/router';

import { AuthenticationService } from '../_services';
import { MenuComponent } from "../menu/menu.component";
import { Role } from '../models/role.model';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {}   
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.currentUserValue;

        var x = localStorage.getItem("permission");
       
       
        var a = localStorage.getItem("Name");
        if (currentUser) {
            //check if route is restricted by role
            if (route.data.roles && route.data.roles.indexOf(x) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }   
      
            return true; 
        }



        // not logged in so redirect to login page with the return url
       this.router.navigate(['/login']);
        return false;
    }
}