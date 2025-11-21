import { isAxiosError } from 'axios';
import type { AxiosError } from 'axios';
import { VALIDATION_ERRORS, CONFLICT_ERRORS, HTTP_ERRORS } from './errorMessages';

interface NestErrorResponse {
     message: string | string[];
     error: string;
     statusCode: number;
}

export function translateBackendError(error: unknown): string {
     // If it's not an Axios error, return a generic connection error
     if (!isAxiosError(error)) {
          return 'No se pudo conectar con el servidor.';
     }

     const axiosError = error as AxiosError<NestErrorResponse>;

     // without response (network error, server down, etc.)
     if (!axiosError.response || !axiosError.response.data) {
          return 'No se pudo conectar con el servidor.';
     }

     const { status, data } = axiosError.response;
     const { message } = data;

     // 400 - validation errors (array of messages)
     if (status === 400 && Array.isArray(message)) {
          const translatedMessages = message.map((msg) => VALIDATION_ERRORS[msg] || msg).filter(Boolean);

          return translatedMessages.length > 0 ? translatedMessages.join('. ') : 'Error de validación en el formulario';
     }

     // 409 - Conflicts (duplicates)
     if (status === 409 && typeof message === 'string') {
          for (const [key, translated] of Object.entries(CONFLICT_ERRORS)) {
               if (message.includes(key)) {
                    return translated;
               }
          }
          return 'Este registro ya existe';
     }

     // Other HTTP codes
     if (HTTP_ERRORS[status]) {
          return HTTP_ERRORS[status];
     }

     // Fallback
     return typeof message === 'string' ? message : 'Ocurrió un error inesperado';
}
