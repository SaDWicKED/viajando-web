import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityPanelComponent } from './availability-panel.component';

describe('AvailabilityCardComponent', () => {
  let component: AvailabilityPanelComponent;
  let fixture: ComponentFixture<AvailabilityPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailabilityPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabilityPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
