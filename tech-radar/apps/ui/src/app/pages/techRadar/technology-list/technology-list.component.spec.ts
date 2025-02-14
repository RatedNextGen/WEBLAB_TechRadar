import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TechnologyListComponent } from './technology-list.component';

describe('TechnologyListComponent', () => {
  let component: TechnologyListComponent;
  let fixture: ComponentFixture<TechnologyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TechnologyListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TechnologyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
