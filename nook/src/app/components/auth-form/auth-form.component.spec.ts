import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthFormComponent } from './auth-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { authService } from 'src/app/services/auth/auth.service';
import { CommonModule } from '@angular/common';

const credentials = {
  email: 'test@example.com',
  password: 'myRealPassword',
  confirmPassword: 'myRealPassword',
  firstName: 'User',
  lastName: 'lastName User',
};

const snackBarMock = {
  open: jasmine.createSpy('open')
};

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;
  let auth: authService;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('authService', ['login', 'register']);

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        AuthFormComponent,
        MatIconModule,
        RouterTestingModule,
        ReactiveFormsModule,
        CommonModule
      ],
      providers: [
        { provide: authService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: snackBarMock }
      ]
    });

    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    auth = TestBed.inject(authService);
    fixture.detectChanges();
  });

  it('should create form', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.get('email')).toBeTruthy();
    expect(component.form.get('password')).toBeTruthy();
  });

  it('should update isMobile when window is resized', () => {
    expect(component.isMobile).toBe(false);

    const event = new Event('resize');
    Object.defineProperty(event, 'target', { value: window });
    window.dispatchEvent(event);

    fixture.detectChanges();

    expect(component.isMobile).toBe(window.innerWidth < 611);
  });

  it('should detect error for a specific form field', () => {
    const emailField = component.form.get('email')
    emailField?.markAsTouched()

    emailField?.setErrors({ require: true })
    expect(component.hasError('email')).toBeTrue();
  })

  it('should not detect error for a specific form field', () => {
    const emailField = component.form.get('email')
    emailField?.markAsTouched()

    emailField?.setErrors(null)
    expect(component.hasError('email')).toBeFalse();
  })

  it('Visibility toggle password should change hide boolean value from true to false or false to true', () => {
    component.togglePasswordVisibility()
    expect(component.hide).toBe(false);
    component.togglePasswordVisibility()
    expect(component.hide).toBe(true);
  })

  it('If the form action is \'Sign In,\' the title and corresponding button should be displayed. The function Login should be called', () => {
    component.action = 'signIn';
    component.ngOnInit();

    expect(component.title).toEqual('Login')
    expect(component.titleButton).toEqual('Sign In')

    component.form.setValue(credentials)
    component.onSubmit()

    expect(auth.login).toHaveBeenCalledWith(credentials.email, credentials.password)
  })

  it('If the form action is \'Sign Up,\' the title and corresponding button should be displayed. The function Register should be called', () => {
    component.action = 'signUp';
    component.ngOnInit();

    expect(component.title).toEqual('Create Account')
    expect(component.titleButton).toEqual('Sign Up')

    component.form.setValue(credentials)
    component.onSubmit()

    expect(auth.register).toHaveBeenCalledWith(credentials.email, credentials.password, credentials.firstName)
  })

  it('should call showErrorMessage with the correct message', () => {
    const errorMessage = 'Test error message';
    const expectedDuration = 5000;

    component['showErrorMessage'](errorMessage);

    expect(snackBarMock.open).toHaveBeenCalledWith(errorMessage, 'Close', { duration: expectedDuration });
  });
});
