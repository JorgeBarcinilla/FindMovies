import { setCompodocJson } from '@storybook/addon-docs/angular';
import { applicationConfig, type Preview } from '@storybook/angular';
import 'zone.js';

import docJson from '../documentation.json';
import { WINDOW } from '../src/app/core/tokens/window.token'; // ajusta la ruta
setCompodocJson(docJson);

export const decorators = [
  applicationConfig({
    providers: [{ provide: WINDOW, useValue: window }]
  })
];

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;
