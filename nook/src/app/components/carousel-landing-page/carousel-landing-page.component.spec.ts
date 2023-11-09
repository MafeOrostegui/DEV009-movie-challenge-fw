import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselLandingPageComponent } from './carousel-landing-page.component';
import { CarouselComponent, CarouselModule } from 'ngx-owl-carousel-o';

describe('CarouselLandingPageComponent', () => {
  let component: CarouselLandingPageComponent;
  let fixture: ComponentFixture<CarouselLandingPageComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          CarouselLandingPageComponent, CarouselComponent
        ],
        imports: [
          CarouselModule, BrowserAnimationsModule
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have dynamicSlides defined', () => {
    expect(component.dynamicSlides).toBeDefined();
  });

  it('should have customOptions defined', () => {
    expect(component.customOptions).toBeDefined();
  });

  it('should have customOptions with specific properties', () => {
    expect(component.customOptions.loop).toBe(true);
    expect(component.customOptions.autoplay).toBe(true);
    expect(component.customOptions.autoHeight).toBe(false);
    expect(component.customOptions.autoWidth).toBe(false);
    expect(component.customOptions.center).toBe(true);
    expect(component.customOptions.responsive).toBeDefined();
  });

  it('should render the images', () => {
    const imageElements: HTMLElement = fixture.nativeElement; 
    const images = imageElements.querySelectorAll('img');
    const imageUrls = Array.from(images).map(imgElement => imgElement.getAttribute('src'))

    const expectedImageUrls = component.dynamicSlides.map(slide => slide.img);

    expectedImageUrls.forEach(expectedUrl => {
      expect(imageUrls).toContain(expectedUrl)
    })
  });
});

