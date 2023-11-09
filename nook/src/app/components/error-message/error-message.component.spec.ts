import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from './error-message.component';
import { FormControl, ValidatorFn , Validators, ReactiveFormsModule } from '@angular/forms';

const mockControl = new FormControl('', [Validators.required as ValidatorFn]);

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ ErrorMessageComponent, ReactiveFormsModule ]
    });
    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    component.control = mockControl;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message when control is touched and has an error',()=>{
    mockControl.markAsTouched();

    fixture.detectChanges();

    const errorMessageElement = fixture.nativeElement.querySelector('div');
    const expectedErrorMessage = 'This field is required'; 
    expect(errorMessageElement.textContent.trim()).toContain(expectedErrorMessage);
  });

  it('should not display error message when control is not touched', () => {
    mockControl.markAsUntouched()

    fixture.detectChanges();

    const errorMessageElement = fixture.nativeElement.querySelector('div');
    expect(errorMessageElement.textContent.trim()).toBe('');
  });
});
