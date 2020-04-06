import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReducedComponent } from './reduced.component';

describe('ReducedComponent', () => {
  let component: ReducedComponent;
  let fixture: ComponentFixture<ReducedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReducedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReducedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
