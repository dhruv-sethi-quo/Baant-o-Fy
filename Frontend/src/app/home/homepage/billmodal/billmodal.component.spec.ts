import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillmodalComponent } from './billmodal.component';

describe('BillmodalComponent', () => {
  let component: BillmodalComponent;
  let fixture: ComponentFixture<BillmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
