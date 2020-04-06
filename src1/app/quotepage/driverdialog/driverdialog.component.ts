import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-driverdialog',
  templateUrl: './driverdialog.component.html',
  styleUrls: ['./driverdialog.component.css']
})
export class DriverdialogComponent implements OnInit {
  driverForm : FormGroup;
  public breakpoint: number;
  wasFormChanged = false;
  constructor(private fb: FormBuilder) {

    this.driverForm = fb.group({
      DriverName: '',
      Driverwar: '',
      DOB: '',
      LicenseIssueDate: '',
      LicenseNumber: '',
    });
   }

  ngOnInit() {
    this.breakpoint = window.innerWidth <= 790 ? 1 : 2; //
  }
  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 590 ? 1 : 2
  }
}
