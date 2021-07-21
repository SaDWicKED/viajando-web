import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateAccountPage } from './activate-account.page';

describe('ActivateAccountComponent', () => {
  let component: ActivateAccountPage;
  let fixture: ComponentFixture<ActivateAccountPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateAccountPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivateAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
