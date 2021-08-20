import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelTicketListComponent } from './travel-ticket-list.component';

describe('TravelTicketListComponent', () => {
  let component: TravelTicketListComponent;
  let fixture: ComponentFixture<TravelTicketListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelTicketListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelTicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
