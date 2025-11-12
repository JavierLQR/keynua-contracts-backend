import { InternalServerErrorException, Logger } from '@nestjs/common'
import { AxiosError } from 'axios'

/**
 * Maneja los errores provenientes de Axios de manera reutilizable.
 *
 * @param error - Error capturado en un bloque try/catch
 * @param logger - Instancia de Logger del servicio actual
 * @param contextMessage - Mensaje de contexto (ej: 'Keynua API', 'Culqi API')
 * @param customMessage - Mensaje personalizado que se lanzará como excepción
 */
export const handleAxiosError = (
  error: unknown,
  logger: Logger,
  contextMessage: string,
  customMessage = 'External service error',
): never => {
  if (error instanceof AxiosError) {
    const status: number | undefined = error.response?.status
    const message: string = error.message
    const data: unknown = error.response?.data

    logger.error(`Error response from ${contextMessage}`, {
      status,
      message,
      data,
    })

    throw new InternalServerErrorException(customMessage, {
      cause: error,
    })
  }

  logger.error(`Unexpected error in ${contextMessage}`, error)
  throw new InternalServerErrorException(customMessage)
}
