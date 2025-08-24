export const RESULTADO_ASIGNACION = {
    FALLO: 0,
    EXITO: 1
} as const;

export type ResultadoAsignacion = typeof RESULTADO_ASIGNACION[keyof typeof RESULTADO_ASIGNACION];