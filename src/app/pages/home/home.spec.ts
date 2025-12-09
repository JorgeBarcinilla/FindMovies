import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { ThemeService } from '../../core/services/theme.service';
import { MoviesStore } from '../../core/store/movies.store';
import { SearchStore } from '../../core/store/search.store';
import { HomeComponent } from './home';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockMoviesStore: Record<string, unknown>;
  let mockSearchStore: Record<string, unknown>;
  let mockThemeService: Record<string, unknown>;
  let mockRouter: Record<string, unknown>;

  beforeEach(async () => {
    mockMoviesStore = {
      isLoadingMoreMovies: signal(false),
      isLoadingMoreRecent: signal(false),
      isLoadingMoreSeries: signal(false),
      isLoadingRecent: signal(false),
      isLoadingTrending: signal(false),
      loadMoreMovies: jasmine.createSpy('loadMoreMovies'),
      loadMoreRecent: jasmine.createSpy('loadMoreRecent'),
      loadMoreSeries: jasmine.createSpy('loadMoreSeries'),
      recentReleases: signal([]),
      trendingMovies: signal([]),
      trendingTvSeries: signal([])
    };

    mockSearchStore = {
      clearSearch: jasmine.createSpy('clearSearch'),
      isLoading: signal(false),
      query: signal(''),
      results: signal([]),
      search: jasmine.createSpy('search')
    };

    mockThemeService = {
      isDarkMode: signal(false),
      toggleTheme: jasmine.createSpy('toggleTheme')
    };

    mockRouter = {
      navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve(true))
    };

    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        { provide: MoviesStore, useValue: mockMoviesStore },
        { provide: SearchStore, useValue: mockSearchStore },
        { provide: ThemeService, useValue: mockThemeService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadMoreMovies when engaged', () => {
    component['onLoadMoreMovies']();
    expect(mockMoviesStore['loadMoreMovies']).toHaveBeenCalled();
  });
});
