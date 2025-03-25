import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandaJuvenilComponent } from './banda-juvenil.component';

describe('BandaJuvenilComponent', () => {
  let component: BandaJuvenilComponent;
  let fixture: ComponentFixture<BandaJuvenilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BandaJuvenilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BandaJuvenilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
