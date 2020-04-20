import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewquotedialogComponent } from './newquotedialog.component';

describe('NewquotedialogComponent', () => {
  let component: NewquotedialogComponent;
  let fixture: ComponentFixture<NewquotedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewquotedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewquotedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
