import { Meta, StoryObj } from '@storybook/angular';

import { TabSwitcherComponent } from './tab-switcher';

const meta: Meta<TabSwitcherComponent> = {
  argTypes: {
    activeTab: { control: 'text' },
    tabChange: { action: 'tabChange' },
    tabs: { control: 'object' }
  },
  component: TabSwitcherComponent,
  tags: ['autodocs'],
  title: 'Shared/TabSwitcher'
};

export default meta;
type Story = StoryObj<TabSwitcherComponent>;

export const Default: Story = {
  args: {
    activeTab: 'movies',
    tabs: [
      { label: 'Tab 1', value: 'movies' },
      { label: 'Tab 2', value: 'series' }
    ]
  }
};
