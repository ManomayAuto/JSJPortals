import { Component, Injectable,OnInit,AfterViewInit, ViewChild, ViewChildren, EventEmitter ,QueryList, Output} from '@angular/core';
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
import {QletterdialogComponent} from './qletterdialog/qletterdialog.component';
import { Observable, of, Subscription,zip, Subject } from 'rxjs';
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
      this.http.get<any>(environment.URL + '/vehicle',httpOptions).pipe(tap(data => this.opts = data));
  }
  countryData() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.copts.length ?
      of(this.copts) :
      this.http.get<any>(environment.URL + '/country',httpOptions).pipe(tap(cdata => this.copts = cdata));
  }
  lossData() {
    console.log("lossspayeeeeeeeeeeeeeeeeee");
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.lopts.length ?
      of(this.lopts) :
      this.http.get<any>(environment.URL + '/losspayee',httpOptions).pipe(tap(ldata => this.lopts = ldata));
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
export class dataformservice {
  $datas = new EventEmitter();
  dataform: any;
  dataforms: any;
  as;
  asp;
  constructor() { }

  driver1(dataform) {
    console.log("contactform");
 
  }
  driver2(dataforms) {
    console.log("contactform");

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
  extraprem = '';
  prom = '';
  discp = '';
  anp = '';
  selectDisabled = false;
  isReadonly = true;
  option = [];
  dupnext = false;
  isaddfinal = false;
  btnDisabled = true;
  btnDisableduw = true;
  btnDisabledcs = false;
  btnDisablednext = false;
  selectedIndex: any;
  countryoption = [];
  username: string;
  userrole: string;  
  remarksin: string;
  public summaries: any[];
  public towns: any[];
  public lossaddress: any[];
  public isduplicate: boolean = false;
  public isduplicater: boolean = false;
  public isduplicatecs: boolean = false;
  public isduplicatecsonly: boolean = true;
  public btnDisabledci: boolean = true;
  // today: Date = new Date();
  today: number;
  options: string[] = ["2030","2029","2028","2027","2026","2025","2024","2023","2022","2021","2020","2019","2018","2017","2016","2015","2014","2013","2012","2011","2010","2009","2008","2007","2006","2005","2004","2003","2002","2001","2000","1999","1998","1997","1996","1995","1994","1993","1992","1991","1990"];
filteredOptions: Observable<string[]>;
filteredOption: Observable<string[]>;
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
      'educationLevelName': 'Private Golf Cart - ICB',
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
  manualloadlist=[];
  manualdisclist=[];
  abc: any;
  Selectedzip: any;
  Selectedtown: any;
  Selectedloss: any;
  Selectedlosspay: any;
 
  
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
  actionvalue: string;
  test(a) {
    if(a.index == 2){
      this.onSubmit();
    }else{
      console.log('Tab2 is not selected!');
    }
  }

  constructor(private  authenticationService : AuthenticationService,private driverservice: driverservice,private dataformservice:dataformservice,private service: Service,private router: Router,public dialog: MatDialog,private dp: DatePipe,
    private route: ActivatedRoute,private as : dataformservice,

    private http: HttpClient, private f1 : FormBuilder, 
    private f2 : FormBuilder, private f3 : FormBuilder, private f4 : FormBuilder,private f5 : FormBuilder, public snackBar: MatSnackBar){
   

      setInterval(() => {
        this.today = Date.now();
      }, 1);
  }

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 790 ? 1 : 3; //
    this.userrole = localStorage.getItem('Role');
    
    if(this.userrole == "cs"){
      console.log("inarr")
    this.manualloadlist = [
      { id : 0, manpercentage: '0%'},
          { id : 10, manpercentage: '10%'},
        { id : 15, manpercentage: '15%'},
        { id : 20, manpercentage: '20%'},
        { id : 25, manpercentage: '25%'},
        { id : 30, manpercentage: '30%'},
        { id : 35, manpercentage: '35%'},
        { id : 40, manpercentage: '40%'},
        { id : 45, manpercentage: '45%'},
        { id : 50, manpercentage: '50%'},
        { id : 55, manpercentage: '55%'},
        { id : 60, manpercentage: '60%'},
        { id : 65, manpercentage: '65%'},
        { id : 70, manpercentage: '70%'},
      ];
    this.manualdisclist =[
      { id : 0, manpercentage: '0%'},
      { id : 5, manpercentage: '5%'},
      { id : 10, manpercentage: '10%'},
    ];
    }
    else{
      this.manualloadlist = [
        { id : 0, manpercentage: '0%'},
          { id : 10, manpercentage: '10%'},
        { id : 15, manpercentage: '15%'},
        { id : 20, manpercentage: '20%'},
        { id : 25, manpercentage: '25%'},
        { id : 30, manpercentage: '30%'},
        { id : 35, manpercentage: '35%'},
        { id : 40, manpercentage: '40%'},
        { id : 45, manpercentage: '45%'},
        { id : 50, manpercentage: '50%'},
        { id : 55, manpercentage: '55%'},
        { id : 60, manpercentage: '60%'},
        { id : 65, manpercentage: '65%'},
        { id : 70, manpercentage: '70%'},
        { id : 75, manpercentage: '75%'},
        { id : 80, manpercentage: '80%'},
        { id : 85, manpercentage: '85%'},
        { id : 90, manpercentage: '90%'},
        { id : 95, manpercentage: '95%'},
        { id : 100, manpercentage: '100%'},
      ];
      this.manualdisclist =[
        { id : 0, manpercentage: '0%'},
        { id : 5, manpercentage: '5%'},
        { id : 10, manpercentage: '10%'},
        { id : 15, manpercentage: '15%'},
        { id : 20, manpercentage: '20%'},
      ];
    }
    console.log(this.userrole);
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
    addremarks: [''],
    quoted: [''],
    quotestat: [''],
    deductibles:  [''],
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
      EngineNumber:  ['',Validators.required],
    });
    this.contactForm4.get('currency').setValue('BahamianDollars');
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
  let quotei =  this.route.snapshot.paramMap.get('view');
  console.log("view",quotei);  
    if(quotei != null){
      console.log("not null");
    this.getSomethings();
  }
  // this.abc=this.dataService.SharedData;
  let quoteid =  this.route.snapshot.paramMap.get('title');
  console.log("edit",quoteid);  
    if(quoteid != null){
      console.log("not null");
    this.getSomething();
    
  }
  }
  getSomethings(){
    this.dupnext = true;
    this.isduplicate = true;
      this.selectedIndex =  1;
      this.btnDisabled = false;
      this.btnDisabledci = false;
      this.btnDisableduw = false;
      // this.isduplicatecs = true;
      // this.isduplicatecs = !this.isduplicatecs;
    console.log("view")
    if(this.userrole == 'cs'){
      // this.contactForm1.markAllAsTouched();
      this.contactForm2.clearValidators();
      this.contactForm2.clearAsyncValidators();
      // this.contactForm2.markAllAsTouched();
      // this.contactForm3.markAllAsTouched();
    //  this.contactForm1.disable();
    //  this.contactForm2.disable();
    //  this.contactForm3.disable();
    // this.dupnext = true;
     
    this.btnDisabledcs = true;
    // this.isduplicatecs = !this.isduplicatecs;
    }
    let quoteid =  this.route.snapshot.paramMap.get('view');
    console.log("getSomething not null");
    this.isaddfinal = true;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post<any>(environment.URL + `/pickquote`,{quoteid},httpOptions).subscribe((result) => { 
      console.log("searchdone!!!!",result);
      console.log(result);
      // this.dupnext = true;
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
    var softop = +result['softop'];
   this.contactForm1.get('softtop').setValue(softop);
   var ct = +result['ct'];
   this.contactForm1.get('clienttype').setValue(ct);
   this.contactForm1.disable();
   var fin = +result['financed'];
   this.contactForm2.get('financed').setValue(fin);
   if(fin == 1){
this.toggle3();
   }
   console.log(result['claimfre']);
   console.log(typeof(result['claimfre']));
   var claimy = result['claimfre'].toString();
    this.contactForm2.get('claimfree').setValue(claimy);
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
    var layn = result['lpname'];
    console.log(layn)
    if(layn != null || layn != undefined)
   {
     console.log("In layn"+ layn)
    this.displayFnloss(layn); 
    // this.contactForm2.get('losspay').setValue(result['lpname']);
    this.Selectedlosspay = result['lpname'];
   }
   else{
     console.log("not in layn");
   }
    this.contactForm2.get('lossloc').setValue(result['lploc']);
    this.lossaddress = [{lossad: result['lploc']}];
    console.log(this.lossaddress[0]);
    this.Selectedloss = this.lossaddress[0];
    console.log(this.lossaddress);
    this.contactForm2.get('vehicleValue').setValue(result['vehvalue']);
    var alam = +result['alam']
    this.contactForm2.get('alarm').setValue(alam);
    this.contactForm2.disable();
    this.contactForm3.get('coverageinfo').setValue(result['covertype']);
    +this.contactForm3.get('manualloadp').setValue(result['manloadp']);
    this.contactForm3.get('manualloadr').setValue(result['manloadr']);
    +this.contactForm3.get('manualdisc').setValue(result['mandisp']);
    this.contactForm3.get('manualdiscr').setValue(result['mandisr']);
    var flet = +result['flet']
    this.contactForm3.get('fleet').setValue(flet);
    var prom = +result['prom'];
    this.contactForm3.get('promotion').setValue(prom);
    this.contactForm3.get('tax').setValue(result['tax']);
    this.contactForm3.get('annualgrosspremium').setValue(result['agp']);
    this.contactForm3.get('netprem').setValue(result['anp']);
    this.ncdvalue = result['autod'];
    this.driverdata = result['driverdata'];
    this.contactForm3.get('quoted').setValue(result['quoteid']);
    this.contactForm3.get('quotestat').setValue(result['quotestatus']);
    console.log(result['remarks']);
    this.contactForm3.get('remarks').setValue(result['remarks']);
    
    this.driverservice.driver(this.driverdata);

    if(result['quotestatus'] == "Active"){
      this.btnDisabled = true;
      // this.btnDisablednext = true;
      this.isduplicatecs = true;
      if(this.userrole == "uw"){
        this.btnDisableduw = true;
      }
    }
    else if(result['quotestatus'] == "Not Issued"){
      if(this.userrole == "cs"){
        this.isduplicatecsonly = false
        this.isduplicatecs =  true
        this.isaddfinal = false
      }
      else{
        this.isduplicatecs = false;
      }
 
    }
    else if(result['quotestatus'] == "Declined"){
      this.btnDisabled = true
      this.btnDisableduw = true
      this.isduplicatecs = true
      this.isaddfinal = false
    }
    else if(result['quotestatus'] == "Saved"){
      this.btnDisableduw = true
      this.isaddfinal = false
    }
    // else{
    //   this.isduplicatecs = false
    // }
    this.contactForm3.disable();
    // this.contactForm1.markAllAsTouched;
    // this.contactForm2.markAllAsTouched;
    // this.contactForm3.markAllAsTouched;
    this.contactForm4.get('addressType').setValue(result['adtype']);
    this.contactForm4.get('streetName').setValue(result['street']);
    console.log(result['countri'])
    console.log(result['zipc'])
    console.log(result['citi'])
    var countri = result['countri']
  //  this.contactForm4.get('zipCode').setValue(result['zip']);
  //  this.contactForm4.get('cityTown').setValue(result['city']);

if(!countri)
 {
  this.displayFncountry(countri);
  this.contactForm4.get('country').setValue(result['countri']);
 }
 else{
   console.log("not in countri");
 }

//   this.contactForm4.get('zipCode').setValue(result['zip']);
//  console.log(typeof(result['zip']));
// this.summaries = Array.of(result['zip']);
if(!result['zipc']){
  this.summaries = [{Zipcode: result['zipc']}];
  this.Selectedzip = this.summaries[0];
}
if(!result['citi']){
  this.towns = [{Town: result['citi']}];
  this.Selectedtown = this.towns[0];
}

    });  
    
  }
  getSomething(){
    this.dupnext = true;
    this.isduplicate = true;
    this.selectedIndex =  1;
    this.btnDisabled = false;
    this.btnDisabledci = false;
      this.btnDisableduw = false;
      // this.isduplicatecs = !this.isduplicatecs;
    if(this.userrole == 'cs'){
      // this.contactForm1.markAllAsTouched();
      this.contactForm2.clearValidators();
      this.contactForm2.clearAsyncValidators();
      // this.contactForm2.markAllAsTouched();
      // this.contactForm3.markAllAsTouched();
    //  this.contactForm1.disable();
    //  this.contactForm2.disable();
    //  this.contactForm3.disable();
    //  this.dupnext = true;
    this.btnDisabledcs = true;
    //  this.isduplicatecs = !this.isduplicatecs;
    }
    let quoteid =  this.route.snapshot.paramMap.get('title');
    console.log("getSomething not null");
    this.isaddfinal = true;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    this.http.post<any>(environment.URL + `/pickquote`,{quoteid},httpOptions).subscribe((result) => { 
      console.log("searchdone!!!!",result);
    var status= result['quotestatus'];
    // if(this.userrole == "cs" && status == "Not Issued"){
    //   console.log("in subbbbbbbbbbbbbbbbbbbbbbbb")
    //   this.isduplicatecs = false;
    // }
    // if(status == "Active"){
    //   console.log("inactivvvvvvvvvvvvvvvvvvvvvvvvv")
    //   this.btnDisabled = false;
    // }
      console.log("stat",status);
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
    var softop = +result['softop'];
   this.contactForm1.get('softtop').setValue(softop);
   var ct = +result['ct'];
   this.contactForm1.get('clienttype').setValue(ct);
   var fin = +result['financed'];
   this.contactForm2.get('financed').setValue(fin);
   if(fin == 1){
this.toggle3();
   }
   console.log(result['claimfre']);
   console.log(typeof(result['claimfre']));
   var claimy = result['claimfre'].toString();
    this.contactForm2.get('claimfree').setValue(claimy);
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
    var layn = result['lpname'];
    console.log(layn)
    if(layn != null || layn != undefined)
   {
     console.log("In layn"+ layn)
    this.displayFnloss(layn); 
    // this.contactForm2.get('losspay').setValue(result['lpname']);
    this.Selectedlosspay = result['lpname'];
   }
   else{
     console.log("not in layn");
   }
    this.contactForm2.get('lossloc').setValue(result['lploc']);
    this.lossaddress = [{lossad: result['lploc']}];
    console.log(this.lossaddress[0]);
    this.Selectedloss = this.lossaddress[0];
    console.log(this.lossaddress);
    this.contactForm2.get('vehicleValue').setValue(result['vehvalue']);
    var alam = +result['alam']
    this.contactForm2.get('alarm').setValue(alam);
    this.contactForm3.get('coverageinfo').setValue(result['covertype']);
    +this.contactForm3.get('manualloadp').setValue(result['manloadp']);
    this.contactForm3.get('manualloadr').setValue(result['manloadr']);
    +this.contactForm3.get('manualdisc').setValue(result['mandisp']);
    this.contactForm3.get('manualdiscr').setValue(result['mandisr']);
    var flet = +result['flet']
    this.contactForm3.get('fleet').setValue(flet);
    var prom = +result['prom'];
    this.contactForm3.get('promotion').setValue(prom);
    this.contactForm3.get('tax').setValue(result['tax']);
    this.contactForm3.get('annualgrosspremium').setValue(result['agp']);
    this.contactForm3.get('netprem').setValue(result['anp']);
    this.ncdvalue = result['autod'];
    this.driverdata = result['driverdata'];
    this.contactForm3.get('quoted').setValue(result['quoteid']);
    this.contactForm3.get('quotestat').setValue(result['quotestatus']);
    console.log(result['remarks']);
    this.contactForm3.get('remarks').setValue(result['remarks']);
    this.driverservice.driver(this.driverdata);
    if(result['quotestatus'] == "Active"){
      this.btnDisabled = true;
      // this.btnDisablednext = true;
      this.isduplicatecs = true;
      if(this.userrole == "uw"){
        this.btnDisableduw = true;
      }
    }
    else if(result['quotestatus'] == "Not Issued"){
      if(this.userrole == "cs"){
        this.isduplicatecsonly = false
        this.isduplicatecs =  true
        this.isaddfinal = false
      }
      else{
        this.isduplicatecs = false;
      }
 
    }
    else if(result['quotestatus'] == "Declined"){
      this.btnDisabled = true
      this.btnDisableduw = true
      this.isduplicatecs = true
      this.isaddfinal = false
    }
    else if(result['quotestatus'] == "Saved"){
      this.btnDisableduw = true
      this.isaddfinal = false
    }
    // else{
    //   this.isduplicatecs = false
    // }
    this.contactForm4.get('addressType').setValue(result['adtype']);
      this.contactForm4.get('streetName').setValue(result['street']);
      console.log(result['countri'])
      console.log(result['zipc'])
      console.log(result['citi'])
      var countri = result['countri']
    //  this.contactForm4.get('zipCode').setValue(result['zip']);
    //  this.contactForm4.get('cityTown').setValue(result['city']);
 
    if(!countri)
    {
     this.displayFncountry(countri);
     this.contactForm4.get('country').setValue(result['countri']);
    }
    else{
      console.log("not in countri");
    }
   
   //   this.contactForm4.get('zipCode').setValue(result['zip']);
   //  console.log(typeof(result['zip']));
   // this.summaries = Array.of(result['zip']);
   if(!result['zipc']){
     this.summaries = [{Zipcode: result['zipc']}];
     this.Selectedzip = this.summaries[0];
   }
   if(!result['citi']){
     this.towns = [{Town: result['citi']}];
     this.Selectedtown = this.towns[0];
   }



  // if(countri != null || countri != undefined)
  //  {
  //   this.displayFncountry(countri);
  //   this.contactForm4.get('country').setValue(result['countri']);
  //  }
  //  else{
  //    console.log("not in countri");
  //  }
  //  this.summaries = [{Zipcode: result['zipc']}];
  // this.towns = [{Town: result['citi']}];
  // this.Selectedzip = this.summaries[0];
  // this.Selectedtown = this.towns[0];



//   this.contactForm4.get('zipCode').setValue(result['zip']);
//  console.log(typeof(result['zip']));
  // this.summaries = Array.of(result['zip']);
 
//   this.contactForm4.get('zipCode').setValue(this.summaries[0]);
//  console.log(this.summaries);
  
    // this.contactForm1.markAllAsTouched;
    // this.contactForm2.markAllAsTouched;
    // this.contactForm3.markAllAsTouched;
    if(this.userrole == 'cs'){
    if(status=='Not Issued'||status=='Expired'){
      this.contactForm1.disable();
    }
    else if(status=='Active'){
      this.contactForm1.disable();
      this.contactForm2.disable();
      this.contactForm3.disable();
    }}
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

    if (value.MakeModelCC) { 
    
      return value.MakeModelCC; }
    else if(value){
      console.log(value);
      console.log(typeof(value));
return value;
    }
  }
  displayFncountry(value) {
    if(value != undefined){
      if(value.Country){
        return value.Country;
            }
      else if (value) {
        console.log(value);
        console.log(typeof(value)); 
        return value; }
    }
  
    
  }
  displayFnloss(value){
    
    console.log("lossval"+ value);
    if(value != undefined){
      if(value.Description){
        console.log("value and desc");
        return value.Description;
      }
      else if (value) {console.log(value);
        console.log(typeof(value));
      return value; }
    }
    else{
      console.log("value is undefined");
      return value;
    }
    
  }
  toggle() {
    this.hide = this.show
    }
    toggle1() {
      this.hide = !this.show
      }
      toggle3() {
        this.sho = !this.sho;
        this.contactForm2.get('losspay').clearValidators();
          this.contactForm2.get('losspay').updateValueAndValidity();
        if(this.contactForm2.get('financed').value == false){
          this.contactForm2.get('losspay').setValidators([Validators.required])
          this.contactForm2.get('losspay').updateValueAndValidity();
        }
        else{
          this.contactForm2.get('losspay').clearValidators();
          this.contactForm2.get('losspay').updateValueAndValidity();
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
if(result){
  console.log("tbest",result);
  this.contactForm1.get('firstName').setValue(result['name']);
  this.contactForm1.get('lastName').setValue(result['lname']);
  this.contactForm1.get('dab').setValue(result['dob']);
  this.contactForm1.get('idType').setValue(result['idtype']);
  this.contactForm1.get('idNumber').setValue(result['idno']);
  this.contactForm1.get('dob').setValue(result['phn']);
  this.contactForm1.get('dob1').setValue(result['email']);
 
   this.contactForm1.get('clienttype').setValue(true);
 
  
  this.contactForm4.get('addressType').setValue(result['addresstype']);
  this.contactForm4.get('streetName').setValue(result['street']);
  var countri = result['country'];
 
  if(countri != null || countri != undefined)
   {
    this.displayFncountry(countri);
    this.contactForm4.get('country').setValue(result['country']);
   }
   else{
     console.log("not in countri");
   }
  
//   this.contactForm4.get('zipCode').setValue(result['zip']);
//  console.log(typeof(result['zip']));
  // this.summaries = Array.of(result['zip']);
  this.summaries = [{Zipcode: result['zip']}];
  this.towns = [{Town: result['town']}];
  this.Selectedzip = this.summaries[0];
  this.Selectedtown = this.towns[0];
//   this.contactForm4.get('zipCode').setValue(this.summaries[0]);
//  console.log(this.summaries);
  
  // this.towns = Array.of(result['town']);
  
  // this.contactForm4.get('cityTown').setValue(this.towns[0]);
  // console.log(this.towns);
 // this.contactForm1 = this.f4.group({
 //   firstName: [result['name']],
 //   lastName:[result['lname']],
 //   dab:[result['dob']],
 //   idType:[result['idtype']],
 //   idNumber:[result['idno']],
 //   dob:[result['phn']],
 //   dob1:[result['email']],

 // })
}
 
 
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
      // var layn = result['quotedata']['lpname'];
      // if(layn != null || layn != undefined)
      // {
      //  this.displayFnloss(layn); 
      //  // this.contactForm2.get('losspay').setValue(result['quotedata']['lpname']);
      //  this.Selectedlosspay = result['quotedata']['lpname'];
      // }
      // else{
      //   console.log("not in layn");
      // }
      // let make1 = this.contactForm1.get('userInput')['MakeModelCC'];
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
      // if(soft==0){
      //   soft=false;
      // }
      console.log(soft)
      let ct = this.contactForm1.get('clienttype').value;
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      var con=this.contactForm1;
      this.dataformservice.driver1(con);
      this.as.dataform = con;
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
          this.isduplicater = !this.isduplicater;
          this.isduplicatecs = !this.isduplicatecs;
        }
    }, error => {
      console.error("Error", error);
    });

      
     

    }
    else{
      this.openSnackBar("Please fill the mandatory fields", "Dismiss")
    }

  }
  onrequote(){
    let quoteid = this.contactForm3.get('quoted').value;
    console.log(quoteid);
    var username = localStorage.getItem('name');
      var userrole = localStorage.getItem('Role');
      console.log(userrole);
      console.log(username)
      if(userrole == "cs"){
        var status = "For Review"
        var typeofaction = "Requote Request"
      }
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      return this.http.post<any>(environment.URL + '/requote', {quoteid:quoteid,username:username,userrole:userrole,reviewstatus:status,quotestatus:status,typeofaction:typeofaction},httpOptions ).subscribe((res: any) => { // not callback
    console.log(res);
        this.openSnackBar("Requote request has been submitted", "Dismiss");
        setTimeout(() => {
          this.router.navigateByUrl('/home');
          }, 3000);
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
   this.dupnext = true;
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
   var softop = +result['quotedata']['softop'];
   this.contactForm1.get('softtop').setValue(softop);
   var ct = +result['quotedata']['ct'];
   this.contactForm1.get('clienttype').setValue(ct);
   var fin = +result['quotedata']['financed'];
   this.contactForm2.get('financed').setValue(fin);
   if(fin == 1){
    this.toggle3();
       }
   console.log("finacneeee"+result['quotedata']['financed']);
   this.contactForm2.get('financed').disable();
   var claimy = result['quotedata']['claimfre'].toString();
   this.contactForm2.get('claimfree').setValue(claimy);
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
   var layn = result['quotedata']['lpname'];
   if(layn != null || layn != undefined)
   {
    this.displayFnloss(layn); 
    // this.contactForm2.get('losspay').setValue(result['quotedata']['lpname']);
    this.Selectedlosspay = result['quotedata']['lpname'];
   }
   else{
     console.log("not in layn");
   }
   this.contactForm2.get('lossloc').setValue(result['quotedata']['lploc']);
   this.lossaddress = [{lossad: result['quotedata']['lploc']}];
   console.log(this.lossaddress[0]);
   this.Selectedloss = this.lossaddress[0];
   console.log(this.lossaddress);
   this.contactForm2.get('lossloc').setValue(result['quotedata']['lploc']);
   this.contactForm2.get('vehicleValue').setValue(result['quotedata']['vehvalue']);
   var alam = +result['quotedata']['alam']
   this.contactForm2.get('alarm').setValue(alam);
   this.contactForm3.get('coverageinfo').setValue(result['quotedata']['covertype']);
   +this.contactForm3.get('manualloadp').setValue(result['quotedata']['manloadp']);
   this.contactForm3.get('manualloadr').setValue(result['quotedata']['manloadr']);
   +this.contactForm3.get('manualdisc').setValue(result['quotedata']['mandisp']);
   this.contactForm3.get('manualdiscr').setValue(result['quotedata']['mandisr']);
   var flet = +result['quotedata']['flet']
   this.contactForm3.get('fleet').setValue(flet);
   var prom = +result['quotedata']['prom'];
   this.contactForm3.get('promotion').setValue(prom);
   this.contactForm3.get('tax').setValue(result['quotedata']['tax']);
   this.contactForm3.get('annualgrosspremium').setValue(result['quotedata']['agp']);
   this.contactForm3.get('netprem').setValue(result['quotedata']['anp']);
   this.ncdvalue = result['quotedata']['autod'];
   this.contactForm3.get('quoted').setValue(result['quotedata']['result']);
   this.driverdata = result['quotedata']['driverdata'];
   this.driverservice.driver(this.driverdata);
   console.log(this.driverdata);
   var countri = result['quotedata']['country'];
   if(countri != null || countri != undefined)
   {
    this.displayFncountry(countri);
    this.contactForm4.get('country').setValue(result['quotedata']['country']);
   }
   else{
     console.log("not in countri");
   }
  
  //  this.contactForm4.get('zipCode').setValue(result['zip']);
  // console.log(typeof(result['zip']));
  //  this.summaries = result['zip'];
 
 
  //  this.contactForm4.get('cityTown').setValue(result['town']);
  //  this.towns = result['town'];
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
    this.contactForm2.enable();
   if(this.child.driverdata.length !=0){
    if(this.contactForm2.valid){
      this.tabGroup._tabs['_results'][2].disabled = false;
      for (let i =0; i< document.querySelectorAll('.mat-tab-label-content').length; i++) {
        if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) {
          (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
          console.log("drivertable values",this.child.driverdata);
        }
      }
      this.onSubmit();
      console.log("drivertable values",this.child.driverdata);
    }
    else{
      this.openSnackBar("Please fill the mandatory fields", "Dismiss")
    }
 }
 else{
  this.openSnackBar("Atleast one driver should be added", "Dismiss")
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
  addsubmit() {
 
    if(this.contactForm4.valid){
    this.onSave('Final');
    }
    else{
      this.openSnackBar("Please fill the mandatory fields", "Dismiss")
    }

}
addremarkstest() {
  let f = localStorage.getItem('name');
  let e = this.contactForm3.get('addremarks').value;
  
//   if(this.remarksin == null || this.remarksin == undefined ||this.remarksin == ''){
// this.remarksin = "@"+ f + "-" + e + "\n"

//   }
  // else{
    var lastupdated = this.dp.transform(this.today, 'yy-MM-dd HH:mm','es-ES');
      let k = this.contactForm3.get('remarks').value;
      if(k){
 this.remarksin = k + "@"+ f + "-" + e + "("+lastupdated+")" + "\n"
      }
      else{
        this.remarksin = "@"+ f + "-" + e + "("+lastupdated+")" + "\n"
      }
     

    
    
    
  // }
  this.contactForm3.get('remarks').setValue(this.remarksin)

}
  uwnext(tabName: string){
    console.log("in uw next")
    this.contactForm1.enable();
    if(this.contactForm1.valid){
      if(this.userrole == 'cs'){
        this.contactForm1.disable();
      }
      // this.contactForm1.disable();
      this.tabGroup._tabs['_results'][1].disabled = false;
      for (let i =0; i< document.querySelectorAll('.mat-tab-label-content').length; i++) {
        if ((<HTMLElement>document.querySelectorAll('.mat-tab-label-content')[i]).innerText == tabName) {
          (<HTMLElement>document.querySelectorAll('.mat-tab-label')[i]).click();
          var con=this.contactForm1;
          this.dataformservice.driver1(con);
          this.as.dataform = con;

        }
      }
    }
    
      else{
        this.openSnackBar("Please fill the mandatory fields", "Dismiss")
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
      console.log(manload);
      if(manload == null || manload == undefined){
        manload = 0
      }
      else{
        manload =(+manload) / 100;
      }
      console.log(manload);
      let manloadr = this.contactForm3.get('manualloadr').value;
      let manualdis = +this.contactForm3.get('manualdisc').value;
      if(manualdis == null || manualdis == undefined){
        manualdis = 0
      }
      else{
       manualdis = (+manualdis) / 100;
      }
      console.log(manualdis);
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
      else if (prod == 'Private Golf Cart - ICB'){
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
        this.extraprem = res.extraprem
        this.prom = res.prom
        this.discp = res.discp
        this.anp = res.anp
 
    }, error => {
      console.error("Error", error);
    });
  }
  onSave(action){
    var actionvalue = action;
    console.log(actionvalue);
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
      console.log(make);
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
      console.log(losspayee);
      
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
      
      // var target = event.target || event.srcElement || event.currentTarget;
      // var idAttr = target.attributes.id;
      // var actionvalue = idAttr.value;
      // console.log(actionvalue);
      // console.log(String(actionvalue));
      if(userrole == "cs"){
        var quotestatus = "For Review"
        var reviewstatus = "For Review"
        var typeofaction = "Referral Review"
      }
      else{
        var quotestatus = String(actionvalue);
      }
      
      if(actionvalue == "Active" || actionvalue =="Declined"){
        var reviewstatus = "Completed"
      }
      else if(actionvalue == "Saved"){
        var reviewstatus = "Pending"
      }
      else if(actionvalue == "Savedcs"){
        quotestatus = "Not Issued"
      }
      else if(actionvalue == "complete"){
        quotestatus = "Active"
        reviewstatus = ""
        typeofaction = ""
      }
      var lastupdated = this.dp.transform(this.today, 'yyyy-MM-dd HH:mm','es-ES');
      // var lastupdated = this.dp.transform(this.today, 'yyyy-MM-dd','es-ES');
      console.log("last updateddddddd");
      console.log(lastupdated)
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      console.log(losspayee);
      console.log(typeof(losspayee));
      if(losslocation){
        console.log("in loc");
        losslocation = ''
      }
      if(losspayee){
        console.log("in pay");
        losspayee = ''
      }
      let adtype = this.contactForm4.get('addressType').value;
      if(adtype == null || adtype == undefined){
        adtype = ''
      }
      let street = this.contactForm4.get('streetName').value;
      if(street == null || street == undefined){
        street = ''
      }
      let countri = this.contactForm4.get('country').value;
      if(countri == null || countri == undefined){
        countri = ''
      }
      let zip = this.contactForm4.get('zipCode').value;
      if(zip == null || zip == undefined){
        zip = ''
      }
      else{
        zip= zip['Zipcode'];
      }
      
      let city= this.contactForm4.get('cityTown').value;
      if(city == null || city == undefined){
        city = ''
      }
      else{
        city= city['Town'];
      }
      
      console.log(adtype);
      console.log(street);
      console.log(countri);
      console.log(zip);
      console.log(city);
      if(userrole == "uw" && actionvalue == "Save"){
        var reviewstatus = "For Review"
        var quotestatus = "For Review"
        var typeofaction = "Referral Review"
      }
      if(actionvalue == "Submitreview"){
        var reviewstatus = "For Review"
        var quotestatus = "For Review"
        var typeofaction = ""
      }
      if(actionvalue == "Save" || actionvalue == "Savedcs" || actionvalue == "complete"){
        return this.http.post<any>(environment.URL + '/onsave', {first:first,last:last,dob:dob,idtype:idtype,idnumber:idnumber,mob:mob,email:email,occp:occp,
          emp:emp,sale:sale,prod:prod,make:make,yr:yr,cc:cc,use:use,vehicletype:vehicletype,soft:soft,ct:ct,finance:finance,claimfre:claimfre,losspayee:losspayee,
          losslocation:losslocation,vehiclevalue:vehiclevalue,alam:alam,coverinfo:coverinfo,manloadp:manload,manloadr:manloadr,
          manualdisc:manualdis,manualdiscr:manualdiscr,fleet:fleet,promotion:promotion,tax:tax,annualgp:annualgp,netpre:netpre,
          driverd: this.child.driverdata,autod: this.ncdvalue,remarks:remarks,typeofaction:typeofaction,username:username,userrole:userrole,reviewstatus:reviewstatus,quotestatus:quotestatus,
          adtype:adtype,street:street,countri:countri,zipc:zip,citi:city},httpOptions ).subscribe((res: any) => { // not callback
          console.log("========================");
            console.log(res);
            console.log(res.result);
            console.log(res.quotestatus);
          let qd = res.result;
          let qs = res.quotestatus;
          console.log("in on saverrrrr");
          console.log(qs);
  if(qs == "Active"){
    this.openquoteDialogactive(qd,qs);
  }
  else{
    this.openquoteDialog(qd,qs);
  }
            
      
      }, error => {
        console.error("Error", error);
      });
      }
      
      else if(actionvalue == "Active" || actionvalue == "Declined" || actionvalue == "Saved" || actionvalue == "Submitreview"){
        console.log(actionvalue);
        let quoteid = this.contactForm3.get('quoted').value;
        if(actionvalue == "Declined" || actionvalue == "Saved"){
          console.log()
          if(this.contactForm3.get('addremarks').value == "" || this.contactForm3.get('addremarks').value == null || this.contactForm3.get('addremarks').value == undefined){
            // console.log("valiateew22222222e");
            // this.contactForm3.get('addremarks').setValidators([Validators.required]);
            // this.contactForm3.get('addremarks').markAsDirty();
            this.openSnackBar("Please add remarks", "Dismiss");
            
          }
          else{
            // this.addremarkstest();
            return this.http.post<any>(environment.URL + '/appdecline', {quoteid:quoteid,first:first,last:last,dob:dob,idtype:idtype,idnumber:idnumber,mob:mob,email:email,occp:occp,
              emp:emp,sale:sale,prod:prod,make:make,yr:yr,cc:cc,use:use,vehicletype:vehicletype,soft:soft,ct:ct,finance:finance,claimfre:claimfre,losspayee:losspayee,
              losslocation:losslocation,vehiclevalue:vehiclevalue,alam:alam,coverinfo:coverinfo,manloadp:manload,manloadr:manloadr,
              manualdisc:manualdis,manualdiscr:manualdiscr,fleet:fleet,promotion:promotion,tax:tax,annualgp:annualgp,netpre:netpre,
              driverd: this.child.driverdata.filter(value => Object.keys(value).length !== 0),autod: this.ncdvalue,remarks:remarks,typeofaction:typeofaction,username:username,userrole:userrole,reviewstatus:reviewstatus,quotestatus:quotestatus,lastupdated:lastupdated},httpOptions ).subscribe((res: any) => { // not callback
    console.log(res);
              console.log("in on save-Approve or Decline");
              if(res['quotestaus'] == "Active")
              { 
                this.openSnackBar("This Quote has been approved", "Dismiss");
                setTimeout(() => {
                  this.router.navigateByUrl('/home');
                  }, 3000);
              }
              else if(res['quotestaus'] == "Declined"){
                this.openSnackBar("This quote has been declined", "Dismiss");
                setTimeout(() => {
                  this.router.navigateByUrl('/home');
                  }, 3000);
              }
              else if(res['reviewstatus'] == "Pending"){
                this.openSnackBar("This Quote has been Saved", "Dismiss");
                setTimeout(() => {
                  this.router.navigateByUrl('/home');
                  }, 3000);
              }
              else if(res['quotestaus'] == "For Review"){
                console.log("in testttttttttttttttttttttt")
                  let qd = res['quoteid']
                  let qs = res['quotestaus']
                this.openquoteDialog(qd,qs);
              }
          }, error => {
            console.error("Error", error);
          });
          }
          
          
        }
        else{
          return this.http.post<any>(environment.URL + '/appdecline', {quoteid:quoteid,first:first,last:last,dob:dob,idtype:idtype,idnumber:idnumber,mob:mob,email:email,occp:occp,
            emp:emp,sale:sale,prod:prod,make:make,yr:yr,cc:cc,use:use,vehicletype:vehicletype,soft:soft,ct:ct,finance:finance,claimfre:claimfre,losspayee:losspayee,
            losslocation:losslocation,vehiclevalue:vehiclevalue,alam:alam,coverinfo:coverinfo,manloadp:manload,manloadr:manloadr,
            manualdisc:manualdis,manualdiscr:manualdiscr,fleet:fleet,promotion:promotion,tax:tax,annualgp:annualgp,netpre:netpre,
            driverd: this.child.driverdata.filter(value => Object.keys(value).length !== 0),autod: this.ncdvalue,remarks:remarks,typeofaction:typeofaction,username:username,userrole:userrole,reviewstatus:reviewstatus,quotestatus:quotestatus,lastupdated:lastupdated},httpOptions ).subscribe((res: any) => { // not callback
  console.log(res);
            console.log("in on save-Approve or Decline");
            if(res['quotestaus'] == "Active")
            { 
              this.openSnackBar("This Quote has been approved", "Dismiss");
              setTimeout(() => {
                this.router.navigateByUrl('/home');
                }, 3000);
            }
            else if(res['quotestaus'] == "Declined"){
              this.openSnackBar("This quote has been declined", "Dismiss");
              setTimeout(() => {
                this.router.navigateByUrl('/home');
                }, 3000);
            }
            else if(res['reviewstatus'] == "Pending"){
              this.openSnackBar("This Quote has been Saved", "Dismiss");
              setTimeout(() => {
                this.router.navigateByUrl('/home');
                }, 3000);
            }
            else if(res['quotestaus'] == "For Review"){
                console.log("in testttttttttttttttttttttt")
                  let qd = res['quoteid']
                  let qs = res['quotestaus']
                this.openquoteDialog(qd,qs);
              }
        }, error => {
          console.error("Error", error);
        });
        }
      
      }
       
      else if(actionvalue == "Final"){
        let quoteid = this.contactForm3.get('quoted').value;
        let addresstype = this.contactForm4.get('addressType').value;
        let streetname = this.contactForm4.get('streetName').value;
        let country = this.contactForm4.get('country').value;
        let zip = this.contactForm4.get('zipCode').value;
        let citytown = this.contactForm4.get('cityTown').value;
        let policystartDate = this.dp.transform(this.contactForm4.get('policystartDate').value, 'yyyy-MM-dd','es-ES');
        let policyendDate = this.dp.transform(this.contactForm4.get('policyendDate').value, 'yyyy-MM-dd','es-ES');
        let policyType = this.contactForm4.get('policyType').value;
        let currency = this.contactForm4.get('currency').value;
        let businessclass = this.contactForm4.get('businessClass').value;
        let branch = this.contactForm4.get('branch').value;
        let engineno = this.contactForm4.get('EngineNumber').value;
        console.log(engineno);
        console.log(first);
        return this.http.post<any>(environment.URL + '/finalsubmit', {quoteid:quoteid,first:first,last:last,dob:dob,idtype:idtype,idnumber:idnumber,mob:mob,email:email,occp:occp,
          emp:emp,sale:sale,prod:prod,make:make,yr:yr,cc:cc,use:use,vehicletype:vehicletype,soft:soft,ct:ct,finance:finance,claimfre:claimfre,losspayee:losspayee,
          losslocation:losslocation,vehiclevalue:vehiclevalue,alam:alam,coverinfo:coverinfo,manloadp:manload,manloadr:manloadr,
          manualdisc:manualdis,manualdiscr:manualdiscr,fleet:fleet,promotion:promotion,tax:tax,annualgp:annualgp,netpre:netpre,
          driverd: this.child.driverdata.filter(value => Object.keys(value).length !== 0),autod: this.ncdvalue,remarks:remarks,
          addresstype:addresstype,streetname:streetname,country:country,zip:zip,citytown:citytown,policystartDate:policystartDate,policyendDate:policyendDate,policyType:policyType,
          currency:currency,businessclass:businessclass,branch:branch,engineno:engineno,
        },httpOptions ).subscribe((res: any) => { // not callback

          console.log("in on save-Approve or Decline");
          this.openSnackBar("Request has been Submitted", "Dismiss");
          setTimeout(() => {
            this.router.navigateByUrl('/home');
            }, 5000);
      
      }, error => {
        console.error("Error", error);
      });
      }
  }
  openquoteDialog(quoteid, quotestatus) {
    const dialogRef1 = this.dialog.open(NewquotedialogComponent,{
      width: '450px',
      height: '250px',
      data:{
        quoteid: quoteid,
        quotestatus:quotestatus,
      },
    });
    dialogRef1.afterClosed().subscribe(() => {
      this.router.navigateByUrl('/home');
      // window.location.reload();
       })
  }
  openquoteDialogactive(quoteid, quotestatus) {
    const dialogRef1 = this.dialog.open(NewquotedialogComponent,{
      disableClose: true,
      width: '450px',
      height: '250px',
      data:{
        quoteid: quoteid,
        quotestatus:quotestatus,
      },
    });
    
    
    dialogRef1.afterClosed().subscribe(result => {
      console.log(result)
      if (result =="yes") {
        console.log(result);
        this.btnDisablednext = true;
        this.isaddfinal = true;
        this.moveToSelectedTab2("Additional Details");
      }
      else{
        this.router.navigateByUrl('/home');
      }
  });
  }
  onquoteletter(){
    console.log("in qlet");
    let first = this.contactForm1.get('firstName').value;
      let last = this.contactForm1.get('lastName').value;
      let prod = this.contactForm1.get('Product').value;
      let make = this.contactForm1.get('userInput').value;
      console.log(make);
      let financed =  this.contactForm2.get('financed').value;
      console.log(financed);
      if(financed){
        var losspayee = this.contactForm2.get('losspay').value;
      }
      else{
        losspayee = ''
      }
      let netpre = this.contactForm3.get('netprem').value;
      let deduct = this.contactForm3.get('deductibles').value;
      let cover = this.contactForm3.get('coverageinfo').value;
      console.log("drivertable values",this.child.driverdata);
      console.log(this.child.driverdata[0]['Driverwar']);
      let driverwar = this.child.driverdata[0]['Driverwar'];
      let promotion = this.contactForm3.get('promotion').value;
      let username = localStorage.getItem('name');
      let vehval = this.contactForm2.get('vehicleValue').value;
      let discp = this.discp;
      let anp = this.anp;
      var quotedata ={vehval:vehval,cover:cover,first:first,last:last,prod:prod,make:make,losspayee:losspayee,netpre:netpre,deduct:deduct,promotion:promotion,username:username,driverwar:driverwar,discp:discp,anp:anp};
    // this.quoteletterservice.quoteletter(quotedata);
    
    this.openquotelet(quotedata);
  }
  openquotelet(quotedata) {
    const dialogRef1 = this.dialog.open(QletterdialogComponent,{
      width: '1350px',
  
      height: '800px',
      
      data:{quotedata:quotedata,},
    });
    
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
  OnlossSelected(Selectedlosspay) {
    
    console.log('### Trigger');
    var losspay = Selectedlosspay['code'];
    console.log(Selectedlosspay);
    console.log(losspay);
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>(environment.URL + '/losspayadr', {losspay:losspay},httpOptions).subscribe(result => {
      console.log("-----------------------------------------");
      this.lossaddress = result;
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

