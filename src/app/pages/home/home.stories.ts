import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ThemeService } from '../../core/services/theme.service';
import { MoviesStore } from '../../core/store/movies.store';
import { SearchStore } from '../../core/store/search.store';
import { HomeComponent } from './home';

const mockRouter = {
  navigate: () => Promise.resolve(true)
};

const mockMoviesStore = {
  isLoadingMoreMovies: signal(false),
  isLoadingMoreRecent: signal(false),
  isLoadingMoreSeries: signal(false),
  isLoadingRecent: signal(false),
  isLoadingTrending: signal(false),
  loadMoreMovies: () => {
    return Promise.resolve();
  },
  loadMoreRecent: () => {
    return Promise.resolve();
  },
  loadMoreSeries: () => {
    return Promise.resolve();
  },
  recentReleases: signal([]),
  trendingMovies: signal([]),
  trendingTvSeries: signal([])
};

const mockSearchStore = {
  clearSearch: () => {
    return Promise.resolve();
  },
  isLoading: signal(false),
  query: signal(''),
  results: signal([]),
  search: (query: string) => {
    console.info(query);
    return Promise.resolve();
  }
};

const mockThemeService = {
  isDarkMode: signal(false),
  toggleTheme: () => {
    return Promise.resolve();
  }
};

const meta: Meta<HomeComponent> = {
  component: HomeComponent,
  decorators: [
    moduleMetadata({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: MoviesStore, useValue: mockMoviesStore },
        { provide: SearchStore, useValue: mockSearchStore },
        { provide: ThemeService, useValue: mockThemeService }
      ]
    })
  ],
  tags: ['autodocs'],
  title: 'Pages/Home'
};

export default meta;
type Story = StoryObj<HomeComponent>;

export const Default: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: MoviesStore,
          useValue: {
            ...mockMoviesStore,
            recentReleases: signal([
              {
                id: 4,
                media_type: 'movie',
                poster_path: '/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
                release_date: '2024',
                title: 'Dune: Part Two',
                vote_average: 8.4
              }
            ]),
            trendingMovies: signal([
              {
                id: 1,
                media_type: 'movie',
                poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
                release_date: '2010',
                title: 'Inception',
                vote_average: 8.8
              },
              {
                id: 2,
                media_type: 'movie',
                poster_path: '/gEU2QniL6E8ahYeBuyTFBJWcxkt.jpg',
                release_date: '2014',
                title: 'Interstellar',
                vote_average: 8.6
              }
            ]),
            trendingTvSeries: signal([
              {
                first_air_date: '2008',
                id: 3,
                media_type: 'tv',
                name: 'Breaking Bad',
                poster_path: '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
                vote_average: 9.5
              }
            ])
          }
        }
      ]
    })
  ]
};

export const Loading: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: MoviesStore,
          useValue: {
            ...mockMoviesStore,
            isLoadingRecent: signal(true),
            isLoadingTrending: signal(true)
          }
        }
      ]
    })
  ]
};
