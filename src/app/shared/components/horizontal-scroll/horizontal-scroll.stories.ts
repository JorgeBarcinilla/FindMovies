import { Meta, StoryObj } from '@storybook/angular';

import { HorizontalScrollComponent } from './horizontal-scroll';

const meta: Meta<HorizontalScrollComponent> = {
  argTypes: {
    gap: { control: 'number' },
    isLoading: { control: 'boolean' },
    loadMore: { action: 'loadMore' }
  },
  component: HorizontalScrollComponent,
  render: (args) => ({
    props: args,
    template: `
      <app-horizontal-scroll [gap]="gap" [isLoading]="isLoading" (loadMore)="loadMore()">
        <div style="display: flex; gap: 24px;">
          <div style="min-width: 320px; height: 200px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">Item 1</div>
          <div style="min-width: 320px; height: 200px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">Item 2</div>
          <div style="min-width: 320px; height: 200px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">Item 3</div>
          <div style="min-width: 320px; height: 200px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">Item 4</div>
          <div style="min-width: 320px; height: 200px; background: #333; display: flex; align-items: center; justify-content: center; color: white;">Item 5</div>
        </div>
      </app-horizontal-scroll>
    `
  }),
  tags: ['autodocs'],
  title: 'Shared/HorizontalScroll'
};

export default meta;
type Story = StoryObj<HorizontalScrollComponent>;

export const Default: Story = {
  args: {
    gap: 24,
    isLoading: false
  }
};

export const Loading: Story = {
  args: {
    gap: 24,
    isLoading: true
  }
};
