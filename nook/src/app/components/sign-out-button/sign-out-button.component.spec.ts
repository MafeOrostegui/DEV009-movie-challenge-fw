import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SignOutButtonComponent } from './sign-out-button.component';
import { authService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

describe('SignOutButtonComponent', () => {
  let component: SignOutButtonComponent;
  let fixture: ComponentFixture<SignOutButtonComponent>;
  let authServiceSpy: jasmine.SpyObj<authService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('authService', ['logOut']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [SignOutButtonComponent],
      providers: [
        { provide: authService, useValue: authSpy },
        { provide: Router, useValue: routerSpyObj },
      ],
    });

    fixture = TestBed.createComponent(SignOutButtonComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(authService) as jasmine.SpyObj<authService>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should log out and navigate to landing page on button click', fakeAsync(() => {
    authServiceSpy.logOut.and.returnValue(Promise.resolve());
  
    component.onClick();
    tick();
  
    expect(authServiceSpy.logOut).toHaveBeenCalled();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/landing-page']);
  }));

  it('should set styleProfile to true if input is true', () => {
    component.styleProfile = true;
    expect(component.styleProfile).toBe(true);
  });
});
