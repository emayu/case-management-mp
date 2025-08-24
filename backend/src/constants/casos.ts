export const CASO_ESTADOS = {
  PENDIENTE: 'pendiente',
  EN_PROCESO: 'en proceso',
  CERRADO: 'cerrado',
  ARCHIVADO: 'archivado'
} as const;

export type CasoEstado = typeof CASO_ESTADOS[keyof typeof CASO_ESTADOS];