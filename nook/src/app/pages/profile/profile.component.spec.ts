import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProfileComponent } from './profile.component';
import { RouterTestingModule } from '@angular/router/testing';
import { authService } from 'src/app/services/auth/auth.service';
import { Auth } from '@angular/fire/auth';
import { User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { of } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { SignOutButtonComponent } from 'src/app/components/sign-out-button/sign-out-button.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authSpy: jasmine.SpyObj<Auth>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    const headerSpy = jasmine.createSpyObj<HeaderComponent>('HeaderComponent', {
      user: "true"
    } as any);

    const buttonSignOutSpy = jasmine.createSpyObj<SignOutButtonComponent>('SignOutButtonComponent', {
      styleProfile: "true"
    } as any);

    const authSpyObj = jasmine.createSpyObj('Auth', ['onAuthStateChanged']);
    const authServiceSpy = jasmine.createSpyObj('authService', ['login']);
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['url']),
      activatedRouteSpy.url = of([]);

    TestBed.configureTestingModule({
      declarations: [ProfileComponent, HeaderComponent, NavBarComponent, MenuComponent, SignOutButtonComponent],
      imports: [MatIconModule, RouterTestingModule],
      providers: [{ provide: HeaderComponent, useValue: headerSpy },
      { provide: NavBarComponent, useValue: {} },
      { provide: authService, useValue: authServiceSpy },
      { provide: Auth, useValue: authSpyObj },
      { provide: ActivatedRoute, useValue: activatedRouteSpy },
      { provide: MenuComponent, useValue: {} },
      { provide: SignOutButtonComponent, useValue: buttonSignOutSpy }]
    });
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    authSpy = TestBed.inject(Auth) as jasmine.SpyObj<Auth>;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set user to null if not logged in or email not verified', fakeAsync(() => {
    authSpy.onAuthStateChanged.and.callFake((callback: (user: User | null) => void) => {
      callback(null);
      return () => { };
    });

    fixture.detectChanges();
    tick();

    expect(component.user).toBeNull();
  }));

  it('should set user if logged in and email verified', fakeAsync(() => {
    const user = { emailVerified: true } as User;
    authSpy.onAuthStateChanged.and.callFake((callback: (user: User | null) => void) => {
      callback(user);
      return () => { };
    });

    component.ngOnInit();
    tick();

    expect(component.user).toEqual(user);
  }));
});
