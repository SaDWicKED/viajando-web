import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityResultPage } from './availability-result.page';

describe('AvailabilityResultComponent', () => {
  let component: AvailabilityResultPage;
  let fixture: ComponentFixture<AvailabilityResultPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailabilityResultPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
