import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InbrokerquotetableComponent } from './inbrokerquotetable.component';

describe('InbrokerquotetableComponent', () => {
  let component: InbrokerquotetableComponent;
  let fixture: ComponentFixture<InbrokerquotetableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InbrokerquotetableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InbrokerquotetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
