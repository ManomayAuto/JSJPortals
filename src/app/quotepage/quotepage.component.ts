import { Component, OnInit,AfterViewInit, ViewChild, ViewChildren, QueryList} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

import {User, IUserResponse} from '../user.class';
import {switchMap, debounceTime, tap, finalize, isEmpty} from 'rxjs/operators';
import {Observable} from 'rxjs'
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, startWith} from 'rxjs/operators';
import {AppService} from '../app.service';
import { environment } from '../../environments/environment';
import { RequestOptions } from '@angular/http';
import { MatTabGroup } from '@angular/material/tabs';
import {MatSnackBar} from '@angular/material';
import { DatePipe } from "@angular/common";
import { Quote } from '@angular/compiler';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {SearchclientdialogComponent} from './searchclientdialog/searchclientdialog.component';

import { DrivertableComponent } from './drivertable/drivertable.component';
// import { runInThisContext } from 'vm';

@Component({
  selector: 'app-quotepage',
  templateUrl: './quotepage.component.html',
  styleUrls: ['./quotepage.component.css'],
  providers: [DatePipe]
})
export class QuotepageComponent implements OnInit {
  education_level;
  exam_title;
  degreeTitleList = [];
  ncdvalue = '';
  selectDisabled = false;
  options: string[] = ["2020","2019","2018","2017","2016","2015","2014","2013","2012","2011","2010","2009","2008","2007","2007","2006","2005","2004","2003","2002","2001","2000","1999","1998","1997","1996","1995","1994","1993","1992","1991","1990"];
filteredOptions: Observable<string[]>;
matTabs = [1,2,3];
@ViewChild('tabGroup',{static:false}) tabGroup: MatTabGroup;
@ViewChild(DrivertableComponent,{static:false}) child : DrivertableComponent ;
  educationList: any = [
    {
      'educationLevelName': 'Private Vehicle - ICB',
      degreeTitleList: [
        'Standard', 'Electric',
      ]
    },
    {
      'educationLevelName': 'Private Vehicle Golf Carts - ICB',
      degreeTitleList: [
        'Golf',
      ]
    },
    {
      'educationLevelName': 'Motor Goods Carrying - ICB',
      degreeTitleList: [
        'Standard','Electric','Steam'
      ]
    }
  ];
  resultList: unknown[];
  driverdata: any;
  abcd : any = [];
  // search: any;
  search: any = [];
  educationLevelChangeAction(education) {
    this.exam_title="";
    let dropDownData = this.educationList.find((data: any) => data.educationLevelName === education);
    if (dropDownData) {
      this.degreeTitleList = dropDownData.degreeTitleList;
      if(this.degreeTitleList){
        this.exam_title=this.degreeTitleList[0];
      }
     
    } else {
      this.degreeTitleList = [];
    }

  }
  filteredUsers: User[] = [];
  isLoading = false;
  public breakpoint: number;
  wasFormChanged = false;
  show = false;
  hide: any;
  sho = false;
  hid: any;
  submitted = false;
  contactForm1 : FormGroup;
  contactForm2 : FormGroup;
  contactForm3 : FormGroup;
  contactForm4 : FormGroup;
  searchdata : any;
  test(a) {
    if(a.index == 2){
      this.onSubmit();
    }else{
      console.log('Tab2 is not selected!')
    }
  }
  constructor(public dialog: MatDialog,private dp: DatePipe,
    
    private http: HttpClient, private appService: AppService, private f1 : FormBuilder, 
    private f2 : FormBuilder, private f3 : FormBuilder, private f4 : FormBuilder,private f5 : FormBuilder, public snackBar: MatSnackBar){
   

   
  }

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 790 ? 1 : 3; //

    this.contactForm1 = this.f1.group({
      EngineCC: ['',Validators.required],
      vehicleType: ['',Validators.required],
      softtop: [false],
      clienttype: [false],
      Year: ['',Validators.required],
      Use: ['',Validators.required],
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      dab: ['',Validators.required],
      idType : ['',Validators.required],
      idNumber : [''],
      dob: [''],
      dob1: [''],
      pointofsale: [''],
      occupation: [''],
      employement:[''],
      Product: ['',Validators.required],
      userInput: [null,Validators.required],
    });
      this.contactForm2 = this.f2.group({
       
    vehicleValue : [''],
    alarm: [false],
    financed: [false],
    claimfree: [''],
    options1: ['',Validators.required],
    losspay: [''],
    lossloc: [''],
   
     });
     this.contactForm3 = this.f3.group({
      coverageinfo :[''],
      annualgrosspremium:[''],
      manualloadp: [''],
      manualloadr: [''],
      manualdisc: [''],
    manualdiscr: [''],
    fleet: [false],
    promotion: [false],
    tax: [''],
    netprem: [''],
     });

     this.contactForm4 = this.f4.group({
      addressType:  ['',Validators.required],
      streetName:  ['',Validators.required],
      cityTown:  ['',Validators.required],
      zipCode:  ['',Validators.required],
      country: [''],
      policystartDate:  ['',Validators.required],
      policyendDate:  ['',Validators.required],
      policyType:  ['',Validators.required],
      currency:  ['',Validators.required],
      businessClass:  ['',Validators.required],
      branch:  ['',Validators.required],
      deductibles:  [''],
      EngineNumber:  ['',Validators.required],
    });
     this.contactForm1
     .get('userInput')
     .valueChanges
     .pipe(
       debounceTime(300),
       tap(() => this.isLoading = true),
       switchMap(value => this.appService.search({name: value}, 1)
       .pipe(
         finalize(() => this.isLoading = false),
         )
       )
     )
     .subscribe(users => this.filteredUsers = users.results);

     this.filteredOptions = this.contactForm1
     .get('Year').valueChanges
     .pipe(
       startWith(''),
       map(value => this._filter(value))
     );
    //  this.toggle()
    //  this.toggle1()
    this.contactForm1.get('idType').valueChanges.subscribe(

      (idType: string) => {
  
          if (idType != 'NA') {
  
              this.contactForm1.get('idNumber').setValidators([Validators.required]);
              this.contactForm1.get('idNumber').updateValueAndValidity();
          } 
          else if(idType == 'NA') {
            this.contactForm1.get('idNumber').clearValidators();
            this.contactForm1.get('idNumber').updateValueAndValidity();
          }
  
          this.contactForm1.get('idNumber').updateValueAndValidity();
  
      }
  
  )
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  displayFn(user: User) {
    if (user) { return user.name; }
  }
  toggle() {
    this.hide = this.show
    }
    toggle1() {
      this.hide = !this.show
      }
      toggle3() {
        this.sho = !this.sho
        if(this.contactForm2.get('financed').value == false){
          this.contactForm2.get('losspay').setValidators([Validators.required])
          this.contactForm2.get('losspay').updateValueAndValidity;
        }
        else{
          this.contactForm2.get('losspay').clearValidators();
          this.contactForm2.get('losspay').updateValueAndValidity;
        }
        }
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 590 ? 1 : 3
  }
  existing(){
    console.log("in existing")
    let first = this.contactForm1.get('firstName').value;
    if(!first){
      first = null
    }
    let last = this.contactForm1.get('lastName').value;
    if(!last){
      last = null
    }
    let dob = this.contactForm1.get('dab').value;
    let dob1= this.dp.transform(dob, 'yyyy-MM-dd','es-ES');
    if(!dob1){
      dob1 = null
    }
    let idtype = this.contactForm1.get('idType').value;
    if(!idtype){
      idtype = null
    }
    let idnumber = this.contactForm1.get('idNumber').value;
    if(!idnumber){
      idnumber = null
    }
    let mob = this.contactForm1.get('dob').value;
    if(!mob){
      mob = null
    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
   
    return this.http.post<any>(environment.URL + '/searchclient', {first:first,last:last,dob:dob1,idtype:idtype,idnumber:idnumber, mob:mob},httpOptions ).subscribe((searchdata) => { // not callback
      // console.log(searchdata)
      if(searchdata){
        this.abcd = searchdata;
      }
      
      console.log(this.abcd)
   this.sd(this.abcd)
  }, error => {
    console.error("Error", error);
  });
  }
sd(abcd):void{
  const dialogRef = this.dialog.open(SearchclientdialogComponent, {

    width: '1350px',

    height: '800px',
    
    data:{abcd:this.abcd}
  });
  console.log("sa",this.abcd);

  dialogRef.afterClosed().subscribe(result => {

    console.log("tbest",result);
     this.contactForm1.get('firstName').setValue(result['name']);
     this.contactForm1.get('lastName').setValue(result['lname']);
     this.contactForm1.get('dab').setValue(result['dob']);
     this.contactForm1.get('idType').setValue(result['idtype']);
     this.contactForm1.get('idNumber').setValue(result['idno']);
     this.contactForm1.get('dob').setValue(result['phn']);
     this.contactForm1.get('dob1').setValue(result['email']);

    // this.contactForm1 = this.f4.group({
    //   firstName: [result['name']],
    //   lastName:[result['lname']],
    //   dab:[result['dob']],
    //   idType:[result['idtype']],
    //   idNumber:[result['idno']],
    //   dob:[result['phn']],
    //   dob1:[result['email']],

    // })
 
  })

}
  moveToSelectedTab(tabName: string) {
    if(this.contactForm1.valid){
      console.log("innn")
      let first = this.contactForm1.get('firstName').value;
      let last = this.contactForm1.get('lastName').value;
      let dob = this.contactForm1.get('dab').value;
      let idtype = this.contactForm1.get('idType').value;
      let idnumber = this.contactForm1.get('idNumber').value;
      let mob = this.contactForm1.get('dob').value;
      let email = this.contactForm1.get('dob1').value;
      let occp = this.contactForm1.get('occupation').value;
      let emp = this.contactForm1.get('employement').value;
      let sale = this.contactForm1.get('pointofsale').value;
      let prod = this.contactForm1.get('Product').value;
      console.log(prod)
      console.log(typeof(prod))
      let make = this.contactForm1.get('userInput').value;
      let yr = this.contactForm1.get('Year').value;
      let cc = this.contactForm1.get('EngineCC').value;
      let use = this.contactForm1.get('Use').value;
      let vehicletype = this.contactForm1.get('vehicleType').value;
      if(vehicletype == 'Steam'){
        console.log("in steam")
        this.selectDisabled = true

      }
      let soft = this.contactForm1.get('softtop').value;
      console.log(soft)
      let ct = this.contactForm1.get('clienttype').value;

      if(prod == 'Private Vehicle - ICB')
      {
       var edu = 'Private'
       console.log("in private")
      //  this.db.list('/Private_Quotes').push({EngineCC:cc,vehicleValue:vehiclevalue,product:edu,coverType:softu,vehicleType:vehicletype,fleet:fleet,promotion:promotion,manual_load:manloadp,claim_free_years:claimfre,manual_disc:manualdisc,clienttype:ct,firstname: first, lastname: last,client_dob: dob,idtype: idtype,idnumber: idnumber,mobile_no:mob,email_id:email,occupation:occp,employment:emp,pointofsale:sale,makemodelcc:make,manufacturer_year: yr,use:use,softop_convertible:soft,vehicle_financed:finance, losspayee: losspayee, losslocation: losslocation,alarm: alam,manload_reason:manloadr,manualdisc_reason: manualdiscr,quoteid});
  // this.db.list('/Private_Quotes',ref => ref.orderByChild('clienttype').equalTo(ct)).valueChanges().subscribe(data=>{
  //   this.resultList = data;
  //   console.log(data)
  //   console.log(yr)
  //   this.resultList.filter(a => a.firstname == yr);
  //   console.log(this.resultList);
  // })
  
  }
      else if (prod == 'Motor Goods Carrying - ICB'){
      var edu = 'Motor'
      // this.db.list('/Motor_Quotes').push({EngineCC:cc,vehicleValue:vehiclevalue,product:edu,coverType:softu,vehicleType:vehicletype,fleet:fleet,promotion:promotion,manual_load:manloadp,claim_free_years:claimfre,manual_disc:manualdisc,clienttype:ct,firstname: first, lastname: last,client_dob: dob,idtype: idtype,idnumber: idnumber,mobile_no:mob,email_id:email,occupation:occp,employment:emp,pointofsale:sale,makemodelcc:make,manufacturer_year: yr,use:use,softop_convertible:soft,vehicle_financed:finance, losspayee: losspayee, losslocation: losslocation,alarm: alam,manload_reason:manloadr,manualdisc_reason: manualdiscr,});
 
      }
      else if (prod == 'Private Vehicle Golf Carts - ICB'){
        var edu = 'Private'
        // this.db.list('/Privategolf_Quotes').push({EngineCC:cc,vehicleValue:vehiclevalue,product:edu,coverType:softu,vehicleType:vehicletype,fleet:fleet,promotion:promotion,manual_load:manloadp,claim_free_years:claimfre,manual_disc:manualdisc,clienttype:ct,firstname: first, lastname: last,client_dob: dob,idtype: idtype,idnumber: idnumber,mobile_no:mob,email_id:email,occupation:occp,employment:emp,pointofsale:sale,makemodelcc:make,manufacturer_year: yr,use:use,softop_convertible:soft,vehicle_financed:finance, losspayee: losspayee, losslocation: losslocation,alarm: alam,manload_reason:manloadr,manualdisc_reason: manualdiscr,});
         
      }
      if(vehicletype == 'Standard')
      {
        vehicletype = 'NoType'
      }

      this.tabGroup._tabs['_results'][1].disabled = false;
      for (let i =0; i< document.querySelectorAll('.mat-tab-label-content').length; i++) {
        if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) {
          (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
        }
      }

    }
    else{
      this.openSnackBar("Please fill the mandatory fields", "Dismiss")
    }
  }
  // driverdata(arg0: string, driverdata: any) {
  //   throw new Error("Method not implemented.");
  // }
  // onTabChange(event) {
  //   console.log(event.index);
  //   if
  // }
  // pretab(){
  //   this.moveToSelectedTab1('Premium Summary')
  //   console.log("in pre")
  // }
  moveToSelectedTab1(tabName: string) {
    if(this.contactForm2.valid){
      this.tabGroup._tabs['_results'][2].disabled = false;
      for (let i =0; i< document.querySelectorAll('.mat-tab-label-content').length; i++) {
        if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) {
          (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
        }
      }
      this.onSubmit();
    }
    else{
      this.openSnackBar("Please fill the mandatory fields", "Dismiss")
    }
  }
  moveToSelectedTab2(tabName: string) {
 
      this.tabGroup._tabs['_results'][3].disabled = false;
      for (let i =0; i< document.querySelectorAll('.mat-tab-label-content').length; i++) {
        if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) {
          (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
        }
      }
    
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
 

  onSubmit() {
      let first = this.contactForm1.get('firstName').value;
      let last = this.contactForm1.get('lastName').value;
      let dob = this.contactForm1.get('dab').value;
      let idtype = this.contactForm1.get('idType').value;
      let idnumber = this.contactForm1.get('idNumber').value;
      let mob = this.contactForm1.get('dob').value;
      let email = this.contactForm1.get('dob1').value;
      let occp = this.contactForm1.get('occupation').value;
      let emp = this.contactForm1.get('employement').value;
      let sale = this.contactForm1.get('pointofsale').value;
      let prod = this.contactForm1.get('Product').value;
      console.log(prod)
      console.log(typeof(prod))
      let make = this.contactForm1.get('userInput').value;
      let yr = this.contactForm1.get('Year').value;
      let cc = this.contactForm1.get('EngineCC').value;
      let use = this.contactForm1.get('Use').value;
      let vehicletype = this.contactForm1.get('vehicleType').value;
      let soft = this.contactForm1.get('softtop').value;
      console.log(soft)
      let ct = this.contactForm1.get('clienttype').value;
      let finance = this.contactForm2.get('financed').value;
      let claimfre = this.contactForm2.get('claimfree').value;
      if(!claimfre){
        claimfre = 0
      }
      let losspayee = this.contactForm2.get('losspay').value;
      let losslocation = this.contactForm2.get('lossloc').value;
      let vehiclevalue = this.contactForm2.get('vehicleValue').value;
      if(!vehiclevalue){
        vehiclevalue = 0
      }
      let alam = this.contactForm3.get('alarm');
      let coverinfo = this.contactForm3.get('coverageinfo').value;
      let manload = +this.contactForm3.get('manualloadp').value;
      if(manload == null || manload == undefined){
        manload = 0
      }
      else{
        manload =(+manload) / 100;
      }
      let manloadr = this.contactForm3.get('manualloadr').value;
      let manualdis = +this.contactForm3.get('manualdisc').value;
      if(manualdis == null || manualdis == undefined){
        manualdis = 0
      }
      else{
       manualdis = (+manualdis) / 100;
      }
      let manualdiscr = this.contactForm3.get('manualdiscr').value;
      let fleet = this.contactForm3.get('fleet').value;
      console.log(fleet)
      let promotion = this.contactForm3.get('promotion').value;
      console.log(promotion)
      // let annualpre = this.contactForm3.get('annualgrosspremium').value;
      // let tax = this.contactForm3.get('tax').value;
      // let net = this.contactForm3.get('netprem').value;
      let softd = this.contactForm2.get('options1').value;
      console.log(softd)
      let softu;
 
      if(softd == 'TP'){
        softu = "Third Party"
        console.log("intp")
        vehiclevalue = 0
      }
      else if(softd == 'COMP')
      {
        softu = "Comprehensive"
      }
      else if(softd == 'TPFT')
      {
        softu = "Third Party Fire and Theft"
      }
      if(prod == 'Private Vehicle - ICB')
      {
       var edu = 'Private'
      }
      else if (prod == 'Motor Goods Carrying - ICB'){
      var edu = 'Motor'
      }
      else if (prod == 'Private Vehicle Golf Carts - ICB'){
        var edu = 'Private'
      }
      if(vehicletype == 'Standard')
      {
        vehicletype = 'NoType'
      }
      console.log("CC"+ cc)
      console.log("vehiclevalue"+ vehiclevalue)
      console.log("covertype"+ prod)
      console.log("Cover" + softd)
      console.log("Vehicle Type"+ vehicletype)
      console.log("Fleet"+ fleet)
      console.log("Promotion"+ promotion)
      console.log("Manual load"+ manload)
      console.log("claim years"+ claimfre)
      console.log("Manual discount"+ manualdis)
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
     
      return this.http.post<any>(environment.URL + '/calculation', {cc:cc,vehiclevalue:vehiclevalue,prod:edu,softd:softd,vehicletype:vehicletype,fleet:fleet,promotion:promotion,manloadp:manload,claimfre:claimfre,manualdisc:manualdis,ct:ct},httpOptions ).subscribe((res: any) => { // not callback
        console.log(res)
        let tax = this.contactForm3.get('tax').setValue(res.taxamt)
        let annualgp = this.contactForm3.get('annualgrosspremium').setValue(res.annualgpwpd)
        let netpre = this.contactForm3.get('netprem').setValue(res.annualnet)
        let coverinfo = this.contactForm3.get('coverageinfo').setValue(softu)
        this.ncdvalue = res.nc
 
    }, error => {
      console.error("Error", error);
    });
  }
  onSave(){
    console.log("drivertable values",this.child.driverdata);

  }
}

