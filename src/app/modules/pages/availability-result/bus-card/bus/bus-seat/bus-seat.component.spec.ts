import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusSeatComponent } from './bus-seat.component';

describe('BusSeatComponent', () => {
  let component: BusSeatComponent;
  let fixture: ComponentFixture<BusSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusSeatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
