import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchclientdialogComponent } from './searchclientdialog.component';

describe('SearchclientdialogComponent', () => {
  let component: SearchclientdialogComponent;
  let fixture: ComponentFixture<SearchclientdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchclientdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchclientdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
