import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrivertableComponent } from './drivertable.component';

describe('DrivertableComponent', () => {
  let component: DrivertableComponent;
  let fixture: ComponentFixture<DrivertableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrivertableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrivertableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
