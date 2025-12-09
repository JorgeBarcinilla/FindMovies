import { signal } from '@angular/core';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { ThemeService } from '../../../core/services/theme.service';
import { ThemeToggleComponent } from './theme-toggle';

const meta: Meta<ThemeToggleComponent> = {
  component: ThemeToggleComponent,
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: ThemeService,
          useValue: {
            isDarkMode: signal(false),
            toggleTheme: () => {
              console.info('Toggle theme');
            }
          }
        }
      ]
    })
  ],
  tags: ['autodocs'],
  title: 'Shared/ThemeToggle'
};

export default meta;
type Story = StoryObj<ThemeToggleComponent>;

export const LightMode: Story = {
  args: {}
};

export const DarkMode: Story = {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: ThemeService,
          useValue: {
            isDarkMode: signal(true),
            toggleTheme: () => {
              console.info('Toggle theme');
            }
          }
        }
      ]
    })
  ],
  render: () => ({
    props: {},
    template: `<div style="padding: 20px; background: #1a1a1a;"><app-theme-toggle></app-theme-toggle></div>`
  })
};
