import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import { authService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('LoginFormComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let auth: authService;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('authService', ['login']);

    const authFormSpy = jasmine.createSpyObj<AuthFormComponent>('HeaderComponent', {
      action: "'signIn'"
    } as any);

    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['url']),
    activatedRouteSpy.url = of([]);

    const snackBarMock = {
      open: jasmine.createSpy('open')
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [AuthFormComponent],
      providers: [{ provide: AuthFormComponent, useValue: authFormSpy },
      { provide: authService, useValue: authServiceSpy },
      { provide: MatSnackBar, useValue: snackBarMock },
      { provide: ActivatedRoute, useValue: activatedRouteSpy }]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
