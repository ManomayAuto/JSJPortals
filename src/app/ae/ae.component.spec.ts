import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AEComponent } from './ae.component';

describe('AEComponent', () => {
  let component: AEComponent;
  let fixture: ComponentFixture<AEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
