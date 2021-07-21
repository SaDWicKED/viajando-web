import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqsPage } from './faqs.page';

describe('FaqsComponent', () => {
  let component: FaqsPage;
  let fixture: ComponentFixture<FaqsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqsPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
