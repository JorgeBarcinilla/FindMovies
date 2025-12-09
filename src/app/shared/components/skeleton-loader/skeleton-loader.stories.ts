import { Meta, StoryObj } from '@storybook/angular';

import { SkeletonLoaderComponent } from './skeleton-loader';

const meta: Meta<SkeletonLoaderComponent> = {
  argTypes: {
    customClass: { control: 'text' },
    height: { control: 'text' },
    shape: { control: 'select', options: ['rectangle', 'circle'] },
    width: { control: 'text' }
  },
  component: SkeletonLoaderComponent,
  tags: ['autodocs'],
  title: 'Shared/SkeletonLoader'
};

export default meta;
type Story = StoryObj<SkeletonLoaderComponent>;

export const Default: Story = {
  args: {
    height: '20px',
    shape: 'rectangle',
    width: '100%'
  }
};

export const Circle: Story = {
  args: {
    height: '50px',
    shape: 'circle',
    width: '50px'
  }
};

export const CardPlaceholder: Story = {
  args: {
    height: '300px',
    shape: 'rectangle',
    width: '200px'
  }
};
