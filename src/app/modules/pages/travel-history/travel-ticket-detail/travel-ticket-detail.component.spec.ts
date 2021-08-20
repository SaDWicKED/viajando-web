import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelTicketDetailComponent } from './travel-ticket-detail.component';

describe('TravelTicketDetailComponent', () => {
  let component: TravelTicketDetailComponent;
  let fixture: ComponentFixture<TravelTicketDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelTicketDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelTicketDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
