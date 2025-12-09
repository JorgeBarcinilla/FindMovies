import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para formatear cadenas toFixed
 */
@Pipe({
  name: 'toFixed',
  standalone: true
})
export class ToFixedPipe implements PipeTransform {
  /**
   * Formatea un número o cadena a un número con un número de decimales
   * @param {number | string} value - Valor a formatear
   * @param {number} decimals - Número de decimales
   * @returns {string} - Valor formateado
   */
  transform(value: number | string, decimals: number): string {
    return Number(value).toFixed(decimals);
  }
}
