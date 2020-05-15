import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AEComponent } from './ae/ae.component';
import { ReducedComponent } from './reduced/reduced.component';
import {MatTabsModule, MatFormFieldModule, MatDialogModule, MatTableModule, MatIconModule, MatRippleModule, MatRadioModule, MatCheckboxModule, MatMenuModule, MatTooltipModule, MatToolbarModule, MatSidenavModule, MatCardModule, MatListModule,MatSort,  MatSortModule, MatNativeDateModule, MatDatepickerModule} from '@angular/material'  ;
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material';
import { DialogContentExampleComponent } from './dialog-content-example/dialog-content-example.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from './_services/user.service';
import { DatePipe } from '@angular/common';
import { Layout1Component } from './layout1/layout1.component';
import { CallComponent } from './call/call.component';
import { DialogCallComponent } from './dialog-call/dialog-call.component';
import { NonService } from './_services/non.service';
import { DialogRedComponent } from './dialog-red/dialog-red.component';
import { RedService } from './_services/red.service';
import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './_services/authentication.service';
import { RouterModule, Routes } from '@angular/router';
import { SecureLocalStorageService } from './_services/secure-local-storage.service';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { QuotepageComponent } from './quotepage/quotepage.component';
import { SearchtableComponent } from './searchtable/searchtable.component';
import { ReviewtableComponent } from './home/reviewtable/reviewtable.component';
import { ReportsComponent } from './reports/reports.component';
import { DriverdialogComponent } from './quotepage/driverdialog/driverdialog.component';
import { ApprovedtableComponent } from './home/approvedtable/approvedtable.component';
import { InbrokerquotetableComponent } from './home/inbrokerquotetable/inbrokerquotetable.component';
import { DrivertableComponent, DialogOverviewExampleDialog } from './quotepage/drivertable/drivertable.component';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
// import {InMemDataService} from './in-memory-data.service';
import { MaterialModule} from './Material/material.module';
import {SimpleNotificationsModule} from 'angular2-notifications';
import { SearchclientdialogComponent } from './quotepage/searchclientdialog/searchclientdialog.component';
import { DuplicatedialogComponent } from './quotepage/duplicatedialog/duplicatedialog.component';
import { NewquotedialogComponent } from './quotepage/newquotedialog/newquotedialog.component';
import {driverservice} from './quotepage/quotepage.component';
import { from } from 'rxjs';
import { QtableService } from './_services/qtable.service';

import { QletterdialogComponent } from './quotepage/qletterdialog/qletterdialog.component';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
@NgModule({
  declarations: [
    AppComponent,
    AEComponent,
    ReducedComponent,
    DialogContentExampleComponent,
    Layout1Component,
    CallComponent,
    DialogCallComponent,
    DialogRedComponent,
    LoginComponent,
    MenuComponent,
    HomeComponent,
    QuotepageComponent,
    SearchtableComponent,
    ReviewtableComponent,
    ReportsComponent,
    DriverdialogComponent,
    ApprovedtableComponent,
    InbrokerquotetableComponent,
    DrivertableComponent,
    SearchclientdialogComponent,
    DuplicatedialogComponent,
    NewquotedialogComponent,
    DialogOverviewExampleDialog,
    QletterdialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatRippleModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    MatTabsModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    ReactiveFormsModule,  
    MatMenuModule,
    MatCardModule,
    MatSidenavModule,
    MatTooltipModule,
    MatToolbarModule ,
    MatListModule, 
    HttpClientModule,
    MatSortModule,
    MatDatepickerModule,        // <----- import(must)
    MatNativeDateModule,        // <----- import for date formating(optional)
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    SimpleNotificationsModule.forRoot(),
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PDFExportModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemDataService, { dataEncapsulation: false, passThruUnknownUrl: true,delay: 1000 }
    //   ),
  ],
  providers: [UserService,RedService, NonService,DatePipe, AuthenticationService,QtableService,
    SecureLocalStorageService,driverservice,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  entryComponents:[NewquotedialogComponent,QletterdialogComponent,DialogContentExampleComponent,DialogRedComponent,DialogCallComponent,DriverdialogComponent,SearchclientdialogComponent,DuplicatedialogComponent,DialogOverviewExampleDialog]
})
export class AppModule { }
