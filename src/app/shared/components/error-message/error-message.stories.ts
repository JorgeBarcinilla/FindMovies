import { Meta, StoryObj } from '@storybook/angular';

import { ErrorMessageComponent } from './error-message';

const meta: Meta<ErrorMessageComponent> = {
  argTypes: {
    error: { control: 'object' },
    retry: { action: 'retry' }
  },
  component: ErrorMessageComponent,
  tags: ['autodocs'],
  title: 'Shared/ErrorMessage'
};

export default meta;
type Story = StoryObj<ErrorMessageComponent>;

export const Default: Story = {
  args: {
    error: {
      code: 'UNKNOWN_ERROR',
      message: 'Something went wrong. Please try again.'
    }
  }
};

export const NetworkError: Story = {
  args: {
    error: {
      code: 'NETWORK_ERROR',
      message: 'No internet connection.'
    }
  }
};

export const NotFound: Story = {
  args: {
    error: {
      code: 'NOT_FOUND',
      message: 'Resource not found.'
    }
  }
};
