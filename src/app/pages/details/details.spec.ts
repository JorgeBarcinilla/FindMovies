import { Location } from '@angular/common';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { DetailsStore } from '../../core/store/details.store';
import { DetailsComponent } from './details';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let mockDetailsStore: Record<string, unknown>;
  let mockLocation: Record<string, unknown>;
  let mockActivatedRoute: Record<string, unknown>;

  beforeEach(async () => {
    mockDetailsStore = {
      error: signal(null),
      isLoading: signal(false),
      loadMovieDetails: jasmine.createSpy('loadMovieDetails'),
      loadTvDetails: jasmine.createSpy('loadTvDetails'),
      movieDetails: signal(null),
      tvDetails: signal(null)
    };

    mockLocation = {
      back: jasmine.createSpy('back')
    };

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: (key: string) => (key === 'type' ? 'movie' : '1')
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [DetailsComponent],
      providers: [
        { provide: DetailsStore, useValue: mockDetailsStore },
        { provide: Location, useValue: mockLocation },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movie details on init', () => {
    expect(mockDetailsStore['loadMovieDetails']).toHaveBeenCalledWith(1);
  });

  it('should go back when back button clicked', () => {
    component['goBack']();
    expect(mockLocation['back']).toHaveBeenCalled();
  });
});
