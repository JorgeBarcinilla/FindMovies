import { signal } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { SearchStore } from '../../../core/store/search.store';
import { SearchBarComponent } from './search-bar';

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

const meta: Meta<SearchBarComponent> = {
  component: SearchBarComponent,
  decorators: [
    moduleMetadata({
      providers: [{ provide: SearchStore, useValue: mockSearchStore }]
    })
  ],
  tags: ['autodocs'],
  title: 'Shared/SearchBar'
};

export default meta;
type Story = StoryObj<SearchBarComponent>;

export const Default: Story = {
  render: () => ({
    props: {},
    template: `<div style="padding: 20px; background: #1a1a1a;"><app-search-bar></app-search-bar></div>`
  })
};

export const WithResults: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: SearchStore,
          useValue: {
            ...mockSearchStore,
            query: signal('test'),
            results: signal([
              {
                id: 1,
                media_type: 'movie',
                poster_path: null,
                release_date: '2023',
                title: 'Movie 1',
                vote_average: 8
              },
              { first_air_date: '2023', id: 2, media_type: 'tv', name: 'TV Show 1', poster_path: null, vote_average: 7 }
            ])
          }
        }
      ]
    })
  ],
  render: () => ({
    props: {},
    template: `<div style="padding: 20px; background: #1a1a1a; min-height: 300px;"><app-search-bar></app-search-bar></div>`
  })
};

export const Loading: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: SearchStore,
          useValue: {
            ...mockSearchStore,
            isLoading: signal(true),
            query: signal('loading...')
          }
        }
      ]
    })
  ],
  render: () => ({
    props: {},
    template: `<div style="padding: 20px; background: #1a1a1a;"><app-search-bar></app-search-bar></div>`
  })
};
