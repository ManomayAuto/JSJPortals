import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AEComponent } from './ae/ae.component';
import { ReducedComponent } from './reduced/reduced.component';
import { CallComponent } from './call/call.component';
import { LoginComponent } from './login/login.component';
import { Layout1Component } from './layout1/layout1.component';
import { AuthGuard } from './_guards/auth.guard';
import { MenuComponent } from './menu/menu.component';
import { Role } from './models/role.model';
import { ReportsComponent } from './reports/reports.component';
import { QuotepageComponent } from './quotepage/quotepage.component'; 
import { HomeComponent } from './home/home.component';





const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path:'ae', component: AEComponent, canActivate: [AuthGuard],
   data:{roles : [Role.two,Role.three,Role.four,Role.five,Role.nine,Role.so]} },

  { path:'reduced', component: ReducedComponent, canActivate: [AuthGuard], data:{roles : [Role.one,Role.six,Role.ten,Role.ao]} },

  { path:'call', component: CallComponent, canActivate: [AuthGuard], data:{roles : [Role.seven,Role.eight]} },

  { path:'menu', component: MenuComponent},
  { path: 'layout1', component: Layout1Component },
  { path: 'reports', component: ReportsComponent },
  { path: 'quotepage', component: QuotepageComponent, canActivate: [AuthGuard], 
  data:{roles : [Role.one,Role.two,Role.three,Role.four,Role.five,Role.six,Role.hi,Role.ho,Role.jo,Role.lo,Role.ok]} },
  { path: 'quotepage/new', component: QuotepageComponent, canActivate: [AuthGuard], 
  data:{roles : [Role.one,Role.two,Role.three,Role.four,Role.five,Role.six,Role.hi,Role.ho,Role.jo,Role.lo,Role.ok]} },
 
 
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], 
  data:{roles : [Role.one,Role.two,Role.three,Role.four,Role.five,Role.six,Role.hi,Role.ho,Role.jo,Role.lo,Role.ok]} },

  { path: '**', redirectTo: '/login' },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
  