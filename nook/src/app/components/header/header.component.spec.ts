import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['url']);
    activatedRouteSpy.url = of([]);

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    });
    fixture = TestBed.createComponent(HeaderComponent);
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

  it('should subscribe to route changes and update flags accordingly', () => {
    activatedRouteSpy.url = of([new UrlSegment('profile', {})]);

    component['subscribeToRouteChanges']();

    expect(component.isProfile).toBe(true);
    expect(component.isMovies).toBe(false);
    expect(component.isTvShows).toBe(false);
    expect(component.isLibrary).toBe(false);
  });

  it('should update flags based on route changes', () => {
    activatedRouteSpy.url = of([new UrlSegment('tvShows', {})]);

    component['subscribeToRouteChanges']();

    expect(component.isProfile).toBe(false);
    expect(component.isMovies).toBe(false);
    expect(component.isTvShows).toBe(true);
    expect(component.isLibrary).toBe(false);
  });
});
