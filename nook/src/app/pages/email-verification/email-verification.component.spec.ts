import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { EmailVerificationComponent } from './email-verification.component';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('EmailVerificationComponent', () => {
  let component: EmailVerificationComponent;
  let fixture: ComponentFixture<EmailVerificationComponent>;
  let activatedRouteSpy: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['url']);
    activatedRouteSpy.url = of([]);

    TestBed.configureTestingModule({
      declarations: [EmailVerificationComponent, HeaderComponent],
      imports: [ RouterTestingModule ],
      providers: [{ provide: HeaderComponent, useValue: {} },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }],
    });
    fixture = TestBed.createComponent(EmailVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
