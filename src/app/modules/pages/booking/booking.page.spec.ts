import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPage } from './booking.page';

describe('BookingComponent', () => {
  let component: BookingPage;
  let fixture: ComponentFixture<BookingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
