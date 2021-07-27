import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackInfoComponent } from './snack-info.component';

describe('SnackInfoComponent', () => {
  let component: SnackInfoComponent;
  let fixture: ComponentFixture<SnackInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
