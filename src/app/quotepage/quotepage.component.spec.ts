import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotepageComponent } from './quotepage.component';

describe('QuotepageComponent', () => {
  let component: QuotepageComponent;
  let fixture: ComponentFixture<QuotepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
