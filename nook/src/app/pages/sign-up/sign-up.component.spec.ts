import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { AuthFormComponent } from 'src/app/components/auth-form/auth-form.component';
import { authService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let auth: authService;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('authService', ['login']);

    const authFormSpy = jasmine.createSpyObj<AuthFormComponent>('HeaderComponent', {
      action: "'signUp'"
    } as any);

    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['url']),
    activatedRouteSpy.url = of([]);

    const snackBarMock = {
      open: jasmine.createSpy('open')
    };

    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [AuthFormComponent],
      providers: [{ provide: AuthFormComponent, useValue: authFormSpy },
      { provide: authService, useValue: authServiceSpy },
      { provide: MatSnackBar, useValue: snackBarMock },
      { provide: ActivatedRoute, useValue: activatedRouteSpy }]
    });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
