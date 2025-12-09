import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonLoaderComponent } from './skeleton-loader';

describe('SkeletonLoaderComponent', () => {
  let component: SkeletonLoaderComponent;
  let fixture: ComponentFixture<SkeletonLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonLoaderComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SkeletonLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept inputs', () => {
    fixture.componentRef.setInput('width', '50px');
    fixture.componentRef.setInput('height', '50px');
    fixture.componentRef.setInput('shape', 'circle');
    fixture.detectChanges();

    expect(component.width()).toBe('50px');
    expect(component.height()).toBe('50px');
    expect(component.shape()).toBe('circle');
  });
});
