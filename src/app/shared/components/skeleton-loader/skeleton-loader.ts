import { Component, input } from '@angular/core';

import { SignalPipe } from '../../../pipes/signal.pipe';

/**
 * Componente de carga skeleton para mostrar marcadores de posición de carga
 * Soporta diferentes formas y tamaños con estilo glassmorphic
 */
@Component({
  imports: [SignalPipe],
  selector: 'app-skeleton-loader',
  styleUrl: './skeleton-loader.css',
  templateUrl: './skeleton-loader.html'
})
export class SkeletonLoaderComponent {
  customClass = input<string>('');
  height = input<string>('20px');
  shape = input<'circle' | 'rectangle'>('rectangle');
  width = input<string>('100%');
}
