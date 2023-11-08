import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackButtonComponent } from './back-button.component';
import { MatIcon } from '@angular/material/icon';

describe('BackButtonComponent', () => {
  let component: BackButtonComponent;
  let fixture: ComponentFixture<BackButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BackButtonComponent,
        MatIcon
      ]
    });
    fixture = TestBed.createComponent(BackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call window.history.back() when clicking the button', () => {
    const historyBackSpy = spyOn(window.history, 'back');
    const backButton = fixture.debugElement.nativeElement.querySelector('button');
    backButton.click();

    expect(historyBackSpy).toHaveBeenCalled();
  }); 
});

