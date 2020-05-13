import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QletterdialogComponent } from './qletterdialog.component';

describe('QletterdialogComponent', () => {
  let component: QletterdialogComponent;
  let fixture: ComponentFixture<QletterdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QletterdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QletterdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
