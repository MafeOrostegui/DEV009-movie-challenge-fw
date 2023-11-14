import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, NavigationEnd } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';

class MockRouter {
  events = of(new NavigationEnd(1, '/home', '/home'));
}

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],
      imports: [RouterTestingModule.withRoutes([]), MatIconModule],
      providers: [
        { provide: Router, useClass: MockRouter },
      ],
    });
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update isMobile when window is resized', fakeAsync(() => {

    const event = new Event('resize');
    Object.defineProperty(event, 'target', { value: window });
    window.dispatchEvent(event);

    tick();

    fixture.detectChanges();

    expect(component.isMobile).toBe(window.innerWidth < 611);
  }));

  it('should set activeRoute on navigation end', fakeAsync(() => {
    tick();
    fixture.detectChanges();

    expect(component.activeRoute).toBe('/home');
  }));
});
