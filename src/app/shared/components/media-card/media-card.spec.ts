import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { MediaCardComponent } from './media-card';

describe('MediaCardComponent', () => {
  let component: MediaCardComponent;
  let fixture: ComponentFixture<MediaCardComponent>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']) as jasmine.SpyObj<Router>;
    routerSpy.navigate.and.returnValue(Promise.resolve(true));

    await TestBed.configureTestingModule({
      imports: [MediaCardComponent],
      providers: [{ provide: Router, useValue: routerSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaCardComponent);
    component = fixture.componentInstance;

    // Set required inputs
    fixture.componentRef.setInput('media', {
      id: 1,
      media_type: 'movie',
      poster_path: '/test.jpg',
      release_date: '2023-01-01',
      title: 'Test Movie',
      vote_average: 8.5
    });
    fixture.componentRef.setInput('priority', false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate on click', () => {
    component['onClick']();
    expect(routerSpy['navigate']).toHaveBeenCalledWith(['/details', 'movie', 1]);
  });
});
