import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: jest.fn()
    };
    routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create login form with email and password controls', () => {
    expect(component.loginForm.contains('email')).toBe(true);
    expect(component.loginForm.contains('password')).toBe(true);
  });

  it('should mark email as invalid if empty', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBe(false);
  });

  it('should call AuthService.login and navigate on valid login', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: '12345' });
    authServiceMock.login.mockReturnValue(of({}));

    component.login();

    expect(authServiceMock.login).toHaveBeenCalledWith('test@example.com', '12345');
    expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
  });

  it('should alert on login error', () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    component.loginForm.setValue({ email: 'test@example.com', password: '12345' });
    authServiceMock.login.mockReturnValue(throwError(() => new Error('Invalid credentials')));

    component.login();

    expect(alertSpy).toHaveBeenCalledWith('Invalid credentials');
  });
});
