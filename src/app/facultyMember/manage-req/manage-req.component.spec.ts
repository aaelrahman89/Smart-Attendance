import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageREQComponent } from './manage-req.component';

describe('ManageREQComponent', () => {
  let component: ManageREQComponent;
  let fixture: ComponentFixture<ManageREQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageREQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageREQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
