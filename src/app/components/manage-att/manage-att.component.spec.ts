import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAttComponent } from './manage-att.component';

describe('ManageAttComponent', () => {
  let component: ManageAttComponent;
  let fixture: ComponentFixture<ManageAttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
