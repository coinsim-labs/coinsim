import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceSparklinesComponent } from './price-sparklines.component';

describe('PriceSparklinesComponent', () => {
  let component: PriceSparklinesComponent;
  let fixture: ComponentFixture<PriceSparklinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceSparklinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceSparklinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
