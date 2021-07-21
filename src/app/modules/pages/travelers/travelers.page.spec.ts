import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelersPage } from './travelers.page';

describe('TravelersComponent', () => {
  let component: TravelersPage;
  let fixture: ComponentFixture<TravelersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelersPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
