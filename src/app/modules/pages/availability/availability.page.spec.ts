import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityPage } from './availability.page';

describe('AvailabilityComponent', () => {
  let component: AvailabilityPage;
  let fixture: ComponentFixture<AvailabilityPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailabilityPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
