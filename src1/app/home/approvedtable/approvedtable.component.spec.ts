import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedtableComponent } from './approvedtable.component';

describe('ApprovedtableComponent', () => {
  let component: ApprovedtableComponent;
  let fixture: ComponentFixture<ApprovedtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
