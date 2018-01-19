import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletCompositionComponent } from './wallet-composition.component';

describe('WalletCompositionComponent', () => {
  let component: WalletCompositionComponent;
  let fixture: ComponentFixture<WalletCompositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WalletCompositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletCompositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
