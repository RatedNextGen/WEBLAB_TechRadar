import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { UserRole } from '../../../../../../shared/src/lib/models/user.model';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('should display "Add Technology" when userRole is CTO', () => {
    component.userRole = UserRole.CTO;
    fixture.detectChanges();

    const addTechEl = fixture.debugElement.query(By.css('[data-test-id="create-new-technology"]'));
    expect(addTechEl).toBeTruthy();
  });

  it('should display "Add Technology" when userRole is TECH_LEAD', () => {
    component.userRole = UserRole.TECH_LEAD;
    fixture.detectChanges();

    const addTechEl = fixture.debugElement.query(By.css('[data-test-id="create-new-technology"]'));
    expect(addTechEl).toBeTruthy();
  });

  it('should not display "Add Technology" when userRole is EMPLOYEE', () => {
    component.userRole = UserRole.EMPLOYEE;
    fixture.detectChanges();

    const addTechEl = fixture.debugElement.query(By.css('[data-test-id="create-new-technology"]'));
    expect(addTechEl).toBeNull();
  });

  it('should emit createNewTechnologyClicked event when "Add Technology" is clicked', () => {
    component.userRole = UserRole.CTO;
    fixture.detectChanges();

    const emitSpy = jest.spyOn(component.createNewTechnologyClicked, 'emit');
    const addTechEl = fixture.debugElement.query(By.css('[data-test-id="create-new-technology"]'));
    expect(addTechEl).toBeTruthy();
    addTechEl.triggerEventHandler('click', null);
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should display greeting with user role', () => {
    component.userRole = UserRole.CTO;
    fixture.detectChanges();
    const greetingEl: HTMLElement = fixture.nativeElement.querySelector('.greeting');
    expect(greetingEl).toBeTruthy();
    expect(greetingEl.textContent).toContain('Hallo CTO!');
  });

  it('should render Logout link with correct routerLink', () => {
    fixture.detectChanges();
    const logoutLink = fixture.debugElement.query(By.css('.logout a'));
    expect(logoutLink).toBeTruthy();
    const routerLinkAttr = logoutLink.attributes['ng-reflect-router-link'];
    expect(routerLinkAttr).toEqual('logout');
  });
});
