import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptartmentsComponent } from './deptartments.component';

describe('DeptartmentsComponent', () => {
  let component: DeptartmentsComponent;
  let fixture: ComponentFixture<DeptartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeptartmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeptartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
