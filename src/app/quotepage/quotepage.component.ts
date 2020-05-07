import { Component, Injectable,OnInit,AfterViewInit, ViewChild, ViewChildren, EventEmitter ,QueryList} from '@angular/core';
import {FormGroup, FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

import {switchMap, debounceTime, tap, finalize, isEmpty} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, startWith} from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { RequestOptions } from '@angular/http';
import { MatTabGroup } from '@angular/material/tabs';
import {MatSnackBar} from '@angular/material';
import { DatePipe } from "@angular/common";
import { Quote } from '@angular/compiler';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {SearchclientdialogComponent} from './searchclientdialog/searchclientdialog.component';
import {DuplicatedialogComponent} from './duplicatedialog/duplicatedialog.component';
import { DrivertableComponent } from './drivertable/drivertable.component';
import {NewquotedialogComponent} from './newquotedialog/newquotedialog.component';

import { Observable, of, Subscription,zip } from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';


// import { runInThisContext } from 'vm';
@Injectable({
  providedIn: 'root'
})
export class Service {
  constructor(private http: HttpClient) { }

  opts = [];
  copts = [];
  lopts = [];
  getData() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.opts.length ?
      of(this.opts) :
      this.http.get<any>(environment.URL + '/vehicle',httpOptions).pipe(tap(data => this.opts = data))
  }
  countryData() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.copts.length ?
      of(this.copts) :
      this.http.get<any>(environment.URL + '/country',httpOptions).pipe(tap(data => this.copts = data))
  }
  lossData() {
    console.log("lossspayeeeeeeeeeeeeeeeeee");
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.lopts.length ?
      of(this.lopts) :
      this.http.get<any>(environment.URL + '/losspayee',httpOptions).pipe(tap(data => this.lopts = data))
  }

}
export class driverservice {
  $data = new EventEmitter();
  driverdata: any;
  constructor() { }

  driver(driverdata) {
    console.log("in driver service");
    console.log(driverdata);
    console.log(typeof(driverdata));
    this.$data.emit(driverdata);
  }
}
@Component({
  selector: 'app-quotepage',
  templateUrl: './quotepage.component.html',
  styleUrls: ['./quotepage.component.css'],
  providers: [DatePipe]
})
export class QuotepageComponent implements OnInit {
  ncdvalue = '';
  selectDisabled = false;
  isReadonly = true;
  option = [];

  countryoption = [];
  username: string;
  userrole: string;  
  public summaries: any[];
  public towns: any[];
  public isduplicate: boolean = false;

  options: string[] = ["2030","2029","2028","2027","2026","2025","2024","2023","2022","2021","2020","2019","2018","2017","2016","2015","2014","2013","2012","2011","2010","2009","2008","2007","2007","2006","2005","2004","2003","2002","2001","2000","1999","1998","1997","1996","1995","1994","1993","1992","1991","1990"];
filteredOptions: Observable<string[]>;
filteredOption: Observable<any[]>;
filteredOptionloss: Observable<any[]>;
countryfilteredOption: Observable<any[]>;
matTabs = [1,2,3];
@ViewChild('tabGroup',{static:false}) tabGroup: MatTabGroup;
@ViewChild(DrivertableComponent,{static:false}) child : DrivertableComponent ;
education_level;
exam_title;
degreeTitleList = [];
  educationList: any = [
    {
      'educationLevelName': 'Private Vehicle - ICB',
      degreeTitleList: [
        'Standard', 'Electric'
      ]
    },
    {
      'educationLevelName': 'Private Vehicle Golf Carts - ICB',
      degreeTitleList: [
        'Golf'
      ]
    },
    {
      'educationLevelName': 'Motor Goods Carrying - ICB',
      degreeTitleList: [
        'Standard','Electric','Steam'
      ]
    }
  ];
  driverdata: any;
  abcd : any = [];
  // search: any;
  search: any = [];
  abc: any;
  
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
  selectedvehtype :any;
  test(a) {
    if(a.index == 2){
      this.onSubmit();
    }else{
      console.log('Tab2 is not selected!');
    }
  }

  constructor(private  authenticationService : AuthenticationService,private driverservice: driverservice,private service: Service,private router: Router,public dialog: MatDialog,private dp: DatePipe,
    private route: ActivatedRoute,

    private http: HttpClient, private f1 : FormBuilder, 
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
      userInput: ['',Validators.required],
    });
    this.contactForm1.get('clienttype').disable();
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
    netpremusd: [''],
    remarks: [''],
    quoted: [''],
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
    
    this.filteredOption = this.contactForm1
.get('userInput').valueChanges.pipe(
      startWith(''),
      switchMap(value => this.doFilter(value))
    );
    this.countryfilteredOption = this.contactForm4
.get('country').valueChanges.pipe(
      startWith(''),
      switchMap(value => this.docountryFilter(value))
    );
    this.filteredOptionloss= this.contactForm2
    .get('losspay').valueChanges.pipe(
          startWith(''),
          switchMap(value => this.dolossFilter(value))
        );
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
  // this.abc=this.dataService.SharedData;
  let quoteid =  this.route.snapshot.paramMap.get('title');
  console.log("trail1",quoteid);  
    if(quoteid != null){
      console.log("not null");
    this.getSomething();
  }
  }
  getSomething(){
    let quoteid =  this.route.snapshot.paramMap.get('title');
    console.log("getSomething not null");
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post<any>(environment.URL + `/pickquote`,{quoteid},httpOptions).subscribe((result) => { 
      console.log("searchdone!!!!",result);
      console.log(result);
    this.contactForm1.get('dob1').setValue(result['email']);
    this.contactForm1.get('firstName').setValue(result['first']);
    this.contactForm1.get('lastName').setValue(result['last']);
    this.contactForm1.get('dab').setValue(result['dob']);
    this.contactForm1.get('idType').setValue(result['idtype']);
    this.contactForm1.get('idNumber').setValue(result['idno']);
    this.contactForm1.get('dob').setValue(result['mob']);
    var makey = result['make'];
    // console.log(result['make']);
    this.displayFn(makey);
    this.contactForm1.get('userInput').setValue(makey);
    this.contactForm1.get('occupation').setValue(result['ocp']);
    this.contactForm1.get('employement').setValue(result['emplace']);
    this.contactForm1.get('pointofsale').setValue(result['sale']);
    this.contactForm1.get('Product').setValue(result['prod']);
    console.log(result['prod']);
    this.contactForm1.get('Year').setValue(result['yr']); 
    this.contactForm1.get('EngineCC').setValue(result['cc']);
    this.contactForm1.get('Use').setValue(result['use']);
    this.contactForm1.controls.vehicleType.setValue(result['vehtype']);
    this.educationLevelChangeAction(result['prod']);
    this.contactForm1.get('softtop').setValue(result['softop']);
    this.contactForm1.get('clienttype').setValue(result['ct']);
    this.contactForm2.get('financed').setValue(result['financed']);
    this.contactForm2.get('claimfree').setValue(result['claimfre']);
    let typeofcover = result['covertype'];
    if(typeofcover == "Third Party"){
     typeofcover = "TP"
    }
    else if(typeofcover == "Comprehensive")
    {
     typeofcover = "COMP"
     this.toggle1();
    }
    else if(typeofcover == "Third Party Fire and Theft")
    {
      typeofcover = "TPFT"
      this.toggle1();
    }
    this.contactForm2.get('options1').setValue(typeofcover);
    this.contactForm2.get('losspay').setValue(result['lpname']);
    this.contactForm2.get('lossloc').setValue(result['lploc']);
    this.contactForm2.get('vehicleValue').setValue(result['vehvalue']);
    this.contactForm2.get('alarm').setValue(result['alam']);
    this.contactForm3.get('coverageinfo').setValue(result['covertype']);
    +this.contactForm3.get('manualloadp').setValue(result['manloadp']);
    this.contactForm3.get('manualloadr').setValue(result['manloadr']);
    +this.contactForm3.get('manualdisc').setValue(result['mandisp']);
    this.contactForm3.get('manualdiscr').setValue(result['mandisr']);
    this.contactForm3.get('fleet').setValue(result['flet']);
    this.contactForm3.get('promotion').setValue(result['prom']);
    this.contactForm3.get('tax').setValue(result['tax']);
    this.contactForm3.get('annualgrosspremium').setValue(result['agp']);
    this.contactForm3.get('netprem').setValue(result['anp']);
    this.ncdvalue = result['autod'];
    this.driverdata = result['driverdata'];
    this.driverservice.driver(this.driverdata);
    // this.contactForm1.markAllAsTouched;
    // this.contactForm2.markAllAsTouched;
    // this.contactForm3.markAllAsTouched;
    });  
  }
  doFilter(value) {
    return this.service.getData()
      .pipe(
        map(response => response.filter(option => {
          return option.MakeModelCC.toLowerCase().indexOf(value.toLowerCase()) === 0
        }))
      )
  }
  docountryFilter(value){
    return this.service.countryData()
      .pipe(
        map(response => response.filter(countryoption => {
          return countryoption.Country.toLowerCase().indexOf(value.toLowerCase()) === 0
        }))
      )
  }
  dolossFilter(value){
    return this.service.lossData()
      .pipe(
        map(response => response.filter(lossoption => {
          return lossoption.Description.toLowerCase().indexOf(value.toLowerCase()) === 0
        }))
      )
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  displayFn(value) {

    if (value.MakeModelC) { 
    
      return value.MakeModelCC; }
    else if(value){
      console.log(value);
      console.log(typeof(value));
return value;
    }
  }
  displayFncountry(value) {
    if (value) { return value.Country; }
  }
  displayFnloss(value){
    if (value) { return value.Description; }
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
     this.contactForm1.get('clienttype').setValue(true);
     

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
      let dob = this.dp.transform(this.contactForm1.get('dab').value, 'yyyy-MM-dd','es-ES');
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
      console.log("indupiccccc"+ make);
      let yr = this.contactForm1.get('Year').value;
      let cc = this.contactForm1.get('EngineCC').value;
      let use = this.contactForm1.get('Use').value;
      let vehicletype = this.contactForm1.get('vehicleType').value;
      console.log(vehicletype);
      if(vehicletype == 'Steam'){
        console.log("in steam")
        this.selectDisabled = true

      }
      let soft = this.contactForm1.get('softtop').value;
      console.log(soft)
      let ct = this.contactForm1.get('clienttype').value;
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
     
      return this.http.post<any>(environment.URL + '/duplicate', {first:first,last:last,dob:dob,idtype:idtype,idnumber:idnumber,mob:mob,email:email,occp:occp,emp:emp,sale:sale,make:make,yr:yr,cc:cc,use:use,vehicletype:vehicletype,prod:prod},httpOptions ).subscribe((res: any) => { // not callback
        console.log(res)
        if(res.result == "NoQuote")
        {
 this.tabGroup._tabs['_results'][1].disabled = false;
      for (let i =0; i< document.querySelectorAll('.mat-tab-label-content').length; i++) {
        if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) {
          (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
        }
      }
        }
        else{
          this.openduplicateDialog(res);
          this.isduplicate = !this.isduplicate;
        }
    }, error => {
      console.error("Error", error);
    });
     

    }
    // else{
    //   this.openSnackBar("Please fill the mandatory fields", "Dismiss")
    // }

  }
  onrequote(){
    let quoteid = this.contactForm3.get('quoted').value;
    console.log(quoteid);
    var username = localStorage.getItem('name');
      var userrole = localStorage.getItem('Role');
      console.log(userrole);
      console.log(username)
      if(userrole == "cs"){
        var status = "Review"
      }
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.post<any>(environment.URL + '/requote', {quoteid:quoteid,username:username,userrole:userrole,reviewstatus:status,quotestatus:status},httpOptions ).subscribe((res: any) => { // not callback
    console.log(res);
        this.openSnackBar("Requote of quote is successfully submitted", "Dismiss")
    }, error => {
      console.error("Error", error);
    });
  }
  openduplicateDialog(quotedata) {
    const dialogRef = this.dialog.open(DuplicatedialogComponent,{
      width: '450px',
      height: '200px',
      data:{
        quotedata: quotedata,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
   console.log("after closed ", result);
   
   this.contactForm1.get('dob1').setValue(result['quotedata']['email']);
   this.contactForm1.get('firstName').setValue(result['quotedata']['first']);
   this.contactForm1.get('lastName').setValue(result['quotedata']['last']);
   this.contactForm1.get('dab').setValue(result['quotedata']['dob']);
   this.contactForm1.get('idType').setValue(result['quotedata']['idtype']);
   this.contactForm1.get('idNumber').setValue(result['quotedata']['idno']);
   this.contactForm1.get('dob').setValue(result['quotedata']['mob']);
   this.contactForm1.get('occupation').setValue(result['quotedata']['ocp']);
   this.contactForm1.get('employement').setValue(result['quotedata']['emplace']);
   this.contactForm1.get('pointofsale').setValue(result['quotedata']['sale']);
   this.contactForm1.get('Product').setValue(result['quotedata']['prod']);
   this.contactForm1.get('Year').setValue(result['quotedata']['yr']);
   this.contactForm1.get('EngineCC').setValue(result['quotedata']['cc']);
   this.contactForm1.get('Use').setValue(result['quotedata']['use']);
   this.contactForm1.get('vehicleType').setValue(result['quotedata']['vehtype']);
   var makey = result['quotedata']['make'];
   this.displayFn(makey);
   console.log(result['quotedata']['make']);
   this.contactForm1.get('softtop').setValue(result['quotedata']['softop']);
   this.contactForm1.get('clienttype').setValue(result['quotedata']['ct']);
   
   this.contactForm2.get('financed').setValue(result['quotedata']['financed']);
   this.contactForm2.get('financed').disable();
   this.contactForm2.get('claimfree').setValue(result['quotedata']['claimfre']);
   let typeofcover = result['quotedata']['covertype'];

   if(typeofcover == "Third Party"){
    typeofcover = "TP"
   }
   else if(typeofcover == "Comprehensive")
   {
    typeofcover = "COMP"
    this.toggle1();
   }
   else if(typeofcover == "Third Party Fire and Theft")
   {
     typeofcover = "TPFT"
     this.toggle1();
   }
   this.contactForm2.get('options1').setValue(typeofcover);
   this.contactForm2.get('losspay').setValue(result['quotedata']['lpname']);
   this.contactForm2.get('lossloc').setValue(result['quotedata']['lploc']);
   this.contactForm2.get('vehicleValue').setValue(result['quotedata']['vehvalue']);
   this.contactForm2.get('alarm').setValue(result['quotedata']['alam']);
   this.contactForm3.get('coverageinfo').setValue(result['quotedata']['covertype']);
   +this.contactForm3.get('manualloadp').setValue(result['quotedata']['manloadp']);
   this.contactForm3.get('manualloadr').setValue(result['quotedata']['manloadr']);
   +this.contactForm3.get('manualdisc').setValue(result['quotedata']['mandisp']);
   this.contactForm3.get('manualdiscr').setValue(result['quotedata']['mandisr']);
   this.contactForm3.get('fleet').setValue(result['quotedata']['flet']);
   this.contactForm3.get('promotion').setValue(result['quotedata']['prom']);
   this.contactForm3.get('tax').setValue(result['quotedata']['tax']);
   this.contactForm3.get('annualgrosspremium').setValue(result['quotedata']['agp']);
   this.contactForm3.get('netprem').setValue(result['quotedata']['anp']);
   this.ncdvalue = result['quotedata']['autod'];
   this.contactForm3.get('quoted').setValue(result['quotedata']['result']);
   this.driverdata = result['quotedata']['driverdata'];
   this.driverservice.driver(this.driverdata);
   console.log(this.driverdata);
   this.contactForm1.disable();
   this.contactForm2.disable();
   this.contactForm3.disable();
   this.contactForm1.markAllAsTouched;
   this.contactForm2.markAllAsTouched;
   this.contactForm3.markAllAsTouched;
   let tabName = "Premium Summary"
   this.tabGroup._tabs['_results'][1].disabled = false;
   this.tabGroup._tabs['_results'][2].disabled = false;
      for (let i =0; i< document.querySelectorAll('.mat-tab-label-content').length; i++) {
        if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) {
          (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
        }
      }
    })
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
      let dob = this.dp.transform(this.contactForm1.get('dab').value, 'yyyy-MM-dd','es-ES');
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
      if(finance == null || finance == undefined){
        finance = false
      }
      console.log(finance)
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
      let alam = this.contactForm2.get('alarm').value;
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
      if(ct == null || ct == undefined){
        ct = false
      }
      console.log("CC"+ cc)
      console.log("client type"+ ct)
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
        var tax = this.contactForm3.get('tax').setValue(res.taxamt)
        var annualgp = this.contactForm3.get('annualgrosspremium').setValue(res.annualgpwpd)
        var netpre = this.contactForm3.get('netprem').setValue(res.annualnet)
        var coverinfo = this.contactForm3.get('coverageinfo').setValue(softu)
        this.contactForm3.get('netpremusd').setValue(res.annualnet)
        this.ncdvalue = res.nc
 
    }, error => {
      console.error("Error", error);
    });
  }
  onSave(){
    this.onSubmit();
    console.log("drivertable values",this.child.driverdata);
      let first = this.contactForm1.get('firstName').value;
      let last = this.contactForm1.get('lastName').value;
      let dob = this.dp.transform(this.contactForm1.get('dab').value, 'yyyy-MM-dd','es-ES');
      let idtype = this.contactForm1.get('idType').value;
      let idnumber = this.contactForm1.get('idNumber').value;
      let mob = this.contactForm1.get('dob').value;
      let email = this.contactForm1.get('dob1').value;
      let occp = this.contactForm1.get('occupation').value;
      let emp = this.contactForm1.get('employement').value;
      let sale = this.contactForm1.get('pointofsale').value;
      let prod = this.contactForm1.get('Product').value;
      let make = this.contactForm1.get('userInput').value;
      let yr = this.contactForm1.get('Year').value;
      let cc = this.contactForm1.get('EngineCC').value;
      let use = this.contactForm1.get('Use').value;
      let vehicletype = this.contactForm1.get('vehicleType').value;
      let soft = this.contactForm1.get('softtop').value;
      let ct = this.contactForm1.get('clienttype').value;
      
      if(ct == null || ct == undefined){
        ct = false
      }
      console.log("client type in onsave"+ ct);
      let finance = this.contactForm2.get('financed').value;
      if(finance == null || finance == undefined){
        finance = false
      }
      console.log(finance);
      let claimfre = this.contactForm2.get('claimfree').value;
      let losspayee = this.contactForm2.get('losspay').value;
      let losslocation = this.contactForm2.get('lossloc').value;
      let vehiclevalue = this.contactForm2.get('vehicleValue').value;
      let alam = this.contactForm2.get('alarm').value;
      let coverinfo = this.contactForm3.get('coverageinfo').value;
      let manload = +this.contactForm3.get('manualloadp').value;
      let manloadr = this.contactForm3.get('manualloadr').value;
      let manualdis = +this.contactForm3.get('manualdisc').value;
      let manualdiscr = this.contactForm3.get('manualdiscr').value;
      let fleet = this.contactForm3.get('fleet').value;
      let promotion = this.contactForm3.get('promotion').value;
      var remarks= this.contactForm3.get('remarks').value;
      let tax = this.contactForm3.get('tax').value;
      var annualgp = this.contactForm3.get('annualgrosspremium').value;
      var netpre = this.contactForm3.get('netprem').value;
      var username = localStorage.getItem('name');
      var userrole = localStorage.getItem('Role');
      console.log(userrole);
      if(userrole == "cs"){
        var status = "Review"
      }
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.post<any>(environment.URL + '/onsave', {first:first,last:last,dob:dob,idtype:idtype,idnumber:idnumber,mob:mob,email:email,occp:occp,
        emp:emp,sale:sale,prod:prod,make:make,yr:yr,cc:cc,use:use,vehicletype:vehicletype,soft:soft,ct:ct,finance:finance,claimfre:claimfre,losspayee:losspayee,
        losslocation:losslocation,vehiclevalue:vehiclevalue,alam:alam,coverinfo:coverinfo,manloadp:manload,manloadr:manloadr,
        manualdisc:manualdis,manualdiscr:manualdiscr,fleet:fleet,promotion:promotion,tax:tax,annualgp:annualgp,netpre:netpre,
        driverd: this.child.driverdata,autod: this.ncdvalue,remarks:remarks,username:username,userrole:userrole,reviewstatus:status,quotestatus:status},httpOptions ).subscribe((res: any) => { // not callback
        console.log(res.result);
        let qd = res.result;
        console.log("in on save");
        this.openquoteDialog(qd);
    }, error => {
      console.error("Error", error);
    });
  }
  openquoteDialog(quoteid) {
    const dialogRef1 = this.dialog.open(NewquotedialogComponent,{
      width: '450px',
      height: '250px',
      data:{
        quoteid: quoteid,
      },
    });
    dialogRef1.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/home');
      // window.location.reload();
       })
  }
  OncountrySelected(Selectedcountry) {
    
    console.log('### Trigger');
    var country = Selectedcountry['Country'];
    console.log(Selectedcountry);
    console.log(country);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(environment.URL + '/zipcode', {Country:country},httpOptions).subscribe(result => {
      console.log("-----------------------------------------");
      this.summaries = result;
      console.log(typeof(result));
      console.log(result);
    }, error => console.error(error));
      
      
    
  }
  OnzipSelected(Selectedzip) {
    
    console.log('### Trigger');
    
    var zip = Selectedzip['Zipcode'];
console.log(Selectedzip);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(environment.URL + '/town', {Zipcode:zip},httpOptions).subscribe(result => {
      console.log("-----------------------------------------");
      this.towns = result;
      console.log(typeof(result));
      console.log(result);
    }, error => console.error(error));
      
      
    
  }
}

