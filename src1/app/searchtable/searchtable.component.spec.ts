import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchtableComponent } from './searchtable.component';

describe('SearchtableComponent', () => {
  let component: SearchtableComponent;
  let fixture: ComponentFixture<SearchtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
