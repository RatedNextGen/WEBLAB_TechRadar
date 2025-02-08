import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechRadarComponent } from './techRadar.component';

describe('TechRadarComponent', () => {
  let component: TechRadarComponent;
  let fixture: ComponentFixture<TechRadarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechRadarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TechRadarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
