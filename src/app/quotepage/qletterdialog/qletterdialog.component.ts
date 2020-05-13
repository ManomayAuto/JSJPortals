import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'app-qletterdialog',
  templateUrl: './qletterdialog.component.html',
  styleUrls: ['./qletterdialog.component.css']
})
export class QletterdialogComponent implements OnInit {
  
  public breakpoint: number;
  first: string;
  last: string;
  prod: string;
  constructor( @Inject(MAT_DIALOG_DATA) public data,public dialogRef :MatDialogRef<QletterdialogComponent>,) { }

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 790 ? 1 : 2; //
    console.log("quotedialoggg");
  console.log(this.data);
  console.log(this.data['quotedata']['first']);
  this.first = this.data['quotedata']['first'];
  this.last = this.data['quotedata']['last'];
  this.prod = this.data['quotedata']['prod'];
  }
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 590 ? 1 : 2
  }
  @ViewChild('content',{static:false}) content: ElementRef;
public export(){
let doc = new jsPDF();
let specialElementHandlers = {
  '#editor': function(element, renderer){
    return true;
  }
};
let content = this.content.nativeElement;
doc.fromHTML(content.innerHTML,15,15,{
  'width': 190,
  'elementHandlers': specialElementHandlers
});
doc.save('Quote_letter.pdf');
}
}
