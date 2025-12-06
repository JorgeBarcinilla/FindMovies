/**
 * Pipe para convertir un signal a un valor
 */
import { Pipe, PipeTransform, Signal } from '@angular/core';

/**
 *
 */
@Pipe({
  name: 'signal',
  pure: false
})
export class SignalPipe implements PipeTransform {
  /**
   * Transforma un signal a un valor
   * @param {Signal<T>} signal - Signal a convertir
   * @returns {T} - Valor del signal
   */
  transform<T>(signal: Signal<T>): T {
    return signal();
  }
}
