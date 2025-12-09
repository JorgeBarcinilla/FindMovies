import { Component, input, output } from '@angular/core';

import type { ErrorInfo } from '../../../core/services/error-handler.service';

import { SignalPipe } from '../../../pipes/signal.pipe';

/**
 * Componente de mensaje de error con funcionalidad de reintento
 * Muestra mensajes de error amigables para el usuario con un botón de reintento
 */
@Component({
  imports: [SignalPipe],
  selector: 'app-error-message',
  styleUrl: './error-message.css',
  templateUrl: './error-message.html'
})
export class ErrorMessageComponent {
  /**
   * Información de error para mostrar
   */
  error = input.required<ErrorInfo | null>();
  /**
   * Evento emitido cuando se hace clic en el botón de reintento
   */
  retry = output<void>();

  /**
   * Maneja el clic en el botón de reintento
   */
  protected onRetry(): void {
    this.retry.emit();
  }
}
