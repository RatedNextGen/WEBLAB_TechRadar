import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadarViewerComponent } from './radar-viewer.component';

describe('RadarComponent', () => {
  let component: RadarViewerComponent;
  let fixture: ComponentFixture<RadarViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadarViewerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadarViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
