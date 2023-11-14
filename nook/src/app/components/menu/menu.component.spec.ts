import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { of } from 'rxjs';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['url']);
    activatedRouteSpy.url = of([]);

    TestBed.configureTestingModule({
      declarations: [MenuComponent],
      imports: [RouterTestingModule, MatIconModule],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    });
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu and update iconToShow when toggleMenu is called', () => {
    expect(component.menuOpen).toBe(false);
  
    component.toggleMenu();
    expect(component.menuOpen).toBe(true);
    expect(component.iconToShow).toBe('clear');
  
    component.toggleMenu();
    expect(component.menuOpen).toBe(false);
    expect(component.iconToShow).toBe('menu');
  });
  
  it('should toggle genreMenu and update iconToShow when toggleGenreMenu is called', () => {
    expect(component.genreMenuOpen).toBe(false);

    component.toggleMenu();
    component.openGenreMenu()
    expect(component.genreMenuOpen).toBe(true);
    expect(component.inCategoryMenu).toBe(true)
    expect(component.iconToShow).toBe('keyboard_arrow_left');
  
    component.closeGenreMenu();
    expect(component.genreMenuOpen).toBe(false);
    expect(component.iconToShow).toBe('clear');
  });  
  

  it('Should be true `isInfoPage` when path is library', () => {
    activatedRouteSpy.url = of([new UrlSegment('library', {})]);
    component.ngOnInit()
    expect(component.isInfoPage).toBe(true);
  });  
});
