import { Router } from '@angular/router';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { MediaCardComponent } from './media-card';

const mockRouter = {
  navigate: () => Promise.resolve(true)
};

const meta: Meta<MediaCardComponent> = {
  argTypes: {
    media: { control: 'object' },
    priority: { control: 'boolean' }
  },
  component: MediaCardComponent,
  decorators: [
    moduleMetadata({
      providers: [{ provide: Router, useValue: mockRouter }]
    })
  ],
  tags: ['autodocs'],
  title: 'Shared/MediaCard'
};

export default meta;
type Story = StoryObj<MediaCardComponent>;

export const Movie: Story = {
  args: {
    media: {
      backdrop_path: '/s3TBrRGB1jav7wJGNsODDb25sME.jpg',
      genre_ids: [28, 878, 12],
      id: 1,
      media_type: 'movie',
      overview: 'A thief who steals corporate secrets through the use of dream-sharing technology...',
      poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      release_date: '2010-07-15',
      title: 'Inception',
      vote_average: 8.8
    },
    priority: false
  }
};

export const TvSeries: Story = {
  args: {
    media: {
      backdrop_path: '/suopoADq0k8YZr4dQXcU6pToj6s.jpg',
      first_air_date: '2011-04-17',
      genre_ids: [10765, 18, 10759],
      id: 1399,
      media_type: 'tv',
      name: 'Game of Thrones',
      overview: 'Seven noble families fight for control of the mythical land of Westeros...',
      poster_path: '/u3bZgnGQ9T01sWNhy95hV5ZQnJw.jpg',
      vote_average: 8.4
    },
    priority: false
  }
};
