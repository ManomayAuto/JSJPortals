import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QreportsComponent } from './qreports.component';

describe('QreportsComponent', () => {
  let component: QreportsComponent;
  let fixture: ComponentFixture<QreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
