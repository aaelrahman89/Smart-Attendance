import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTbleComponent } from './data-tble.component';

describe('DataTbleComponent', () => {
  let component: DataTbleComponent;
  let fixture: ComponentFixture<DataTbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataTbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataTbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
