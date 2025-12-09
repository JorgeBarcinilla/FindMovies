import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMessageComponent } from './error-message';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('error', { code: 'TEST', message: 'Test Error' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display error message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Error');
  });

  it('should emit retry event when button clicked', () => {
    let retryEmitted = false;
    component.retry.subscribe(() => (retryEmitted = true));

    // Trigger retry logic manually or via DOM if button exists
    component['onRetry']();

    expect(retryEmitted).toBeTrue();
  });
});
