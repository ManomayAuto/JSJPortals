import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuplicatedialogComponent } from './duplicatedialog.component';

describe('DuplicatedialogComponent', () => {
  let component: DuplicatedialogComponent;
  let fixture: ComponentFixture<DuplicatedialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuplicatedialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuplicatedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
