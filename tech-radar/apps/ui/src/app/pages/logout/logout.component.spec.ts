import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutComponent } from './logout.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('LogoutComponent', () => {
  let fixture: ComponentFixture<LogoutComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      logout: jest.fn()
    };
    routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [LogoutComponent, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutComponent);
    let component: LogoutComponent = fixture.componentInstance;
  });

  it('should call logout and navigate to /login on success', () => {
    authServiceMock.logout.mockReturnValue(of({}));
    fixture.detectChanges();

    expect(authServiceMock.logout).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should alert on logout error', () => {
    authServiceMock.logout.mockReturnValue(throwError(() => new Error('Logout failed')));
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    fixture.detectChanges();

    expect(authServiceMock.logout).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith('Error logging out');
  });
});
