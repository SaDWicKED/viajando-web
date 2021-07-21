import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciesPage } from './agencies.page';

describe('AgenciesComponent', () => {
  let component: AgenciesPage;
  let fixture: ComponentFixture<AgenciesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgenciesPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgenciesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
