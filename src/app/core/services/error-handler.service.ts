import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface ErrorInfo {
  code?: string;
  message: string;
  originalError?: unknown;
}

/**
 * Servicio para manejo de errores centralizado
 * Convierte errores técnicos en mensajes amigables para el usuario
 */
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  /**
   * Maneja errores HTTP y devuelve información de error amigable para el usuario
   * @param {unknown} error - El error a manejar
   * @returns {ErrorInfo} Información de error con mensaje amigable para el usuario
   */
  handleHttpError(error: unknown): ErrorInfo {
    if (error instanceof HttpErrorResponse) {
      switch (true) {
        case error.status === 0:
          return {
            code: 'NETWORK_ERROR',
            message: 'No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.',
            originalError: error
          };
        case error.status === 401:
          return {
            code: 'UNAUTHORIZED',
            message: 'API key inválida. Por favor, verifica tu configuración.',
            originalError: error
          };
        case error.status === 404:
          return {
            code: 'NOT_FOUND',
            message: 'No se encontró el recurso solicitado.',
            originalError: error
          };
        case error.status >= 500:
          return {
            code: 'SERVER_ERROR',
            message: 'Error del servidor. Por favor, intenta de nuevo más tarde.',
            originalError: error
          };
        default:
          return {
            code: `HTTP_${error.status}`,
            message: 'Ocurrió un error al procesar tu solicitud.',
            originalError: error
          };
      }
    }

    // Error del lado del cliente o desconocido
    return {
      code: 'UNKNOWN_ERROR',
      message: 'Ocurrió un error inesperado. Por favor, intenta de nuevo.',
      originalError: error
    };
  }
  /**
   * Registra el error en la consola (se puede extender para enviar al servicio de registro)
   * @param {ErrorInfo} error - Información de error para registrar
   */
  logError(error: ErrorInfo): void {
    console.error('Error occurred:', {
      code: error.code,
      message: error.message,
      originalError: error.originalError
    });
  }
}
