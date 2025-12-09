import { Location } from '@angular/common';
import { signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { DetailsStore } from '../../core/store/details.store';
import { DetailsComponent } from './details';

const mockLocation = {
  back: () => {
    return Promise.resolve();
  }
};

const mockDetailsStore = {
  error: signal(null),
  isLoading: signal(false),
  loadMovieDetails: () => {
    return Promise.resolve();
  },
  loadTvDetails: () => {
    return Promise.resolve();
  },
  movieDetails: signal(null),
  tvDetails: signal(null)
};

const meta: Meta<DetailsComponent> = {
  component: DetailsComponent,
  decorators: [
    moduleMetadata({
      providers: [
        { provide: DetailsStore, useValue: mockDetailsStore },
        { provide: Location, useValue: mockLocation }
      ]
    })
  ],
  tags: ['autodocs'],
  title: 'Pages/Details'
};

export default meta;
type Story = StoryObj<DetailsComponent>;

export const MovieDetails: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'type' ? 'movie' : '1')
              }
            }
          }
        },
        {
          provide: DetailsStore,
          useValue: {
            ...mockDetailsStore,
            movieDetails: signal({
              backdrop_path: '/s3TBrRGB1jav7wJGNsODDb25sME.jpg',
              created_by: [],
              genres: [
                { id: 1, name: 'Action' },
                { id: 2, name: 'Sci-Fi' }
              ],
              id: 1,
              media_type: 'movie',
              overview: 'A thief who steals corporate secrets...',
              poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
              release_date: '2010-07-15',
              runtime: 148,
              tagline: 'Your mind is the scene of the crime',
              title: 'Inception',
              vote_average: 8.8
            })
          }
        }
      ]
    })
  ]
};

export const TvDetails: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'type' ? 'tv' : '123')
              }
            }
          }
        },
        {
          provide: DetailsStore,
          useValue: {
            ...mockDetailsStore,
            tvDetails: signal({
              backdrop_path: '/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg',
              created_by: [{ id: 1, name: 'Vince Gilligan', profile_path: null }],
              first_air_date: '2008-01-20',
              genres: [
                { id: 1, name: 'Drama' },
                { id: 2, name: 'Crime' }
              ],
              id: 123,
              media_type: 'tv',
              name: 'Breaking Bad',
              number_of_seasons: 5,
              overview:
                'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine...',
              poster_path: '/ggFHVNu6YYI5L9pCfOacjizRGt.jpg',
              tagline: 'Change the equation',
              vote_average: 9.5
            })
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
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'type' ? 'movie' : '1')
              }
            }
          }
        },
        {
          provide: DetailsStore,
          useValue: {
            ...mockDetailsStore,
            isLoading: signal(true)
          }
        }
      ]
    })
  ]
};
