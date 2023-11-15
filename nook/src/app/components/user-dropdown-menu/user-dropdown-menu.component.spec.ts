import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserDropdownMenuComponent } from './user-dropdown-menu.component';
import { MatIconModule } from '@angular/material/icon';
import { SignOutButtonComponent } from '../sign-out-button/sign-out-button.component';
import { Router } from '@angular/router';
import { authService } from 'src/app/services/auth/auth.service';

describe('UserDropdownMenuComponent', () => {
  let component: UserDropdownMenuComponent;
  let fixture: ComponentFixture<UserDropdownMenuComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const authSpy = jasmine.createSpyObj('authService', ['logOut']);
    const SignOutButtonComponentSpy = jasmine.createSpyObj<SignOutButtonComponent>('SignOutButtonComponent', {
      styleProfile:"false"
    })

    TestBed.configureTestingModule({
      declarations: [UserDropdownMenuComponent, SignOutButtonComponent],
      imports: [MatIconModule],
      providers: [{provide: Router, useValue:routerSpyObj},
      {provide: SignOutButtonComponent, useValue: SignOutButtonComponentSpy},
      { provide: authService, useValue: authSpy }]
    });
    fixture = TestBed.createComponent(UserDropdownMenuComponent);
    component = fixture.componentInstance;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu on desktop', () => {
    component.isMobile = false;

    component.toggleMenu();

    expect(component.menuOpen).toBe(true);
  });

  it('should navigate to profile on mobile', () => {
    component.isMobile = true;

    component.toggleMenu();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/profile']);
  });

  it('should update isMobile when window is resized', fakeAsync(() => {

    const event = new Event('resize');
    Object.defineProperty(event, 'target', { value: window });
    window.dispatchEvent(event);
  
    tick(); 
  
    fixture.detectChanges();
  
    expect(component.isMobile).toBe(window.innerWidth < 611);
  }));
});
