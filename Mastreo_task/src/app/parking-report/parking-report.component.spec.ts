import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingReportComponent } from './parking-report.component';

describe('ParkingReportComponent', () => {
  let component: ParkingReportComponent;
  let fixture: ComponentFixture<ParkingReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParkingReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
